import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "000000000" },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  password: { type: String, required: true },
  teacherId: { type: String, unique: true, required: true },
});

const teacherModel =
  mongoose.models.teacher || mongoose.model("teacher", teacherSchema);
export default teacherModel;
