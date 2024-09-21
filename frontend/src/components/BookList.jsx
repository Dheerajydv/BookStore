import React from "react";

function BookList(props) {
  // console.log(props.book);
  return (
    <div>
      {props.books.map((book) => (
        <p key={book}>{book}</p>
      ))}
    </div>
  );
}

export default BookList;
