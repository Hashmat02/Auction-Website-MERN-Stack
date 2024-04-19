
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client'; 
// import css from './specificauction.module.css';

interface Auction {
    id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    startTime: string;
    endTime: string;
    creatorUsername: string;  // Add this to track the creator
}

const socket = io('http://localhost:8080');

const SpecificAuction = () => {
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<Auction | null>(null);
    const [bid, setBid] = useState('');
    const [auctionEnded, setAuctionEnded] = useState(false);

    useEffect(() => {
        const fetchAuction = async () => {
            if (!id) {
                console.error("Auction ID is undefined.");
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/api/auctions/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch auction: ${response.status}`);
                }
                const data = await response.json();
                setAuction(data);
            } catch (error) {
                console.error('Error fetching auction:', error);
            }
        };
        fetchAuction();
        socket.emit('joinAuction', id);
        socket.on('bidPlaced', (data) => {
            if (data.auctionId === id) {
                setAuction(prevState => prevState ? { ...prevState, currentPrice: data.newBid } : null);
            }
        });
        return () => {
            socket.off('bidPlaced');
            socket.emit('leaveAuction', id);
        };
    }, [id]);

    const placeBid = async () => {
        const username = localStorage.getItem('username');
        if (username === auction?.creatorUsername) {
            alert("You can't bid on your own auction.");
            return;
        }
        if (!auction || parseFloat(bid) <= (auction.currentPrice ?? 0)) {
            alert('Your bid must be higher than the current going price.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auctions/place-bid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ auctionId: id, newBid: parseFloat(bid) })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to place bid");
            }
            alert('Bid placed successfully');
            setBid('');
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
            console.error('Error placing bid:', errorMsg);
            alert(`Error placing bid: ${errorMsg}`);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (auction && new Date(auction.endTime) < new Date()) {
                if (id) {
                    determineWinner(id); // Pass the id parameter to determineWinner
                    clearInterval(intervalId); // Stop the interval after determining the winner
                } else {
                    console.error("Auction ID is undefined.");
                }
            }
        }, 40000);
    
        return () => clearInterval(intervalId);
    }, [auction, id]); // Ensure id is included as a dependency
    
     


    const determineWinner = async (auctionId:string) => {
        try {
            if (!auction) {
                console.error('Auction data is missing');
                return;
            }
    
            if (!auction.currentPrice || auction.currentPrice <= auction.startingPrice) {
                // No bids were placed, so there's no winner
                alert('No bids were placed for this auction.');
                return;
            }
    
            // The highest bidder is the winner
            const winnerUsername = auction.creatorUsername;
            alert(`The winner of the auction is: ${winnerUsername}`);
    
            // Update the backend with the winner
            const response = await fetch(`http://localhost:8080/api/auctions/${auctionId}/winner`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ winnerUsername })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update winner');
            }
            setAuctionEnded(true);
    
            // Here you can update the database or take other necessary actions based on the winner
        } catch (error) {
            console.error('Error determining winner:', error);
            alert('Error determining winner');
        }
    };
    
    

    if (!auction) return <p>Loading auction details...</p>;
    return (
        <div>
            <h1>{auction.title}</h1>
            <p>Description: {auction.description}</p>
            <p>Starting Price: ${auction.startingPrice}</p>
            <p>Current Price: ${auction.currentPrice}</p>
            <p>Starting Time: {auction.startTime}</p>
            <p>Ending Time: {auction.endTime}</p>
            {auctionEnded ? (
                <div>
                    <p>Auction ended. Winner: {auction.creatorUsername}</p>
                    <p>Bidding closed.</p>
                </div>
            ) : (
                <div>
                    <input
                        type="number"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        disabled={auctionEnded} // Disable input when auction has ended
                    />
                    <button onClick={placeBid} disabled={auctionEnded}>Place Bid</button>
                </div>
            )}
        </div>
    );
};

export default SpecificAuction;

