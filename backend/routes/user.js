// src/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUserProfile, getCurrentUser, changePassword  } from '../controllers/user.js';

const router = express.Router();
router.post('/signup', registerUser);
router.post('/login', loginUser);  
router.get('/profile/:username', getUserProfile);
router.get('/current-user', getCurrentUser);
router.post('/change-password', changePassword);

export default router;
