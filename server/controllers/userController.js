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
        const decoded = jwt.verify(activationToken, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid activation token" });
        }
        const { newUser } = decoded;

        if (decoded.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const user = new userModel(newUser);
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
