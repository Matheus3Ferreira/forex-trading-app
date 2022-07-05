import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import User from "../../users/models/user";
import IUser from "../../users/services/IUserService";
import Trade from "../models/trades";
import CalculationResultService from "./CalculationResultService";
import GetCurrency from "./GetCurrencyService";
import ITrade from "./ITradeService";
import UpdateWallet from "./UpdateWallet";

export default class CloseTradeService {
  public async execute(tradeId: string, next: NextFunction) {
    try {
      if (!tradeId) throw new Error("Invalid trade ID");

      const findTrade: ITrade | any = await Trade.findById(tradeId);
      if (!findTrade) throw new Error("Trade not found");
      if (!!findTrade.result) throw new Error("Trade is already closed.");
      const user: IUser | any = await User.findById(findTrade.user.toString());
      const currencyService = new GetCurrency();
      const currencyData: number = await currencyService.execute({
        to: findTrade.symbol.slice(0, 3),
        from: findTrade.symbol.slice(3),
      });
      const calculationService = new CalculationResultService();
      const result: number = await calculationService.execute({
        openValueTrade: findTrade.openValueTrade,
        closeValueTrade: currencyData,
        type: findTrade.type,
        volume: findTrade.volume,
      });

      await Trade.findByIdAndUpdate(tradeId, {
        closeValueTrade: currencyData,
        result: result,
        closeAt: new Date(),
      });
      const updateWalletService = new UpdateWallet();

      return await updateWalletService.execute(
        {
          userId: user._id.toString(),
          sumResult: result,
        },
        next
      );
    } catch (err) {
      next(err);
    }
  }
}
