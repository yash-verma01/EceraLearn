import courseModel from '../model/courseModel.js';
import lectureModel from '../model/lectureModel.js';
import userModel from '../model/userModel.js';  // Add this missing import

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({ 
      success: true,
      courses 
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching courses"
    });
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }
    res.status(200).json({ 
      success: true,
      course 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching course"
    });
  }
};

export const fetchLectures = async (req, res) => {
  try {
    const lectures = await lectureModel.find({ course: req.params.id });
    if (!lectures || lectures.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No lectures found" 
      });
    }

    const user = await userModel.findById(req.userId); // Changed from req.user._id to req.userId
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Admin can always access
    if (user.role === "admin") {
      return res.status(200).json({ 
        success: true,
        lectures 
      });
    }

    // Check subscription
    if (!user.subscription.includes(req.params.id)) {
      return res.status(403).json({
        success: false,
        message: "You have not subscribed to this course",
      });
    }

    return res.status(200).json({ 
      success: true,
      lectures 
    });

  } catch (error) {
    console.error("Error fetching lectures:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching lectures",
      error: error.message,
    });
  }
};

export const fetchLecture = async (req, res) => {
  try {
    const lecture = await lectureModel.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found"
      });
    }

    const user = await userModel.findById(req.userId); // Changed from req.user._id to req.userId
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role === "admin") {
      return res.status(200).json({ 
        success: true,
        lecture 
      });
    }

    if (!user.subscription.includes(req.params.id)) {
      return res.status(403).json({
        success: false,
        message: "You have not subscribed to this course",
      });
    }

    res.status(200).json({ 
      success: true,
      lecture 
    });
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lecture",
      error: error.message
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const courses = await courseModel.find({ 
      _id: { $in: user.subscription } 
    });

    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching your courses",
      error: error.message
    });
  }
};