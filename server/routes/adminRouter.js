import express from 'express';
const router = express.Router();
import { createCourse,addLecture,deleteLecture,deleteCourse,getAllStats} from '../controllers/adminController.js';
import { isAdmin,isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from '../middlewares/multer.js';

router.post('/course/new', isAuth, isAdmin, uploadFiles, createCourse);
router.post('/course/lecture/new/:id', isAuth, isAdmin, uploadFiles, addLecture);
router.delete('/lecture/:id', isAuth, isAdmin, deleteLecture);
router.delete('/course/:id', isAuth, isAdmin, deleteCourse);
router.get('/stats', isAuth, isAdmin, getAllStats);
export default router;
