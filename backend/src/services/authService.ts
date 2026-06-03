import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/user";
import { Types } from "mongoose";

export async function registerService(
  name: string,
  email: string,
  password: string,
) {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return {
    success: true,
    message: "Registration Successful",
    token,
  };
}

export async function loginService(email: string, password: string) {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return {
    success: true,
    user: user,
    message: "Login Successful",
    token,
  };
}

export async function getCurrentUserService(userId: Types.ObjectId) {
  const user = await User.findById(userId).select("-password");
  return user;
}
