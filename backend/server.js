import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todosRoutes from "./routes/todos.js";
import connectDB from "./db.js";

dotenv.config();

const app = express();
app.use(cors());

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todos", todosRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
