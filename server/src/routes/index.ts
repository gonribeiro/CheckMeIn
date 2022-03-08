import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { meetingsRoutes } from './meetings.route';

const routes = Router();

routes.use("/user", usersRoutes);
routes.use("/meeting", meetingsRoutes);

export { routes };