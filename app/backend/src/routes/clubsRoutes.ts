import * as express from 'express';
import { getAllClubs, getClubsById } from '../controller/clubs';

const route = express.Router();

route.get('/', getAllClubs);

route.get('/:id', getClubsById);

export default route;
