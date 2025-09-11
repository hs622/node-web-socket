import mongoose from "mongoose";
import { databaseName } from "../constants";

const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${databaseName}`
    );
    console.log(
      `\nMongoDB connected! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connected Failed`, error);
    process.exit(1);
  }
};

export default connectDatabase;
