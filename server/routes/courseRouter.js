import express from 'express';
const router = express.Router();
import { getAllCourses, getSingleCourse ,fetchLectures,fetchLecture,getMyCourses} from '../controllers/courseController.js';
import { isAuth } from '../middlewares/isAuth.js';

router.get('/course/all', getAllCourses);
router.get('/course/:id', getSingleCourse);
router.get('/lectures/:id', isAuth, fetchLectures);
router.get('/lecture/:id', isAuth, fetchLecture);
router.get('/my-courses', isAuth, getMyCourses);

export default router;
