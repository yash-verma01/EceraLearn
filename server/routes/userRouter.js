import express from 'express';
const router = express.Router();
import { userRegister,userVerify} from '../controllers/userController.js';

router.post('/register', userRegister);
router.post('/verify', userVerify);


export default router;