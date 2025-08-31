import courseModel from "../model/courseModel.js";
import lectureModel from "../model/lectureModel.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import userModel from "../model/userModel.js";

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

export const deleteLecture = async (req, res) => {
  const lecture = await lectureModel.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted");
  });

  await lecture.deleteOne();

  res.json({ message: "Lecture Deleted" });
};


const unlink = promisify(fs.unlink);

export const deleteCourse = async (req, res) => {
  const course = await courseModel.findById(req.params.id);

  const lectures = await lectureModel.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlink(lecture.video);
      console.log("video deleted");
    })
  );

  rm(course.image, () => {
    console.log("image deleted");
  });

  await lectureModel.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await userModel.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
};  


export const getAllStats = async (req, res) => {
  const totalCourses = (await courseModel.find()).length;
  const totalLectures = (await lectureModel.find()).length;
  const totalUsers = (await userModel.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
};