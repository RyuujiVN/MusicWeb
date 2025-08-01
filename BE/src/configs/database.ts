import mongoose from "mongoose";
import env from "./environment";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
