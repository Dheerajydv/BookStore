import React from "react";

function BookList(props) {
  // console.log(props.book);
  return (
    <div className="my-4  rounded-xl py-4 ">
      <h3 className="text-xl font-semibold underline">
        {props.title} ({props.books.length})
      </h3>
      <ol>
        {props.books.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ol>
    </div>
  );
}

export default BookList;
