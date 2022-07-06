import { ObjectId } from "mongoose";
import findOneByIdService from "../../users/services/FindOneByIdService";
import Trade from "../models/trades";
import ITrade from "./ITradeService";

interface IRequest {
  userId: string;
  filter?: string[] | void;
}

export default class GetAllAndFilterService {
  public async execute({ userId, filter }: IRequest) {
    const getUser = new findOneByIdService();
    const { trades } = await getUser.execute(userId);

    const tradesByUser = await Promise.all(
      trades.map(async (tradeId) => await Trade.findById(tradeId))
    );
    return tradesByUser.filter((trade) => trade != null);
  }
}
