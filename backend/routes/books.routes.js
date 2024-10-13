import express from "express";
import {
  getAllBooks,
  addBook,
  likeBook,
  disLikeBooks,
  markAsRead,
  searchBook,
} from "../controllers/books.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/allbooks", getAllBooks);
router.get("/search", searchBook);
router.post("/addbook", upload.single("bookCover"), addBook);
router.post("/likebook/:id", verifyUser, likeBook);
router.post("/dislikebook/:id", verifyUser, disLikeBooks);
router.post("/markasread/:id", verifyUser, disLikeBooks);

export default router;
