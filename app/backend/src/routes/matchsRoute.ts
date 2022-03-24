import { Router } from 'express';
import matchs from '../controller/matchs';

const matchsRoute = Router();

matchsRoute.get('/', matchs.getAllMatchs);

export default matchsRoute;
