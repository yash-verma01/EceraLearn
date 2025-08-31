import courseModel from "../model/courseModel.js";

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