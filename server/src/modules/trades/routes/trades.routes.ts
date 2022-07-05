import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TradeController from "../controllers/TradeController";

const tradesRouter = Router();
const tradeController = new TradeController();

tradesRouter.post(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      volume: Joi.number().required(),
      type: Joi.string().required().lowercase(),
      to: Joi.string().required().uppercase(),
      from: Joi.string().required().uppercase(),
    },
  }),
  tradeController.open
);

tradesRouter.put("/:id", tradeController.close);

tradesRouter.get(
  "/currencies/",
  celebrate({
    [Segments.BODY]: {
      to: Joi.string().required().uppercase(),
      from: Joi.string().required().uppercase(),
    },
  }),
  tradeController.currency
);

export default tradesRouter;
