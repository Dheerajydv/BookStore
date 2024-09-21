import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BookList from "../components/BookList";

function Profile() {
  const [data, setData] = useState({
    username: "",
    email: "",
    profileUrl: "",
    likedBooks: [],
    disLikedBooks: [],
    toRead: [],
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/getuser", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data);
        setData({
          username: response.data.data.username,
          email: response.data.data.email,
          profileUrl: response.data.data.profilePicture,
          likedBooks: response.data.data.likedBooks,
          disLikedBooks: response.data.data.disLikedBooks,
          toRead: response.data.data.toRead,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setData]);
  const booksArray = [
    "Whispers of the Forgotten Woods",
    "The Chronicles of Echo City",
    "Beneath the Starlit Skies",
    "The Shadow of Solstice Tower",
    "Embers of a Distant War",
    "The Lost Keys of Valoria",
    "Echoes from the Abyss",
    "The Glass Kingdom’s Secret",
    "Moonlit Pathways and Dreams",
    "The Alchemist's Last Experiment",
  ];
  return (
    <>
      <Navbar />
      <div>
        <div>
          <img
            style={{ height: "250px" }}
            src={data.profileUrl}
            alt="Profile Picture"
          />
        </div>
        <div>
          <h1>{data.username}</h1>
          <p>{data.email}</p>
          <BookList books={data.likedBooks} />
          <BookList books={data.disLikedBooks} />
          <BookList books={data.toRead} />
        </div>
      </div>
    </>
  );
}

export default Profile;
