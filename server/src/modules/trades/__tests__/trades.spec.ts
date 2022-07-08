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
    it("should spend error with invalid information", async () => {
      const invalidRequest = {
        symbol: "",
        volume: 0,
        type: "trade",
        userId: "",
      };

      const validRequest = {
        symbol: "USDGBP",
        volume: 1,
        type: "buy",
        userId: userIdTest,
      };

      const openTradeService = new OpenTradeService();

      await expect(
        openTradeService.execute(
          {
            symbol: validRequest.symbol,
            volume: invalidRequest.volume,
            type: validRequest.type,
            userId: validRequest.userId,
          },
          () => {}
        )
      ).rejects.toEqual(new Error("Invalid volume value"));

      await expect(
        openTradeService.execute(
          {
            symbol: validRequest.symbol,
            volume: validRequest.volume,
            type: invalidRequest.type,
            userId: validRequest.userId,
          },
          () => {}
        )
      ).rejects.toEqual(new Error("Invalid type"));

      await expect(
        openTradeService.execute(
          {
            symbol: validRequest.symbol,
            volume: validRequest.volume,
            type: validRequest.type,
            userId: invalidRequest.userId,
          },
          () => {}
        )
      ).rejects.toEqual(new Error("Id not provide"));

      await expect(
        openTradeService.execute(
          {
            symbol: invalidRequest.symbol,
            volume: validRequest.volume,
            type: validRequest.type,
            userId: validRequest.userId,
          },
          () => {}
        )
      ).rejects.toEqual(new Error("Symbol to/from is not valid."));
    });
  });
});
