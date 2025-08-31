import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const lectureModel = mongoose.model("Lecture", schema);
export default lectureModel;