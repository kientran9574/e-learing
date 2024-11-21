"use server";
import { TCreateUserParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import User, { IUser } from "@/database/user.model";

export const createUser = async (params: TCreateUserParams) => {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
export const getUsersInfo = async (
  userId: string
): Promise<IUser | undefined> => {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
