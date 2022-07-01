import mongoose, { Schema } from "mongoose";

const tradeSchema = new mongoose.Schema({
        openPrice: {
            type: Number,
            required: true,
        },
        closePrice: {
            type: Number,
        },
        volume: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            default: "GBPUSD"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        openAt: {
            type: Date,
            default: Date.now()
        },
        closeAt: {
            type: Date
        }
});

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;

