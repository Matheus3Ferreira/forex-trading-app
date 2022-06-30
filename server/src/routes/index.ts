import { Router } from "express";
import tradesRouter from "../modules/trades/routes/trades.routes";
import usersRouter from "../modules/users/routes/user.routes";


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/trades", tradesRouter);

export default routes