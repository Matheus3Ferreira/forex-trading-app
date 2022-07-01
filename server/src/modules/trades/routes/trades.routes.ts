import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TradeController from "../controllers/TradeController";
import "express-async-errors";
const tradesRouter = Router();
const tradeController = new TradeController();

tradesRouter.post("/:email", 
    celebrate({
    [Segments.BODY]: {
        openPrice: Joi.number().required(),
        volume: Joi.number().required(),
        type: Joi.string().required().lowercase(),
    },
}), 
tradeController.create);

tradesRouter.get("/:email", (request, response) => {
    return response.json({"olá": ` Olá id ${request.params.email}`})
})

export default tradesRouter;