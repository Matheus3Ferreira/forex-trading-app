import { NextFunction } from "express";
import User from "../../users/models/user";
import findOneByIdService from "../../users/services/FindOneByIdService";
import IUser from "../../users/services/IUserService";

interface IUpdateParams {
  userId: string;
  sumResult: number;
}

export default class UpdateWallet {
  public async execute(
    { userId, sumResult }: IUpdateParams,
    next: NextFunction
  ) {
    try {
      const userService = new findOneByIdService();
      const user: IUser = await userService.execute(userId);
      await User.findByIdAndUpdate(userId, {
        wallet: user.wallet + sumResult,
      });

      return await userService.execute(userId);
    } catch (err) {
      next(err);
    }
  }
}
