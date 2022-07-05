import { NextFunction, Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { email, password } = request.body;

    const sessionService = new CreateSessionService();
    try {
      const session = await sessionService.execute({ email, password });
      return response.json(session);
    } catch (err) {
      next(err);
    }
  }
}
