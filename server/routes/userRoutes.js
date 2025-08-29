import express from 'express';
const router = express.Router();
import { RegisterUser } from '../controllers/userController.js';




router.post('/register', RegisterUser);
export default router;