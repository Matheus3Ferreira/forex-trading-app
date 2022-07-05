import { Router } from "express";
import tradesRouter from "../modules/trades/routes/trades.routes";
import sessionsRouter from "../modules/users/routes/session.routes";
import usersRouter from "../modules/users/routes/user.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/trades", tradesRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
