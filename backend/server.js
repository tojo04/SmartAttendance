import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import attendanceRoutes from './routes/attendanceRoute.js';
import sessionRoutes from './routes/sessionRoute.js';
import cors from 'cors';

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0', () => {
   console.log(`🚀 Server running on port ${PORT}`);
});
