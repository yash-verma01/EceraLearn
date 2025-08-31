import express from 'express';
const router = express.Router();
import { createCourse,addLecture } from '../controllers/adminController.js';
import { isAdmin,isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from '../middlewares/multer.js';

router.post('/course/new', isAuth, isAdmin, uploadFiles, createCourse);
router.post('/course/lecture/new/:id', isAuth, isAdmin, uploadFiles, addLecture);
export default router;
