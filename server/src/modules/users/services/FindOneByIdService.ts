import User from "../models/user";
import { Types } from "mongoose";
import IUser from "./IUserService";

export default class findOneByIdService {
  public async execute(id: string): Promise<IUser> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid id");
    const user: IUser | null = await User.findById(id);
    if (!user) throw new Error("User not found");

    return user;
  }
}
