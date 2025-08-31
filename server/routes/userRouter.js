import express from 'express';
const router = express.Router();
import { userRegister,userVerify,userLogin,myProfile} from '../controllers/userController.js';
import {isAuth} from '../middlewares/isAuth.js';

router.post('/register', userRegister);
router.post('/verify', userVerify);
router.post('/login', userLogin);
router.get('/profile', isAuth, myProfile);

export default router;