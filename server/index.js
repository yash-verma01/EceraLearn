import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { connectDB } from './config/data.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
