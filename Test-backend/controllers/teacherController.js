import paperModel from "../models/paperModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import teacherModel from "../models/teacherModel.js";

const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, userType, teacherId } = req.body;

    // checking for all data to register user
    if (!name || !email || !password || !teacherId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Check if teacherId already exists
    const existingTeacher = await teacherModel.findOne({ teacherId });
    if (existingTeacher) {
      return res.json({
        success: false,
        message: "Teacher ID already exists. Please use a unique ID.",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacherData = {
      name,
      email,
      password: hashedPassword,
      teacherId,
    };

    const newTeacher = new teacherModel(teacherData);

    const teacher = await newTeacher.save();
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to login teacher
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get teacher profile data
const getTeacherProfile = async (req, res) => {
  try {
    // Get the teacher ID from the decoded token (added by authUser middleware)
    const teacherId = req.body.userId;

    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher ID is required" });
    }

    // Query the teacher's details using the teacher ID (from the token)
    const teacherData = await teacherModel
      .findById(teacherId)
      .select("-password"); // Exclude password from the response

    if (!teacherData) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    res.json({ success: true, teacherData });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to save the paper submitted by teacher
const saveQuizPaper = async (req, res) => {
  try {
    const {
      totalQuestions,
      teacherId,
      time,
      correctMarks,
      negativeMarks,
      questions,
      subject,
    } = req.body;

    // Validate required fields
    if (
      !totalQuestions ||
      !time ||
      !correctMarks ||
      !questions ||
      !subject ||
      !teacherId
    ) {
      return res.json({ success: false, message: "Missing required details" });
    }

    // Validate total questions
    if (questions.length !== totalQuestions) {
      return res.json({
        success: false,
        message:
          "The number of questions does not match the totalQuestions count",
      });
    }

    // Save the paper in the database
    const paperData = {
      subject,
      teacherId,
      totalQuestions,
      time,
      correctMarks,
      negativeMarks,
      questions,
    };

    const newPaper = new paperModel(paperData);
    const savedPaper = await newPaper.save();

    res.json({
      success: true,
      message: "Quiz paper saved successfully",
      paper: savedPaper,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get the paper submitted by teacher
// API to get the paper submitted by teacher
const getPaper = async (req, res) => {
  try {
    const { teacherId } = req.body; // Get teacherId from request body

    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher ID is required" });
    }

    // Query the papers saved by the teacher
    const papers = await paperModel.find({ teacherId });

    if (!papers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No papers found for this teacher" });
    }

    res.json({ success: true, papers });
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  loginTeacher,
  registerTeacher,
  saveQuizPaper,
  getPaper,
  getTeacherProfile,
};
