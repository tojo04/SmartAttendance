import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
   rollNo: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate attendance for same student in same session
attendanceSchema.index({ rollNo: 1, sessionId: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;