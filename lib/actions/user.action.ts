"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId }); // search the user by clerk Id

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
