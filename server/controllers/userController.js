import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import sendMail from '../middlewares/sendMail.js';

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser ={
            name,
            email,
            password: hashedPassword,
        };

        const otp = Math.floor(100000 + Math.random() * 900000);

        const activationToken = jwt.sign({ newUser, otp }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const data = {
            name, otp
        }
        await sendMail(email, "EceraLearn", data);
        res.status(200).json({
            message: "Otp send to your mail",
            activationToken,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userVerify = async (req, res) => {
    try {
        const { activationToken, otp } = req.body;

        if (!activationToken || !otp) {
            return res.status(400).json({ 
                message: "Please provide both activation token and OTP" 
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(activationToken, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ 
                    message: "Verification session expired. Please register again." 
                });
            }
            throw error;
        }

        const { newUser, otp: storedOtp } = decoded;

        // Convert both OTPs to strings for comparison
        if (String(storedOtp) !== String(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if user already exists (double check)
        const existingUser = await userModel.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists. Please login instead." 
            });
        }

        // Create new user
        const user = new userModel(newUser);
        await user.save();

        res.status(201).json({ 
            success: true,
            message: "Account verified successfully", 
            user 
        });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ 
            message: "Verification failed. Please try again." 
        });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: `Login successful${user.name}`, token,user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const myProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};