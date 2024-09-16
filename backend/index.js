// Package Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Imports
import bookRoutes from "./routes/books.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
// const port = process.env.PORT;

// Middlewares
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/auth", authRoutes);

// App Listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// DataBase
const connectToDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/bookstore")
    .then(() => console.log("MongoDB connected sucessfully"))
    .catch((err) =>
      console.error("Some error occured while connecting to MongoDB", err)
    );
};

connectToDatabase();
