import { Router } from 'express';
import { authVerify } from '../middleware/authMiddleware';
import login from '../controller/login';
import { validateLogin, validateUser } from '../middleware/loginValidation';

const router = Router();

router.post('/', validateLogin, validateUser, login.loginController);
router.get('/validate', authVerify);

export default router;
