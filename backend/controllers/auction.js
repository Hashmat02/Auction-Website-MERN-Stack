// controllers/AuctionController.js
import Auction from '../models/auction.js';
import { io } from '../server.js';
import User from '../models/user.js'; // Import the User model


export const createAuction = async (req, res) => {
    try {
        const { title, description, startingPrice, startTime, endTime, imageUrl, creatorUsername } = req.body;

        // Create the auction
        const newAuction = new Auction({
            title,
            description,
            startingPrice,
            startTime,
            endTime,
            imageUrl,
            currentPrice: startingPrice,
            creatorUsername,
            winnerUsername: null, // Initialize winnerUsername with null
        });

        // Save the auction to the database
        await newAuction.save();

        // Find the user document in the database based on the username
        const user = await User.findOne({ username: creatorUsername });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Push the ID of the newly created auction to the createdAuctions array of the user document
        user.createdAuctions.push(newAuction._id);

        // Save the updated user document to the database
        await user.save();

        // Return the newly created auction and a success message
        res.status(201).json({ auction: newAuction, message: "Auction created successfully and added to your profile." });
    } catch (error) {
        res.status(400).json({ message: "Failed to create auction: " + error.message });
    }
};


export const searchAuctions = async (req, res) => {
    try {
        const { search } = req.query; // Get search keyword from query params
        const query = search ? { title: { $regex: search, $options: 'i' } } : {}; // Case-insensitive regex search
        const auctions = await Auction.find(query);
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
};

export const getAuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auction', error: error.message });
    }
};



export const placeBid = async (req, res) => {
    const { auctionId, newBid } = req.body;

    try {
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        if (newBid <= auction.currentPrice) {
            return res.status(400).json({ message: "Bid must be higher than the current going price" });
        }

        auction.currentPrice = newBid;
        await auction.save();

        // Emitting the updated current price to all clients in the room
        io.to(auctionId).emit('bidPlaced', { auctionId, newBid: auction.currentPrice });

        res.json({ message: "Bid placed successfully", auction });
    } catch (error) {
        res.status(500).json({ message: "Error placing bid", error: error.message });
    }
};


export const updateWinner = async (req, res) => {
    try {
        const { id } = req.params;
        const { winnerUsername } = req.body;

        // Find the auction by ID
        const auction = await Auction.findById(id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        // Update the winner's username
        auction.winnerUsername = winnerUsername;
        await auction.save();

        // Return success message
        res.json({ message: "Winner updated successfully", auction });
    } catch (error) {
        res.status(500).json({ message: "Error updating winner", error: error.message });
    }
};





// Additional controllers can be added here for updating, deleting, etc.
