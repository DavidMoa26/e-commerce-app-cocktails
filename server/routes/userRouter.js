import express from "express";
import { authUser, getUserProfile, protect, registerNewUser, updateUserProfile } from '../controllers/userControllers.js'

const router = express.Router();

router.route('/').post(registerNewUser);
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router