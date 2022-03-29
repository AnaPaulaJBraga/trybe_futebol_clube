import { Router } from 'express';
import leaderboards from '../controller/leaderboards';

const router = Router();

router.get('/home', leaderboards.getAllLeaderboard);

export default router;
