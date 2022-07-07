import { NextFunction } from "express";
import User from "../../users/models/user";
import IUser from "../../users/services/IUserService";
import Trade from "../models/trades";
import GetCurrency from "./GetCurrencyService";
import ITrade from "./ITradeService";

interface IRequest {
  symbol: string;
  volume: number;
  type: string;
  userId: string;
}

export default class OpenTradeService {
  public async execute(
    { symbol, volume, type, userId }: IRequest,
    next: NextFunction
  ) {
    if (!symbol) throw new Error("Symbol to/from is not valid.");

    if (!volume || volume < 0.01 || volume > 100)
      throw new Error("Invalid volume value");

    if (!type || (type != "sell" && type != "buy"))
      throw new Error("Invalid type");

    if (!userId) throw new Error("Id not provide");

    const user: IUser | any = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const currencyService = new GetCurrency();
    try {
      const getCurrency = await currencyService.execute();

      const currency =
        type === "sell" ? getCurrency.askPrice : getCurrency.bidPrice;
      const trade: ITrade | any = await Trade.create({
        openValueTrade: currency,
        symbol: symbol,
        volume: volume,
        user: user._id,
        type: type,
      });

      if (!trade) throw new Error("Registration Failed.");

      await trade.save();

      user.trades?.push(trade);

      await user.save();

      return trade;
    } catch (err) {
      next(err);
    }
  }
}
