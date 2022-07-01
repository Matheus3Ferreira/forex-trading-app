import { hash } from "bcryptjs";
import User from "../models/user";
import GenerateTokenService from "./GenerateTokenService";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({name, email, password}: IRequest) {

        const hashedPassword = await hash(password, 8);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (!user)
            throw new Error("Registration Failed");

        user.password = "";

        const token = GenerateTokenService(user._id);

        return {token, user};
    }
}