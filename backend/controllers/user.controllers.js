import User from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserData = async (req, res) => {
  //   res.send("hello");
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "Please Provide a id");
    }

    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      res.status(404).json(new ApiError(404, "User data not found"));
    }

    res.status(200).json(new ApiResponse(200, userData, "Got user Data"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        new ApiError(500, "Some error occured in user getUserData controller")
      );
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    const { oldPassword, newPassword } = req.body;
    console.log({ oldPassword, newPassword });
    if (!oldPassword || !newPassword) {
      throw new ApiError(400, "All fields are required");
    }
    if (oldPassword === newPassword) {
      throw new ApiError(400, "Old and new passwords are same");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Incorrect Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed sucessfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const changeUsername = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { newUsername } = req.body;
    if (!newUsername) {
      throw new ApiError(400, "New username required");
    }

    user.username = newUsername;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { "New Username": newUsername },
          "Username changed"
        )
      );
  } catch (error) {
    console.error(error);
    res.status(200).json({ error });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(req.files);
    const avatarLocalPath = req.file.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Please provide a avatar");
    }

    const newProfilePicture = await uploadOnCloudinary(avatarLocalPath);
    if (!newProfilePicture) {
      throw new ApiError(
        500,
        "Some error occured in the uploading of new profile pricture"
      );
    }

    user.profilePicture = newProfilePicture.url;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Profile Picture changed sucessfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const likeBook = async (req, res) => {};

export {
  getUserData,
  likeBook,
  changePassword,
  updateProfilePhoto,
  changeUsername,
};
