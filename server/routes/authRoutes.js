
import express from 'express'
import * as Auth from '../controllers/authController.js';

const router = express.Router();

router.post('/login',Auth.login)
router.post('/register',Auth.register)

export default router;