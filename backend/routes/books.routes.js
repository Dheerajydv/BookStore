import express from "express";
import { getAllBooks } from "../controllers/books.controllers.js";

const router = express.Router();

router.get("/allbooks", getAllBooks);
// router.post("/addbook", addBook);

export default router;
