// routes/auctionRoutes.js
import express from 'express';
import { createAuction, searchAuctions, getAuctionById, placeBid, updateWinner} from '../controllers/auction.js';

const router = express.Router();

// Route to create a new auction
router.post('/', createAuction);
router.get('/', searchAuctions);
router.get('/:id', getAuctionById);
router.post('/place-bid', placeBid); 
router.post('/:id/winner', updateWinner);

export default router;
