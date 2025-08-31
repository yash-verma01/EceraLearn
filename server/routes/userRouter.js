import express from 'express';
const router = express.Router();
import { userRegister} from '../controllers/userController.js';

router.post('/register', userRegister);


export default router;