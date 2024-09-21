import React from "react";

function BookList(props) {
  // console.log(props.book);
  return (
    <div>
      <h3>{props.title}</h3>
      {props.books.map((book) => (
        <p key={book}>{book}</p>
      ))}
    </div>
  );
}

export default BookList;
