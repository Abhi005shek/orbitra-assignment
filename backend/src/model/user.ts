import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: [6, "Password must be at least 6 characters long"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);
export type { IUser };
export default User;
