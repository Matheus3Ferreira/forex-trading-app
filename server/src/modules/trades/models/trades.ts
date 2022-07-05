import mongoose, { Schema } from "mongoose";

const tradeSchema = new mongoose.Schema({
  volume: {
    type: Number,
    required: true,
  },
  openValueTrade: {
    type: Number,
    required: true,
  },
  closeValueTrade: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  result: {
    type: Number,
  },
  openAt: {
    type: Date,
    default: Date.now(),
  },
  closeAt: {
    type: Date,
  },
});

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
