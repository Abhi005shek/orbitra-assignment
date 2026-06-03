import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/orbitra";

export function connectDB() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
}
