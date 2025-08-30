import express from 'express';
const router = express.Router();
import { RegisterUser ,VerifyUser,userLogin,myProfile} from '../controllers/userController.js';
import {auth} from '../middlewares/auth.js';

router.post('/register', RegisterUser);
router.post('/verify', VerifyUser);
router.post('/login', userLogin);
router.get('/profile', auth, myProfile);

export default router;