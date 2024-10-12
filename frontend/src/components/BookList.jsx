import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function BookList(props) {
  const { theme } = useContext(ThemeContext);
  // console.log(props.books.title);
  return (
    <div className="my-4  rounded-xl py-4 ">
      <h3 className="text-xl font-semibold underline">
        {props.title} ({props.books.length})
      </h3>
      <div className="flex gap-2 w-full min-h-6 p-2 justify-start items-start">
        {props.books.map((book) => (
          <div
            className={
              theme === "dark"
                ? "h-full p-2 rounded-xl text-white bg-gray-500 w-full"
                : "h-full p-2 rounded-xl bg-gray-200 w-full"
            }
          >
            <p key={book._id}>{book.title}</p>
          </div>
          // <li key={book._id}>{book.title}</li>
        ))}
      </div>
    </div>
  );
}

export default BookList;
