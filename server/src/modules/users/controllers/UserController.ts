import { hash } from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user";
import CreateUserService from "../services/CreateUserService";
import FindOneByEmailService from "../services/FindOneByEmailService";


export default class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const {name, email, password} = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({name, email, password})

        return response.status(201).json(user);
    }

    public async findOneByEmail(request: Request, response: Response): Promise<Response> {

        const email = request.params.email;

        const findUser = new FindOneByEmailService();

        const user = await findUser.execute(email);

        return response.status(200).json(user);

    }

    // public async findAll(request: Request, response: Response): Promise<Response> {

    //     const users = await User.find();

    //     return response.status(200).json(users)
    // }
}