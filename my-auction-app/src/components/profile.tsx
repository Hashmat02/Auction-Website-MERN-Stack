import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';

// Define the interface for UserData and Auction
interface Auction {
    _id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    imgUrl:string,
    startTime: Date,
    endTime: Date

}

interface UserData {
    profileImage: string;
    name: string;
    username: string;
    itemsOwned: number;
    createdAuctions: Auction[];  // Array of Auctions
}

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const username = localStorage.getItem('username');
            if (!username) {
                console.error('No username found in local storage.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/users/profile/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json() as UserData;
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    // return (
    //     <div className="container">
    //         <div className="profile-info">
    //             <div className="profile-image">
    //                 <img src={userData.profileImage} alt="Profile" />
    //             </div>
    //             <div className="user-details">
    //                 <h2>{userData.name}</h2>
    //                 <p>{userData.username}</p>
    //                 <p>Items Owned: {userData.itemsOwned}</p>
    //             </div>
    //         </div>
    //         <div className="auction-list">
    //             {userData.createdAuctions.length > 0 ? (
    //                 userData.createdAuctions.map((auction: Auction) => (
    //                     <div key={auction._id}>
    //                         <h4>{auction.title}</h4>
    //                         <p>{auction.description}</p>
    //                     </div>
    //                 ))
    //             ) : <p>No auctions created.</p>}
    //         </div>
    //         <div className="profile-actions">
    //             <Link to="/createauction">
    //                 <button>Create Auction</button>
    //             </Link>
    //             <Link to="/change-password">
    //                 <button>Change Password</button>
    //             </Link>
    //         </div>
    //     </div>
    // );
    return (
        <div className="container">
            <div className="profile-info">
                <div className="profile-image">
                    <img src={userData.profileImage} alt="Profile" />
                </div>
                <div className="user-details">
                    <h2>{userData.name}</h2>
                    <p>{userData.username}</p>
                    <p>Items Owned: {userData.itemsOwned}</p>
                </div>
            </div>
            <div className="auction-list-section">
                <h3>My Auctions</h3> {/* Heading added here */}
                <div className="auction-list">
                    {userData.createdAuctions.length > 0 ? (
                        userData.createdAuctions.map((auction: Auction) => (
                            <div className="auction-card" key={auction._id}>
                                <h4>{auction.title}</h4>
                                <p>{auction.description}</p>
                                {/* You might want to display more details like starting price, etc. */}
                            </div>
                        ))
                    ) : <p>No auctions created.</p>}
                </div>
            </div>
            <div className="profile-actions">
                <Link to="/createauction">
                    <button>Create Auction</button>
                </Link>
                <Link to="/change-password">
                    <button>Change Password</button>
                </Link>
            </div>
        </div>
    );
};


export default ProfilePage;

