import User from "../models/user";
import findOneByIdService from "./FindOneByIdService";

export default class DepositService {
  public async execute(userId: string, amount: number) {
    const findService = new findOneByIdService();
    const foundUser = await findService.execute(userId);
    const updateWallet = await User.findByIdAndUpdate(userId, {
      wallet: foundUser.wallet + amount,
    });

    return updateWallet;
  }
}
