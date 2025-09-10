import express from 'express';
import Attendance from '../models/Attendance.js';
import Session from '../models/Session.js';

const router = express.Router();

// Mark attendance for a specific session
router.post('/mark', async (req, res) => {
   const { rollNo, sessionId } = req.body;
   console.log("Marking attendance for:", JSON.stringify(req.body));
   
   try {
       // Validate required fields
       if (!rollNo || !sessionId) {
           return res.status(400).json({ 
               success: false,
               message: 'Roll number and session ID are required' 
           });
       }

       // Check if session exists and is active
       const session = await Session.findOne({ sessionId});
       if (!session) {
           return res.status(404).json({ 
               success: false,
               message: 'Session not found or inactive' 
           });
       }

       // Check if attendance already marked for this session
       const existingAttendance = await Attendance.findOne({ rollNo, sessionId });
       if (existingAttendance) {
           return res.status(400).json({ 
               success: false,
               message: 'Attendance already marked for this session',
               data: existingAttendance
           });
       }

       // Create new attendance record
       const attendance = new Attendance({ 
           rollNo, 
           sessionId,
           status: 'present'
       });
       
       await attendance.save();
       
       res.status(201).json({ 
           success: true,
           message: 'Attendance marked successfully', 
           data: attendance 
       });
   } catch (error) {
       console.error("Error marking attendance:", error);
       res.status(500).json({ 
           success: false,
           message: 'Error marking attendance', 
           error: error.message 
       });
   }
});

// Get all attendance records
router.get('/all', async (req, res) => {
   try {
       const records = await Attendance.find()
           .sort({ timestamp: -1 }).lean();
       
       res.status(200).json({
           success: true,
           count: records.length,
           data: records
       });
   } catch (error) {
       console.error("Error fetching attendance:", error);
       res.status(500).json({ 
           success: false,
           message: 'Error fetching attendance records', 
           error: error.message 
       });
   }
});

// Get attendance for a specific session
router.get('/session/:sessionId', async (req, res) => {
   try {
       const { sessionId } = req.params;
       
       const records = await Attendance.find({ sessionId })
           .sort({ timestamp: -1 }).lean();
       
       res.status(200).json({
           success: true,
           sessionId,
           count: records.length,
           data: records
       });
   } catch (error) {
       console.error("Error fetching session attendance:", error);
       res.status(500).json({ 
           success: false,
           message: 'Error fetching session attendance', 
           error: error.message 
       });
   }
});

export default router;