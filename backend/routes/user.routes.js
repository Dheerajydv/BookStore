import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  getUserData,
  changePassword,
  changeUsername,
  updateProfilePhoto,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/getuser", verifyUser, getUserData);
router.post("/changeusername", verifyUser, changeUsername);
router.post("/changepassword", verifyUser, changePassword);
router.post(
  "changeprofile",
  verifyUser,
  upload.single("newProfile"),
  updateProfilePhoto
);

export default router;
