import { Router } from 'express';
import * as clubsController from '../controller/clubs';

const router = Router();

router.get('/', clubsController.getAllClubs);
router.get('/:id', clubsController.getClubsById);

export default router;
