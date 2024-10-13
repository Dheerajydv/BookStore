import Book from "../model/books.model.js";
import User from "../model/user.model.js";
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

const likeBook = async (req, res) => {
  try {
    // find the book id
    const bookId = req.params.id;
    if (!bookId) {
      throw new ApiError(400, "Book Id not Found");
    }

    const userId = req.user._id.toString();
    if (!userId) {
      throw new ApiError(401, "Please login first to like and dislike books ");
    }

    // check if the book is already liked
    const allLikedBooks = await User.findById(userId).select(
      "-_id -username -password -email -disLikedBooks -profilePicture -toRead"
    );

    console.log(allLikedBooks);

    let bookAlreadyLiked;
    // console.log(allLikedBooks.likedBooks.length);
    for (let i = 0; i < allLikedBooks.likedBooks.length; i++) {
      if (allLikedBooks.likedBooks[i].toString() === bookId) {
        bookAlreadyLiked = true;
      }
    }
    if (bookAlreadyLiked) {
      throw new ApiError(400, "Book Already Liked");
    }

    // find the book with the id
    // update the likes by one
    const book = await Book.findByIdAndUpdate(bookId, {
      $inc: { likes: 1 },
    });
    if (!book) {
      throw new ApiError(500, "Book not found");
    }

    const updatedBook = await book.save();

    // find the user who liked and add the book with the id to the liked books section of the user
    const user = await User.findByIdAndUpdate(userId, {
      $push: { likedBooks: updatedBook },
    });

    // update both the user and book section
    res
      .status(200)
      .json(
        new ApiResponse(200, { user, updatedBook }, "Book liked succesfully")
      );
  } catch (error) {
    console.error("Some error in like book controller : ", error);
    res.json({ error });
  }
};

const disLikeBooks = async (req, res) => {
  try {
    // find the book id
    const bookId = req.params.id;
    if (!bookId) {
      throw new ApiError(400, "Book Id not Found");
    }

    const userId = req.user._id.toString();
    if (!userId) {
      throw new ApiError(401, "Please login first to like and dislike books ");
    }

    // check if the book is already liked
    const allDisLikedBooks = await User.findById(userId).select(
      "-_id -username -password -email -likedBooks -profilePicture -toRead"
    );

    console.log(allDisLikedBooks.disLikedBooks);

    let bookAlreadyDisiked = false;
    // console.log(allLikedBooks.likedBooks.length);
    for (let i = 0; i < allDisLikedBooks.disLikedBooks.length; i++) {
      if (allDisLikedBooks.disLikedBooks[i].toString() === bookId) {
        bookAlreadyDisiked = true;
      }
    }
    if (bookAlreadyDisiked) {
      throw new ApiError(400, "Book Already Disliked");
    }

    // find the book with the id
    // update the likes by one
    const book = await Book.findByIdAndUpdate(bookId, {
      $inc: { disLikes: 1 },
    });
    if (!book) {
      throw new ApiError(500, "Book not found");
    }

    const updatedBook = await book.save();

    // find the user who liked and add the book with the id to the liked books section of the user
    const user = await User.findByIdAndUpdate(userId, {
      $push: { disLikedBooks: updatedBook },
    });

    // update both the user and book section
    res
      .status(200)
      .json(
        new ApiResponse(200, { user, updatedBook }, "Book Disliked succesfully")
      );
  } catch (error) {
    console.error("Some error in dislike book controller : ", error);
    res.json({ error });
  }
};

const markAsRead = async (req, res) => {
  const bookId = req.params.id;
};

const searchBook = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      throw new ApiError(400, "Please Enter a Book Name");
    }

    const book = await Book.findOne({ title });
    console.log(book);
    if (!book) {
      throw new ApiError(404, "Book Not Found");
    }

    res.status(200).json(new ApiResponse(200, book, "Book Found"));
  } catch (error) {
    console.error("Some error in search book controller : ", error);
    res.json({ error });
  }
};

export { getAllBooks, addBook, likeBook, disLikeBooks, markAsRead, searchBook };
