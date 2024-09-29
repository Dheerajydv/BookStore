import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import Footer from "../components/Footer";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/books/allbooks").then((res) => {
      // console.log(res.data.data);
      setAllBooks(res.data.data);
    });
  }, [setAllBooks]);
  return (
    <div>
      <Navbar />
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-950 text-white"
            : "min-h-screen"
        }
      >
        <h1 className="font-bold text-center text-2xl">ALL BOOKS</h1>
        <div className="flex justify-center items-center flex-wrap">
          {allBooks[0] ? (
            allBooks.map((book) => (
              <div
                key={book.title}
                className={
                  theme === "dark"
                    ? "h-80 bg-gray-500 m-5 p-2 w-80 rounded-xl flex justify-center items-center  gap-4"
                    : "h-80 bg-gray-200 m-5 p-2 w-80 flex rounded-xl justify-center items-center  gap-4"
                }
              >
                <div className="w-1/3 flex justify-center items-center">
                  <img
                    src={
                      book.cover === ""
                        ? "../../public/download.jpg"
                        : book.cover
                    }
                    className="h-full"
                    alt="Book Cover"
                  />
                </div>
                <div className="w-2/3">
                  <h2 className="font-bold text-xl"> {book.title}</h2>
                  <h3>Author - {book.author}</h3>
                  <div>
                    <p>Likes - {book.likes}</p>
                    <button
                      className={
                        theme === "dark"
                          ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                          : "rounded-xl h-8 px-1 w-18 bg-gray-100"
                      }
                    >
                      Like 👍
                    </button>
                  </div>
                  <div>
                    <p>Dislikes - {book.disLikes}</p>
                    <button
                      className={
                        theme === "dark"
                          ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                          : "rounded-xl h-8 px-1 w-18 bg-gray-100"
                      }
                    >
                      Dislike 👎
                    </button>
                  </div>
                  <div>
                    <p>Read By - {book.readBy}</p>
                    <button
                      className={
                        theme === "dark"
                          ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                          : "rounded-xl h-8 px-1 w-18 bg-gray-100"
                      }
                    >
                      Mark as Read
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>LODING.......</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
