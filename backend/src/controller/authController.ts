import { type Request, type Response } from "express";

import {
  registerService,
  loginService,
  getCurrentUserService,
} from "../services/authService";
import User, { type IUser } from "../model/user";
import { Types } from "mongoose";

interface Req extends Request {
  user?: (IUser & { _id: Types.ObjectId }) | null;
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const result = await registerService(name, email, password);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const result = await loginService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function getCurrentUser(req: Req, res: Response) {
  try {
    const user = await getCurrentUserService(req.user!._id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
