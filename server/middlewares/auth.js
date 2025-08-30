import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js"

export const auth=async(req,res,next)=>{
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).json({ message: "Login First" });
    }
};
