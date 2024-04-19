import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/homeMain.css'; // Adjust the path to your actual CSS file

const HomeMain: React.FC = () => {
    return (
        <div className="container">
            <h1>Welcome to BidMe!</h1>
            <p className="subtitle">Ready to explore exclusive auctions?</p>
            {/* Link to the profile page */}
            <Link to="/profile">
                <button className="join">Profile</button>
            </Link>
            {/* More content can be added here as needed */}
        </div>
    );
};

export default HomeMain;
