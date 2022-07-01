import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController {
    public async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const sessionService = new CreateSessionService();

        const session = await sessionService.execute({email, password});

        if (!session) 
            throw new Error("Something happens");

        return response.json(session);
    }
}