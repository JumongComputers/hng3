
import { Router } from "express";
import UserController from "../../modules/users/users.controller";
import { validateLogin, validateSignup } from "../../validations/users.validation";







const userRouter = Router();


const userController = new UserController();


userRouter.post('/auth/register', validateSignup, userController.signup )
userRouter.post('auth/login', validateLogin, userController.login )



export default userRouter;