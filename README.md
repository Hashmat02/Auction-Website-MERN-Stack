# Auction App

Welcome to the Auction App! This application allows users to create and participate in auctions for various items. It features real-time bidding and an interactive user interface for a seamless auction experience.

# Features

- User Authentication
Sign Up: Users can register with a unique username and password.
Login: Secure login functionality for returning users.
- Auction Management
Create Auction: Users can create auctions with details including title, description, starting price, and times.
Browse Auctions: View and search ongoing auctions. Navigate to specific auctions for more details.
- Real-Time Bidding
Specific Auction Page: Place bids in real-time on items, with live updates for all participants.
Socket Integration: Utilizes Socket.io for real-time communication, handling live bids and updates efficiently.
- User Profile
My Profile: View user details, list of created auctions, and number of items owned. Options to create new auctions and change the password.
- Password Management
Change Password: Users can update their password securely.
Setup Instructions

# Data Models

- User Model
Username: Unique identifier for the user.
Password: Encrypted user password.
Number of Items Owned: Count of items won by the user.
Created Auctions: List of auctions created by the user.
- Auction Model
Title: Title of the auction item.
Description: Detailed description of the item.
Starting Price: Initial price set for the auction.
Starting Time: The start time of the auction.
Ending Time: The end time of the auction.
Current Price: The highest bid amount, updated in real-time.

# Technical Implementation
- Backend: Built with Express and Socket.io for handling HTTP requests and real-time socket events.
- Frontend: React-based frontend with real-time updates for bidding and auction management.
Notes

- Socket Management: The app uses Socket.io for real-time communication. Each new connection or page reload will result in a new socket connection, managed with unique client IDs.
- Real-Time Updates: Bids and auction status are updated in real-time across all connected users.

Feel free to explore the code and contribute to the development of this auction platform. For more details on the setup or any issues, refer to the documentation or contact the maintainer.