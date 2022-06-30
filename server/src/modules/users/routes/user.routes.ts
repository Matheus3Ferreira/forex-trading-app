import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();
const userController = new UserController();

usersRouter.post("/",  celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}), userController.create);

export default usersRouter;