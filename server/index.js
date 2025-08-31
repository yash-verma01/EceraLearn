import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from 'express';
import { connectDB } from "./config/database.js";
import userRouter from './routes/userRouter.js';
import courseRouter from './routes/courseRouter.js';
import adminRouter from './routes/adminRouter.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Your Vite frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/admin', adminRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/uploads',express.static('uploads'))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
