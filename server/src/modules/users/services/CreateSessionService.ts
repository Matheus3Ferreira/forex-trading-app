import { compare } from "bcryptjs";
import SessionController from "../controllers/SessionController";
import User from "../models/user";
import GenerateTokenService from "./GenerateTokenService";

interface IRequest {
    email: string;
  password: string;
}


export default class CreateSessionService {
    public async execute({email, password}: IRequest) {
        
        const user = await User.findOne({email}).select("+password");
        if (!user) {
            throw new Error ("Incorrect email/password.");
        }
        
        const passwordConfirmed = await compare(password, user.password);
        
        if (!passwordConfirmed) {
            throw new Error("Incorrect email/password.");
        }

        user.password = "";
        
        const token = GenerateTokenService(user._id);

        return { token, user };
    }
}