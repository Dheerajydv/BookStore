import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/books/allbooks").then((res) => {
      // console.log(res.data.data);
      setAllBooks(res.data.data);
    });
  }, [setAllBooks]);
  return (
    <div>
      <Navbar />
      <div>
        <h1>ALL BOOKS</h1>
        {allBooks[0]
          ? allBooks.map((book) => (
              <div key={book.title}>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <img src={book.cover} height={"100px"} alt="Book Cover" />
                <div>
                  <p>LIKES</p>
                  <p>{book.likes}</p>
                </div>
                <div>
                  <p>DISLIKES</p>
                  <p>{book.disLikes}</p>
                </div>
                <div>
                  <p>READ BY</p>
                  <p>{book.readBy}</p>
                </div>
              </div>
            ))
          : "Loding"}
      </div>
    </div>
  );
}

export default Home;
