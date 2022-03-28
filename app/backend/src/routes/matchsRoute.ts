import { Router } from 'express';
import { validateMatchs, validateTeams } from '../middleware/matchValidation';
import matchs from '../controller/matchs';

const router = Router();

router.get('/', matchs.getAllMatchs);
router.post('/', validateTeams, validateMatchs, matchs.create);
router.patch('/:id', matchs.updateResult);
router.patch('/:id/finish', matchs.update);

export default router;
