import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';



const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middlewarea

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
