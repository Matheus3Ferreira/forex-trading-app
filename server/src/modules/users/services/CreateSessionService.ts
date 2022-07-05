import { compare } from "bcryptjs";
import User from "../models/user";
import GenerateTokenService from "./GenerateTokenService";
import IUser from "./IUserService";

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest) {
    const user: IUser | any = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Incorrect email/password.");
    }

    const passwordConfirmed: boolean = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new Error("Incorrect email/password.");
    }

    user.password = "";
    const token: string = GenerateTokenService(user._id);

    return { token, user };
  }
}
