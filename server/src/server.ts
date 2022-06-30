import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import "express-async-errors";
import { errors } from "celebrate";
import mongoose from "mongoose";
import { config } from "dotenv";
import connectDatabase from "./database";


const app = express();

app.use(express.json());

connectDatabase();

app.use("/api", routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({ err: err.message });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })

})

routes.use(errors())

app.listen(3000, () => console.log("Server on port http://localhost:3000"))