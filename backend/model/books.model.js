import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      default: "Unknown",
    },
    likes: {
      type: Number,
    },
    disLikes: {
      type: Number,
    },
    readBy: {
      type: Number,
    },
    bookRating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
