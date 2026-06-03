import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/authRoute";
import itineraryRouter from "./routes/itineraryRoute";
import documentRouter from "./routes/documentRoute";
import { connectDB } from "./config/database";
import cors from "cors";

config({});
connectDB();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api/itinerary", itineraryRouter);
app.use("/api/document", documentRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port :", process.env.PORT || 5000);
});
