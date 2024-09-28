import Book from "../model/books.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (!allBooks) {
      throw new ApiError(500, "Server Error");
    }

    res.status(200).json(new ApiResponse(200, allBooks, "All books fetched"));
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const addBook = async (req, res) => {
  try {
    const { bookTitle, author } = req.body;
    if (!bookTitle || !author) {
      throw new ApiError(400, "All fields are required");
    }

    const bookAlreadyExists = await Book.findOne({ bookTitle, author });
    if (bookAlreadyExists) {
      throw new ApiError(400, "Book Already Exists");
    }

    const bookCoverLocalPath = req.file.path;
    if (!bookCoverLocalPath) {
      throw new ApiError(400, "Please provide a cover photo for the book");
    }

    const bookCover = await uploadOnCloudinary(bookCoverLocalPath);
    if (!bookCover) {
      throw new ApiError(500, "Book Cover not uploaded");
    }

    const createdBook = await Book.create({
      title: bookTitle,
      author,
      cover: bookCover.url,
    });

    res
      .status(200)
      .json(new ApiResponse(200, createdBook, "New Book Added Sucessfully"));
  } catch (error) {
    console.error("Some error in add book controller", error);
    res.json({ error });
  }
};

export { getAllBooks, addBook };
