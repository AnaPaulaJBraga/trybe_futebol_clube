import { Router } from 'express';
import { validateMatchs, validateTeams } from '../middleware/matchValidation';
import matchs from '../controller/matchs';

const router = Router();

router.patch('/:id/finish', matchs.update);
router.get('/', matchs.getAllMatchs);
router.post('/', validateTeams, validateMatchs, matchs.create);

export default router;
