import { Router } from 'express';
import { register, login, profile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
export default router;
