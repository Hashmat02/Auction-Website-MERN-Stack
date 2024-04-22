import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

interface Auction {
    id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    startTime: string;
    endTime: string;
    creatorUsername: string;
    isClosed: boolean;  // Property to track if the auction is closed
}

const socket = io('http://localhost:8080');

const SpecificAuction = () => {
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<Auction | null>(null);
    const [bid, setBid] = useState('');

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
                setAuction({ ...data, isClosed: new Date(data.endTime) < new Date() });
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

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (auction && new Date(auction.endTime) < new Date()) {
                setAuction(prevAuction => prevAuction ? { ...prevAuction, isClosed: true } : null);
                clearInterval(intervalId);
                // Call the API to update the auction status in the database
                try {
                    const response = await fetch(`http://localhost:8080/api/auctions/${id}/close`, {
                        method: 'POST'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to close auction on the server');
                    }
                } catch (error) {
                    console.error('Error closing auction:', error);
                }
            }
        }, 1000);  // Checking every second for demo purposes
    
        return () => clearInterval(intervalId);
    }, [auction, id]);
    

    const placeBid = async () => {
        if (auction?.isClosed) {
            alert("This auction has ended. No further bids can be placed.");
            return;
        }
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
            if (!response.ok) {
                throw new Error(await response.json().then(data => data.message || "Failed to place bid"));
            }
            alert('Bid placed successfully');
            setBid('');
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
            console.error('Error placing bid:', errorMsg);
            alert(`Error placing bid: ${errorMsg}`);
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
            {auction.isClosed ? (
                <div>
                    <p>Auction ended. No further bids can be placed.</p>
                </div>
            ) : (
                <div>
                    <input
                        type="number"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        disabled={auction.isClosed}
                    />
                    <button onClick={placeBid} disabled={auction.isClosed}>Place Bid</button>
                </div>
            )}
        </div>
    );
};

export default SpecificAuction;