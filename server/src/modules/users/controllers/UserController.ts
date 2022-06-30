import { Request, Response } from "express";
import User from "../models/user";


export default class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const user = await User.create(request.body);
        
        if (!user)
            throw new Error("Registration Failed");

        user.password = "";
        return response.status(201).json(user);
    }
}