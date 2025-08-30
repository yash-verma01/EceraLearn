import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import  sendMail  from '../middlewares/sendMail.js';

export const RegisterUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

       
        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
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

export const VerifyUser = async (req, res) => {
    try {
        const { activationToken, otp } = req.body;

        // Verify JWT
        const decoded = jwt.verify(activationToken, process.env.JWT_SECRET);
        const { newUser } = decoded;

        if (decoded.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Create user
        const user = new userModel(newUser);
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
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

        // Fetch user details
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};