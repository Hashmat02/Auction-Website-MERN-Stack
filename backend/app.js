// app.js
import express from 'express';
import { connect } from './utils/db.js';
import userRoutes from './routes/user.js'; // Make sure the file is named userRoutes.js and not user.js
import auctionRoutes from './routes/auction.js';
import cors from 'cors';


// Enable CORS for all routes and origins

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());

// Connect to MongoDB
connect();

// Use routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.use(cors({
//     origin: ["http://localhost:3000"], // Ensure this includes your frontend URL
//     methods: ["GET", "POST"]
// }));
app.use(cors({
  origin: 'http://localhost:3000', // or use ['http://localhost:3000'] to specify allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods allowed for CORS
  credentials: true // Allow cookies
}));

app.use('/api/auctions', auctionRoutes);

export { app };
