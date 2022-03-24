import * as express from 'express';
import loginRoute from './loginRoute';
import clubsRoutes from './clubsRoutes';
import matchsRoute from './matchsRoute';

const route = express.Router();

route.use('/login', loginRoute);

route.use('/clubs', clubsRoutes);

route.use('/', matchsRoute);

export default route;
