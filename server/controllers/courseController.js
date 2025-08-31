import courseModel from '../model/courseModel.js';
import lectureModel from '../model/lectureModel.js';


export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};


export const getSingleCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};


export const fetchLectures = async (req, res) => {
  try {
    const lectures = await lectureModel.find({ course: req.params.id });
    if (!lectures) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin can always access
    if (user.role === "admin") {
      return res.status(200).json({ lectures });
    }

    // Check subscription
    if (!user.subscription.includes(req.params.id)) {
      return res.status(403).json({
        message: "You have not subscribed to this course",
      });
    }

    // If checks pass, return lecture
    return res.status(200).json({ lectures });

  } catch (error) {
    console.error("Error fetching lecture:", error.message);
    return res.status(500).json({
      message: "Error fetching lecture",
      error: error.message,
    });
  }
};



export const fetchLecture =async (req, res) => {
  const lecture = await lectureModel.findById(req.params.id);

  const user = await userModel.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
};


export const getMyCourses = async (req, res) => {
  const courses = await courseModel.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
};
