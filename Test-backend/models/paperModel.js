import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
});

const paperSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherId: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  time: { type: Number, required: true },
  correctMarks: { type: Number, required: true },
  negativeMarks: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
});

const paperModel = mongoose.model("paperModel", paperSchema, "Saved-Papers");

export default paperModel;
