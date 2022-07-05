import mongoose from "mongoose";

import "dotenv/config";

export default async function connectDatabase() {
  const connectionString = process.env.DATABASE_URI;

  if (!connectionString)
    throw new Error("Database URI is not set. INTERNAL ERROR");

  mongoose.connect(connectionString);
  mongoose.connection.on("connected", function () {
    console.log("Connected to Database " + "test");
  });
}
