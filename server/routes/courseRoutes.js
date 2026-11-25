import { Router } from 'express';
import { getCourses, getMine, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, allow } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();
const teacher = [protect, allow('teacher')];

router.get('/', getCourses);
router.get('/mine', ...teacher, getMine);
router.get('/:id', getCourse);
router.post('/', ...teacher, upload, createCourse);
router.put('/:id', ...teacher, upload, updateCourse);
router.delete('/:id', ...teacher, deleteCourse);
export default router;
