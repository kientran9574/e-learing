"use server";
import mongoose from "mongoose";
let isConnect: boolean = false;
export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("Connect to Database fail");
  }
  if (isConnect) {
    console.log("Connect to Database is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ucademy",
    });
    isConnect = true;
    console.log("Using connect to database success");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
