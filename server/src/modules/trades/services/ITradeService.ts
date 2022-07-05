import { ObjectId } from "mongoose";
import IUser from "../../users/services/IUserService";

export default interface ITrade {
  _id: ObjectId;
  openValueTrade: number;
  closeValueTrade?: number;
  spread?: number;
  type: string;
  symbol: string;
  user: IUser;
  result?: number;
  openAt: Date;
  closedAt?: Date;
}
