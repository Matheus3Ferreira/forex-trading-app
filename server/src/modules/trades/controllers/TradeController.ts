import { NextFunction, Request, Response } from "express";
import CloseTradeService from "../services/CloseTradeService";
import GetAllAndFilterService from "../services/GetAllAndFilterService";
import GetCurrencyService from "../services/GetCurrencyService";
import OpenTradeService from "../services/OpenTradeService";

interface IRequestBodyCreate {
  symbol: string;
  volume: number;
  type: string;
}

export default class TradeController {
  public async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const userId = request.userId;
    const filter: string[] | void = request.body.filter;

    const getService = new GetAllAndFilterService();
    try {
      const trades = await getService.execute({ userId, filter });

      return response.status(200).json(trades);
    } catch (err) {
      next(err);
    }
  }

  public async open(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { symbol, volume, type }: IRequestBodyCreate = request.body;

    const userId: string = request.userId;

    const openTradeService = new OpenTradeService();
    try {
      const trade = await openTradeService.execute(
        {
          symbol,
          volume,
          type,
          userId,
        },
        next
      );
      return response.status(201).json(trade);
    } catch (err) {
      next(err);
    }
  }

  public async close(request: Request, response: Response, next: NextFunction) {
    const tradeId: string = request.userId;

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
    const currencyService = new GetCurrencyService();
    try {
      const currency = await currencyService.execute();
      return response.status(200).json(currency);
    } catch (err) {
      next(err);
    }
  }
}
