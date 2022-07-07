import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import "express-async-errors";
import { errors } from "celebrate";
import { config } from "dotenv";
import connectDatabase from "./database";
import cors from "cors";
import { Server, Socket } from "socket.io";
import http from "http";
import GetCurrency from "./modules/trades/services/GetCurrencyService";
import GetCurrencyService from "./modules/trades/services/GetCurrencyService";

const app = express();
const serverHttp = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api", routes);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000/dashboard",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("New connection. Id: ", socket.id);
  socket.on("get-currency", async (symbol) => {
    const currencyService = new GetCurrencyService();
    const currency: { bidPrice: number; askPrice: number } =
      await currencyService.execute();
    const confirmCurrency =
      symbol === "GBPUSD"
        ? currency
        : {
            bidPrice: 1 / currency.bidPrice,
            askPrice:
              1 /
              (currency.askPrice - (currency.askPrice - currency.bidPrice) * 2), // Now the difference between askPrice and bidPrice is proportional.
          };
    socket.emit("get-currency", confirmCurrency);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ err: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

routes.use(errors());

serverHttp.listen(process.env.PORT || 8080);
