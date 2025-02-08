import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  getPaperById,
} from "../controllers/userController.js";
import {
  saveQuizPaper,
  getAllPapers,
  getTeacherProfile,
  registerTeacher,
  loginTeacher,
  updatePaper,
} from "../controllers/teacherController.js";

import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/registerTeacher", registerTeacher);
userRouter.post("/login", loginUser);
userRouter.post("/loginTeacher", loginTeacher);
userRouter.post("/saveQuizPaper", authUser, saveQuizPaper);
userRouter.get("/getPaper", authUser, getAllPapers);
userRouter.get("/getPaperById/:id", getPaperById);
// Update paper route
userRouter.post("/updatePaper", updatePaper);

userRouter.get("/getUserProfile", authUser, getUserProfile);
userRouter.post(
  "/update-profile",
  // upload.single("image"),
  authUser
  // updateProfile
);
userRouter.get("/getTeacherProfile", authUser, getTeacherProfile);
userRouter.get("/getAllPapers", getAllPapers);

export default userRouter;
