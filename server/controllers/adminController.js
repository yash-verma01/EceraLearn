import courseModel from "../model/courseModel.js";
import lectureModel from "../model/lectureModel.js";


export const createCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price, duration, category, createdBy, imageThumbnail } = req.body;
    const newCourse = new courseModel({
      title,
      description,
      price,
      duration,
      imageThumbnail,
      category,
      createdBy
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};


export const addLecture = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const { title, description } = req.body;
    const file = req.file;
    const newLecture = new lectureModel({
      title,
      description,
      video: file ? file.path : "",
      course: course._id
    });
    await newLecture.save();
    res.status(201).json({ message: "Lecture added successfully", lecture: newLecture });
  } catch (error) {
    res.status(500).json({ message: "Error adding lecture", error });
  }
};