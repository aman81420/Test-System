import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import {
  saveQuizPaper,
  getPaper,
  getTeacherProfile,
  registerTeacher,
  loginTeacher,
} from "../controllers/teacherController.js";

import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/registerTeacher", registerTeacher);
userRouter.post("/login", loginUser);
userRouter.post("/loginTeacher", loginTeacher);
userRouter.post("/saveQuizPaper", saveQuizPaper);
userRouter.post("/getPaper", getPaper);

userRouter.get("/getUserProfile", authUser, getUserProfile);
userRouter.post(
  "/update-profile",
  // upload.single("image"),
  authUser
  // updateProfile
);
userRouter.get("/getTeacherProfile", authUser, getTeacherProfile);

export default userRouter;
