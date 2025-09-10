import express from 'express';
import Session from '../models/Session.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new session
router.post('/create', async (req, res) => {
    try {
       
        
      
       const session = new Session(req.body); // if schema doesn’t match, crash
       await session.save();

        res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: session
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating session',
            error: error.message
        });
    }
});



export default router;
