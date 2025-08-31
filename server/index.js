import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from 'express';
import { connectDB } from "./config/database.js";
import userRouter from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
