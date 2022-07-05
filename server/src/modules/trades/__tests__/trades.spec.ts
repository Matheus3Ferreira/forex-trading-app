import connectDatabase from "../../../database";
import OpenTradeService from "../services/OpenTradeService";
import { NextFunction } from "express";

describe("Trades Services", () => {
  beforeAll(() => connectDatabase());

  describe("Open Trade Service", () => {
    const userIdTest = "62c3568b2187c38058b1e5f8";
    it("should create a new trade", async () => {
      const openTradeService = new OpenTradeService();
      const newTrade = await openTradeService.execute(
        {
          volume: 0.5,
          type: "buy",
          userId: userIdTest,
          to: "USD",
          from: "GBP",
        },
        () => {}
      );
      expect(newTrade).toHaveProperty("_id");
    });
  });
});
