import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): NextFunction | any {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).json({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return response.status(401).json({ error: "Invalid token" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: "Token malformatted" });
  const { id } = verify(token, authConfig.jwt.secret) as ITokenPayload;
  if (!id) throw new Error("Invalid token");
  request.userId = id;
  return next();
}
1;
