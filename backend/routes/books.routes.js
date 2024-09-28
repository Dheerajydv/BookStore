import express from "express";
import { getAllBooks, addBook } from "../controllers/books.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/allbooks", getAllBooks);
router.post("/addbook", upload.single("bookCover"), addBook);

export default router;
