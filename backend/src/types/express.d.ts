import { Types } from "mongoose";
import { IUser } from "../model/user";

declare global {
  namespace Express {
    interface Request {
      user?: (IUser & { _id: Types.ObjectId }) | null;
    }
  }
}
