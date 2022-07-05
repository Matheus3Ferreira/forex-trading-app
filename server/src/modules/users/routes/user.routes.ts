import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ensureAuthenticated from "../../../middlewares/ensureAuthenticated";
import UserController from "../controllers/UserController";

const usersRouter = Router();
const userController = new UserController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

usersRouter.get("/", ensureAuthenticated, userController.findOne);

usersRouter.delete("/", ensureAuthenticated, userController.delete);

export default usersRouter;
