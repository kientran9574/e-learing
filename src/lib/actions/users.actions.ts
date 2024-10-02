"use server";
import User from "@/database/users.model";
import { TCreateUserParams } from "@/types";
import { connectToDatabase } from "../mongoose";

export const createUser = async (params: TCreateUserParams) => {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
