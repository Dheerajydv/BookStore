import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import UpdateProfile from "../components/UpdateProfile";
import UpdateUsername from "../components/UpdateUsername";
import UpdatePassword from "../components/UpdatePassword";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import Footer from "../components/Footer";
import AddBooks from "../components/AddBooks";

function Profile() {
  // const thisBook = [
  //   "The Silent Grove",
  //   "Whispers of Eternity",
  //   "Beneath the Iron Sky",
  //   "Tales of Forgotten Realms",
  //   "Echoes of the Past",
  //   "Into the Midnight Forest",
  //   "The Last Ember",
  //   "Shadows Over the Crescent Moon",
  //   "Songs of the Deep",
  //   "The Glass Fortress",
  //   "Rise of the Silver Phoenix",
  // ];
  // const alsoThis = [
  //   "The Glass Fortress",
  //   "Rise of the Silver Phoenix",
  //   "The Darkened Horizon",
  //   "Winds of the Eastern Sea",
  //   "The Heart of the Storm",
  //   "A World Beyond Time",
  //   "The Eternal Library",
  //   "Shimmering Sands",
  //   "Of Fire and Frost",
  //   "Dreams of the Serpent King",
  //   "The Labyrinth of Stars",
  //   "The Lost City of Ember",
  //   "Legends of the Hidden Realm",
  //   "The Alchemist’s Key",
  //   "Falling Leaves and Broken Hearts",
  //   "The Crystal Crown",
  // ];
  // const thisTo = [
  //   "The Price of Immortality",
  //   "The Moonstone Heir",
  //   "Whispers Beneath the Waves",
  //   "The Ember Queen",
  //   "The Winter Oracle",
  //   "The Sea of Broken Dreams",
  //   "The Sunken Palace",
  //   "Bloodlines of the Ancients",
  //   "Shores of the Crescent Moon",
  //   "The Tower of Glass",
  //   "Tides of a Broken World",
  //   "The King's Gambit",
  //   "Veins of the Earth",
  //   "The Storm and the Song",
  //   "The Riddle of Fire",
  // ];

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
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Navbar />
      <div
        className={
          theme == "dark"
            ? "min-h-screen bg-gray-950 text-white flex justify-center py-10"
            : "min-h-screen flex justify-center py-10"
        }
      >
        <div
          className={
            theme == "dark"
              ? "bg-gray-950s flex flex-col items-end px-10 w-1/2  text-white"
              : "flex flex-col items-end px-10 w-1/2 "
          }
        >
          <img
            src={data.profileUrl}
            className="w-80 h-80 rounded-full"
            alt="Profile Picture"
          />
          <UpdateProfile />
        </div>
        <div
          className={theme == "dark" ? "bg-gray-950 w-1/2 text-white" : "w-1/2"}
        >
          <div>
            <h1 className="font-bold my-4 text-3xl">
              Username - {data.username}
            </h1>
            <p className="my-4 text-3xl">Email - {data.email}</p>
            <div className="my-4">
              <UpdateUsername />
              <UpdatePassword />
            </div>
            <div>
              <BookList title={"Liked Books"} books={data.likedBooks} />
              <BookList title={"Disiked Books"} books={data.disLikedBooks} />
              <BookList title={"Books To Read"} books={data.toRead} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          theme === "dark"
            ? "bg-gray-950 m-0 py-2 text-white text-center"
            : "text-center m-0 py-2"
        }
      >
        <h1 className="font-bold my-4 text-3xl">Add Books</h1>
        <h1 className="font-bold my-4 text-3xl">↓</h1>
      </div>
      <div className="h-80">
        <AddBooks />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Profile;
