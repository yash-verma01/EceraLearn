import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; 
    next();
    } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not admin" });
        }
        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};