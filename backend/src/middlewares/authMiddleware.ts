import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User, { type IUser } from "../model/user";
import { config } from "dotenv";
import { Types } from "mongoose";

config();

interface Req extends Request {
  user?: (IUser & { _id: Types.ObjectId }) | null;
}

export const authMiddleware = async (
  req: Req,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization failed. Please login first.",
      });
    }

    const token = authHeader.split(" ")[1] || "";

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      _id?: string;
    };

    if (!payload || !payload._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure. Authorization denied.",
      });
    }

    const userRecord = await User.findOne({ _id: payload._id });
    if (!userRecord) {
      return res.status(401).json({
        success: false,
        message: "User account associated with this token no longer exists.",
      });
    }

    req.user = userRecord;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Internal Server Error.",
    });
  }
};
