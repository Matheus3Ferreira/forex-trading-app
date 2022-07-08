import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  wallet: {
    type: Number,
    default: 10000,
  },
  trades: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trade",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
