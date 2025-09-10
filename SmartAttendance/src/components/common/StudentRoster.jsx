import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, UserCheck } from 'lucide-react';
import axios from 'axios';

/**
 * Student roster component showing real-time attendance status
 */
const StudentRoster = ({ students, studentStatuses, onAttendanceMarked }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Expose the markAttendanceByRollNumbers function to parent component
  useEffect(() => {
    if (onAttendanceMarked && typeof onAttendanceMarked === 'function') {
      onAttendanceMarked(markAttendanceByRollNumbers);
    }
  }, [onAttendanceMarked]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/attendance/all");
      setAttendanceData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  // Function to mark attendance for specific roll numbers
  const markAttendanceByRollNumbers = async (rollNumbers, sessionId = null) => {
    if (!rollNumbers || rollNumbers.length === 0) {
      console.log('No roll numbers provided');
      return { success: false, message: 'No roll numbers provided' };
    }

    try {
      const currentSessionId = sessionId || `session_${Date.now()}`;
      
      console.log('Marking attendance for roll numbers:', rollNumbers);
      
      const results = [];
      
      for (const rollNo of rollNumbers) {
        try {
          const response = await axios.post('http://localhost:5000/api/attendance/mark', {
            rollNo,
            sessionId: currentSessionId
          });
          results.push({ rollNo, success: true, data: response.data });
        } catch (error) {
          console.error(`Error marking attendance for ${rollNo}:`, error);
          results.push({ 
            rollNo, 
            success: false, 
            error: error.response?.data?.message || 'Error marking attendance' 
          });
        }
      }
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      // Refresh attendance data
      await fetchAttendanceData();
      
      return {
        success: true,
        results,
        summary: {
          total: rollNumbers.length,
          successful,
          failed
        }
      };
      
    } catch (error) {
      console.error('Error in bulk attendance marking:', error);
      return { success: false, message: 'Error marking attendance' };
    }
  };

  // Function to mark all present students based on their roll numbers
  const markAllPresentStudents = async () => {
    if (!students || students.length === 0) {
      alert('No students found to mark attendance');
      return;
    }

    setIsMarkingAttendance(true);
    
    try {
      // Get current session ID (you can modify this based on your session logic)
      const currentSessionId = `session_${Date.now()}`;
      
      // Extract roll numbers from students array
      const rollNumbers = students.map(student => student.rollNo);
      
      console.log('Marking attendance for roll numbers:', rollNumbers);
      
      // Mark attendance for each student
      const attendancePromises = rollNumbers.map(async (rollNo) => {
        try {
          const response = await axios.post('http://localhost:5000/api/attendance/mark', {
            rollNo,
            sessionId: currentSessionId
          });
          return { rollNo, success: true, data: response.data };
        } catch (error) {
          console.error(`Error marking attendance for ${rollNo}:`, error);
          return { rollNo, success: false, error: error.response?.data?.message || 'Error' };
        }
      });

      const results = await Promise.all(attendancePromises);
      
      // Count successful and failed attempts
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      alert(`Attendance marked successfully for ${successful} students. ${failed > 0 ? `Failed for ${failed} students.` : ''}`);
      
      // Refresh attendance data
      await fetchAttendanceData();
      
    } catch (error) {
      console.error('Error marking bulk attendance:', error);
      alert('Error marking attendance. Please try again.');
    } finally {
      setIsMarkingAttendance(false);
    }
  };

  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Student Roster</h3>
        <p className="text-purple-600 text-center">No students found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200">
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-purple-900">Live Student Roster</h3>
            <p className="text-sm text-purple-600 mt-1">Real-time attendance status</p>
          </div>
          {/* <button
            onClick={markAllPresentStudents}
            disabled={isMarkingAttendance}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isMarkingAttendance
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>
              {isMarkingAttendance ? 'Marking...' : 'Mark All Present'}
            </span>
          </button> */}
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto student-roster-scroll">
        <div className="divide-y divide-purple-100">
          {students.map((student) => {
            const status = studentStatuses[student.id] || 'pending';
            // Check if this student's attendance is marked
            const isMarked = attendanceData.some(record => record.rollNo === student.rollNo);
            const displayStatus = isMarked ? 'present' : status;
            
            return (
              <div key={student.id} className="p-4 hover:bg-purple-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      displayStatus === 'present' 
                        ? 'bg-green-500 shadow-lg shadow-green-200' 
                        : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-purple-900">{student.name}</div>
                      <div className="text-sm text-purple-600">{student.rollNo}</div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                    displayStatus === 'present'
                      ? 'bg-green-300 text-purple-800'
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {displayStatus === 'present' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span >Present</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentRoster;
