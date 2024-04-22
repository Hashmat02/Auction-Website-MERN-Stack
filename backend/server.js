
import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { connect as connectDB } from './utils/db.js';
import userRoutes from './routes/user.js';
import auctionRoutes from './routes/auction.js';

// Initialize configuration from .env file
dotenv.config({ path: "./utils/config.env" });

const app = express();

// Apply middleware
app.use(cors({
    origin: "http://localhost:3000", // Adjust as per your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api', auctionRoutes);

// Database connection
connectDB().then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.error("Failed to connect to MongoDB:", error);
});

// HTTP server
const server = http.createServer(app);

// Socket.io configuration
const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on('disconnect', () => {
      console.log("USER DISCONNECTED:", socket.id);
  });

  // Listen for join room
  socket.on('joinAuction', (auctionId) => {
      console.log(`User ${socket.id} joined auction ${auctionId}`);
      socket.join(auctionId);
  });
});

export { io };

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







// import dotenv from 'dotenv';
// dotenv.config({ path: "./utils/config.env" }); // Adjust path as necessary

// import http from 'http';
// import { Server } from 'socket.io';
// import { app } from './app.js';
// import { connect } from './utils/db.js';

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("USER CONNECTED:", socket.id);
// });

// server.listen(8000, async () => {
//   console.log("Server is running on port 8080");
//   try {
//     await connect(); // Assuming connect is an async function that handles MongoDB connection
//     console.log("Connected to MongoDB:", process.env.MONGO_URI);
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//   }
// });



// import dotenv from 'dotenv';
// dotenv.config({ path: "./utils/config.env" });
// import cors from 'cors';
// import http from 'http';
// import express from 'express';
// import { Server as SocketIOServer } from 'socket.io';
// import { connect as connectDB } from './utils/db.js';
// import auctionRoutes from './routes/auction.js'; // Your auction routes

// const app = express();
// app.use(express.json()); // For parsing application/json
// app.use('/api/auctions', auctionRoutes); // Auction API routes

// const server = http.createServer(app);
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: ["http://localhost:3000"], // Update this to the correct client URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("USER CONNECTED:", socket.id);

//   // Joining a specific auction room
//   socket.on('joinAuction', (auctionId) => {
//     socket.join(auctionId);
//     console.log(`Socket ${socket.id} joined auction ${auctionId}`);
//   });

//   // Handling a bid placed
//   socket.on('placeBid', (data) => {
//     const { auctionId, bid } = data;
//     // You should add server-side validation and database update logic here
//     console.log(`Bid placed on auction ${auctionId}: $${bid}`);
//     io.to(auctionId).emit('bidPlaced', { auctionId, newBid: bid });
//   });

//   // Leaving an auction room
//   socket.on('leaveAuction', (auctionId) => {
//     socket.leave(auctionId);
//     console.log(`Socket ${socket.id} left auction ${auctionId}`);
//   });
// });

// server.listen(8080, async () => {
//   console.log("Server is running on port 8080");
//   try {
//     await connectDB();
//     console.log("Connected to MongoDB:", process.env.MONGO_URI);
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//   }
// });

// app.use(cors({
//   origin: 'http://localhost:3000', // or use ['http://localhost:3000'] to explicitly list allowed origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods allowed for CORS
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly specify headers allowed
// })); 

