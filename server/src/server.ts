import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import "express-async-errors";
import { errors } from "celebrate";
import { config } from "dotenv";
import connectDatabase from "./database";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());

connectDatabase();

app.use("/api", routes);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({ err: err.message });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })

});

routes.use(errors());

app.listen(process.env.PORT || 3000);