import paperModel from "../models/paperModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import teacherModel from "../models/teacherModel.js";

const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // checking for all data to register user
    if (!name || !email || !password) {
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

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacherData = {
      name,
      email,
      password: hashedPassword,
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
    console.log("Received data:", req.body);
    const {
      subject,
      totalQuestions,
      time,
      correctMarks,
      negativeMarks,
      questions,
    } = req.body;
    const teacherId = req.body.userId; // ✅ Extracted from `authUser` middleware

    // Validate required fields
    if (
      !subject ||
      !totalQuestions ||
      !time ||
      !correctMarks ||
      !questions ||
      !teacherId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required details" });
    }

    // Validate total questions count
    if (questions.length !== totalQuestions) {
      return res.status(400).json({
        success: false,
        message:
          "The number of questions does not match the totalQuestions count",
      });
    }

    // Save the paper in the database
    const newPaper = new paperModel({
      subject,
      teacherId,
      totalQuestions,
      time,
      correctMarks,
      negativeMarks,
      questions,
    });
    await newPaper.save();

    res.json({
      success: true,
      message: "Quiz paper saved successfully",
      paper: newPaper,
    });
  } catch (error) {
    console.error("Error saving quiz paper:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to get the paper submitted by teacher
const getAllPapers = async (req, res) => {
  try {
    // ✅ Query the papers submitted by the teacher
    const papers = await paperModel.find({});

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

// API to update paper
const updatePaper = async (req, res) => {
  try {
    const {
      paperId,
      totalQuestions,
      time,
      correctMarks,
      negativeMarks,
      subject,
      questions, // Array of updated questions
    } = req.body;

    if (
      !paperId ||
      !totalQuestions ||
      !time ||
      !correctMarks ||
      !negativeMarks ||
      !subject ||
      !questions
    ) {
      return res.json({ success: false, message: "Missing required details" });
    }

    // Update the paper in the database with the new question set and other details
    const updatedPaper = await paperModel.findByIdAndUpdate(
      paperId,
      {
        totalQuestions,
        time,
        correctMarks,
        negativeMarks,
        subject,
        questions, // Updated questions array
      },
      { new: true } // To return the updated document
    );

    if (!updatedPaper) {
      return res.json({ success: false, message: "Paper not found" });
    }

    res.json({
      success: true,
      message: "Paper updated successfully",
      paper: updatedPaper,
    });
  } catch (error) {
    console.error("Error updating paper:", error);
    res.json({ success: false, message: error.message });
  }
};
export {
  loginTeacher,
  registerTeacher,
  saveQuizPaper,
  getAllPapers,
  getTeacherProfile,
  updatePaper,
};
