import { sign } from "jsonwebtoken";
import { Types } from "mongoose";
import authConfig from "../../../config/auth";


export default function GenerateTokenService(userId: Types.ObjectId) {
        const token = sign({id: userId}, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn,
    })
    return token;

}