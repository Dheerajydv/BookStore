import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 6) {
      res
        .status(400)
        .json(
          new ApiError(
            400,
            "Enter a valid Username containing minimum 6 letters"
          )
        );
    }

    if (!password || password.length < 6) {
      res
        .status(400)
        .json(
          new ApiError(
            400,
            "Provide a valid Password containing minimum 6 letters"
          )
        );
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res
        .status(400)
        .json(new ApiError(400, "User already exists please Login"));
    }

    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      res
        .status(400)
        .json(
          new ApiError(
            400,
            "User with this username already exists please choose another username"
          )
        );
    }

    console.log(req.file.path);
    const profilePicLocalPath = req.file.path;
    if (!profilePicLocalPath) {
      res.status(400).json(new ApiError(400, "Profile Pic required"));
    }

    const uploadedProfilePicture = await uploadOnCloudinary(
      profilePicLocalPath
    );

    await User.create({
      username,
      email,
      password,
      profilePicture: uploadedProfilePicture.url,
    });
    const createdUser = await User.findOne({ username }).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, createdUser, "Signup sucessfull"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Some error occured in signup controller"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json(new ApiError(400, "User not found"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      res.status(401).json(new ApiError(401, "Password Incorrect"));
    }

    const accessToken = await generateAccessToken(user._id);
    const loggesInUser = await User.findById(user._id).select("-password");

    const options = {
      htmlOnly: false,
      secure: false,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggesInUser, "Login sucessfull"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Some error occured in login controller"));
  }
};

const getUser = async (req, res) => {
  const userId = req.user._id;
  const userInfo = await User.findById(userId);
  res.status(200).json(new ApiResponse(200, userInfo, "Got user data"));
};

const updateProfilePicture = async (req, res) => {};

const updateProfileInfo = async (req, res) => {};

export {
  signupUser,
  loginUser,
  updateProfilePicture,
  updateProfileInfo,
  getUser,
};
