import express from 'express';
const router = express.Router();
import { createCourse } from '../controllers/adminController.js';
import { isAdmin,isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from '../middlewares/multer.js';

router.post('/course/new',isAuth,isAdmin,createCourse)
export default router;
