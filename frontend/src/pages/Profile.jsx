import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import UpdateProfile from "../components/UpdateProfile";
import UpdateUsername from "../components/UpdateUsername";
import UpdatePassword from "../components/UpdatePassword";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return null;
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
          <UpdateProfile />
        </div>
        <div>
          <div>
            <h1>{data.username}</h1>
            <UpdateUsername />
            <UpdatePassword />
          </div>
          <p>{data.email}</p>
          <BookList title={"Liked Books"} books={data.likedBooks} />
          <BookList title={"Disiked Books"} books={data.disLikedBooks} />
          <BookList title={"Books To Read"} books={data.toRead} />
        </div>
      </div>
    </>
  );
}

export default Profile;
