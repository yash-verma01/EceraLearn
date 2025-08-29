import express from 'express';
const router = express.Router();
import { RegisterUser } from '../controllers/userController.js';




router.get('/register', RegisterUser);
export default router;