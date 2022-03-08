import { Router } from "express";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticate";

import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CheckUserController } from "../modules/users/useCases/checkUser/CheckUserController";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const checkUserController = new CheckUserController();

usersRoutes.post("/authenticate/", authenticateUserController.handle);
usersRoutes.post("/check/", ensureAuthenticateUser, checkUserController.handle);

export { usersRoutes };
