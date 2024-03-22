import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let connection;

const connectDB = async () => {
  if (!connection) {
    try {
      connection = await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }
  return connection;
};

export default connectDB;
