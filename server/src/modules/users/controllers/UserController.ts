import { NextFunction, Request, Response } from "express";
import UpdateWallet from "../../trades/services/UpdateWallet";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import findOneByIdService from "../services/FindOneByIdService";

interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

export default class UserController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { name, email, password }: IRequestBody = request.body;

    const createUser = new CreateUserService();
    try {
      const user = await createUser.execute({ name, email, password });
      return response.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id: string = request.userId;

    const findUser = new findOneByIdService();
    try {
      const user = await findUser.execute(id);

      return response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const userId: string = request.userId;
    const sumResult: number = request.body.sumResult;
    const walletService = new UpdateWallet();

    try {
      const newUserWallet = await walletService.execute(
        { userId, sumResult },
        next
      );
      return response.status(200).json(newUserWallet);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id: string = request.userId;

    const deleteService = new DeleteUserService();
    try {
      await deleteService.execute(id);
      return response
        .status(200)
        .json({ message: "User deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
}
