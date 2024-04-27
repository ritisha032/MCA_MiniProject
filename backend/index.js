import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import  userRoutes  from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import { appErrorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import messRoutes from "./routes/messRoutes.js";
const app = express();
const DIRNAME = path.resolve();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Route handlers
app.use("/api/user",userRoutes);
app.use("/api/admin" ,adminRoutes);
app.use("/api/mess",messRoutes);



// Error middlewares 
app.all('*', notFoundHandler);
app.use(appErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
