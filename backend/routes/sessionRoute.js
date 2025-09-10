import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

// Create a new session
router.post('/create', async (req, res) => {
    try {
        const {
            sessionId,
            classId,
            subject,
            grade,
            section,
            studentCount,
            status = 'active',
            startTime
        } = req.body;

        // Validate required fields
        if (!sessionId || !classId || !subject || !grade || !section || !studentCount) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        const session = new Session({
            sessionId,
            classId,
            subject,
            grade,
            section,
            studentCount,
            status,
            startTime: startTime ? new Date(startTime) : new Date()
        });
        
        await session.save();

        res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: session,
            sessionId: session.sessionId
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

// Get all sessions
router.get('/all', async (req, res) => {
    try {
        const sessions = await Session.find()
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching sessions',
            error: error.message
        });
    }
});

// Get session by ID
router.get('/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        const session = await Session.findOne({ sessionId }).lean();
        
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        res.status(200).json({
            success: true,
            data: session
        });
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching session',
            error: error.message
        });
    }
});

// Update session status
router.put('/:sessionId/status', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { status } = req.body;

        if (!['active', 'ended'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be "active" or "ended"'
            });
        }

        const updateData = { status };
        if (status === 'ended') {
            updateData.endTime = new Date();
        }

        const session = await Session.findOneAndUpdate(
            { sessionId },
            updateData,
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `Session ${status} successfully`,
            data: session
        });
    } catch (error) {
        console.error('Error updating session status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating session status',
            error: error.message
        });
    }
});

// Delete session
router.delete('/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        const session = await Session.findOneAndDelete({ sessionId });
        
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Session deleted successfully',
            data: session
        });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting session',
            error: error.message
        });
    }
});

export default router;
