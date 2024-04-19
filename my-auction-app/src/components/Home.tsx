import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/home.css';

const Home: React.FC = () => {
    const navigate = useNavigate(); // Get the navigate function

    // Event handler for the login button
    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page on button click
    };

    return (
        <div className="container">
            <h1>Welcome to BidMe</h1>
            <p className="subtitle">Discover unique items and bid to win!</p>
            <button className="join" onClick={handleLoginClick}>Login</button> {/* Attach the event handler to the button */}
            <p className="signup-prompt">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Home;
