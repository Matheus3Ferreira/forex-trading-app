import connectDatabase from "../../../database";
import OpenTradeService from "../services/OpenTradeService";
import { NextFunction } from "express";
import findOneByIdService from "../../users/services/FindOneByIdService";

describe("Trades Services", () => {
  beforeAll(() => connectDatabase());

  describe("Open Trade Service", () => {
    const userIdTest = "62c3568b2187c38058b1e5f8";
    it("should create a new trade", async () => {
      const openTradeService = new OpenTradeService();
      const newTrade = await openTradeService.execute(
        {
          symbol: "USDGBP",
          volume: 0.5,
          type: "buy",
          userId: userIdTest,
        },
        () => {}
      );
      expect(newTrade).toHaveProperty("_id");
    });
    it("should find trade Id in users list trade", async () => {
      const findUserService = new findOneByIdService();
      const user = await findUserService.execute(userIdTest);
      console.log(user);
    });
  });
});
