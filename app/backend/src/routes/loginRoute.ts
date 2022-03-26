import { Router } from 'express';
import { login, validate } from '../controller/login';

const router = Router();

router.post('/', login);

router.get('/validate', validate);

export default router;
