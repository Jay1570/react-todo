import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DATABASE_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(url, {});
        console.log("Database is connected");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }
};

export default connectDB;
