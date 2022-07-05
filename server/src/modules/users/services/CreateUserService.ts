import { hash } from "bcryptjs";
import User from "../models/user";
import GenerateTokenService from "./GenerateTokenService";
import IUser from "./IUserService";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest) {
    const existingEmail: IUser | any = await User.findOne({ email: email });

    if (!!existingEmail) throw new Error("Email already exists");

    const hashedPassword = await hash(password, 8);

    const user: IUser | any = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (!user) throw new Error("Registration Failed");

    user.password = "";

    const token: string = GenerateTokenService(user._id);

    return { token, user };
  }
}
