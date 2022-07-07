import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TradeController from "../controllers/TradeController";

const tradesRouter = Router();
const tradeController = new TradeController();

tradesRouter.get("/", tradeController.getAll);

tradesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      symbol: Joi.string().required(),
      volume: Joi.number().required(),
      type: Joi.string().required().lowercase(),
    },
  }),
  tradeController.open
);

tradesRouter.put("/", tradeController.close);

tradesRouter.get("/currencies/", tradeController.currency);

export default tradesRouter;
