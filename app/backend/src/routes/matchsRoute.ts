import { Router } from 'express';
import matchs from '../controller/matchs';

const router = Router();

router.get('/', matchs.getAllMatchs);

export default router;
