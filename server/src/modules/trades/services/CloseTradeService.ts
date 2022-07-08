import { NextFunction } from "express";
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

      const currencyService: GetCurrency = new GetCurrency();
      const currencyData: {
        bidPrice: number;
        askPrice: number;
      } = await currencyService.execute();

      const confirmCurrency =
        findTrade.symbol === "GBPUSD"
          ? currencyData
          : {
              bidPrice: 1 / currencyData.bidPrice,
              askPrice:
                1 /
                (currencyData.askPrice -
                  (currencyData.askPrice - currencyData.bidPrice) * 2),
            };

      const calculationService = new CalculationResultService();
      const result: number = await calculationService.execute({
        openValueTrade: findTrade.openValueTrade,
        closeValueTrade:
          findTrade.type == "sell"
            ? confirmCurrency.askPrice
            : confirmCurrency.bidPrice,
        type: findTrade.type,
        volume: findTrade.volume,
      });

      await Trade.findByIdAndUpdate(tradeId, {
        closeValueTrade:
          findTrade.type == "sell"
            ? parseFloat(confirmCurrency.askPrice.toFixed(4))
            : parseFloat(confirmCurrency.bidPrice.toFixed(4)),
        result: result,
        closeAt: new Date(),
      });
      const updateWalletService = new UpdateWallet();

      return await updateWalletService.execute(
        {
          userId: user._id.toString(),
          sumResult: parseFloat(result.toFixed(4)),
        },
        next
      );
    } catch (err) {
      next(err);
    }
  }
}
