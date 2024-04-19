// models/Auction.js
import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    imageUrl: String, // Optional image URL
    startingPrice: { type: Number, required: true },
    creatorUsername: { type: String, required: true },
    winnerUsername: { type: String },
});

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
