import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handlePasswordChangeBtn = (e) => {
    console.log({ oldPassword, newPassword });
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/v1/users/changepassword",
        { oldPassword, newPassword },
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
        console.error(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
  return (
    <div>
      <p>Change Password</p>
      <input
        type="text"
        placeholder="Enter Old Password"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button onClick={handlePasswordChangeBtn}>Update Password</button>
    </div>
  );
}

export default UpdatePassword;
