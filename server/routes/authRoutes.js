
import express from 'express'
import * as Auth from '../controllers/authController.js';
import { protect } from '../middleware/ProtectingRoutes.js';

const router = express.Router();

router.post('/login',Auth.login)
router.post('/register',Auth.register)
router.post('/logout',protect,Auth.Logout)

export default router;