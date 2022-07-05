import { NextFunction, Request, Response } from "express";
import CloseTradeService from "../services/CloseTradeService";
import GetCurrency from "../services/GetCurrencyService";
import OpenTradeService from "../services/OpenTradeService";

interface IRequestBodyCreate {
  volume: number;
  type: string;
  to: string;
  from: string;
}

interface IRequestBodyCurrency {
  to: string;
  from: string;
}

export default class TradeController {
  public async open(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { volume, type, from, to }: IRequestBodyCreate = request.body;

    const userId: string = request.params.id;

    const openTradeService = new OpenTradeService();
    try {
      const trade = await openTradeService.execute(
        {
          volume,
          type,
          userId,
          from,
          to,
        },
        next
      );
      return response.status(201).json(trade);
    } catch (err) {
      next(err);
    }
  }

  public async close(request: Request, response: Response, next: NextFunction) {
    const tradeId: string = request.params.id;

    const closeTradeService = new CloseTradeService();

    try {
      const closedTrade = await closeTradeService.execute(tradeId, next);
      return response.status(200).json(closedTrade);
    } catch (err) {
      next(err);
    }
  }

  public async currency(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { to, from }: IRequestBodyCurrency = request.body;
    const currencyService = new GetCurrency();
    try {
      const currency = await currencyService.execute({ to, from });
      return response.status(200).json(currency);
    } catch (err) {
      next(err);
    }
  }
}
