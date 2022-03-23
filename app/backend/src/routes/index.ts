import * as express from 'express';
import loginRoute from './loginRoute';
import clubsRoutes from './clubsRoutes';

const route = express.Router();

route.use('/login', loginRoute);

route.use('/clubs', clubsRoutes);

export default route;
