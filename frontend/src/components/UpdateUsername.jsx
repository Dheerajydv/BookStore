import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function UpdateUsername() {
  const [newUsername, setNewUsername] = useState("");
  const handleUsernameChangeBtn = (e) => {
    console.log(newUsername);
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/v1/users/changeusername",
        { newUsername },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <p>Change Username</p>
      <input
        type="text"
        value={newUsername}
        placeholder="Enter New Username"
        onChange={(e) => {
          setNewUsername(e.target.value);
        }}
      />
      <button onClick={handleUsernameChangeBtn}>Update Username</button>
    </div>
  );
}

export default UpdateUsername;
