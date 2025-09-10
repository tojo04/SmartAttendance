import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Student roster component showing real-time attendance status
 */
const StudentRoster = ({ students, studentStatuses }) => {
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
        <h3 className="text-lg font-semibold text-purple-900">Live Student Roster</h3>
        <p className="text-sm text-purple-600 mt-1">Real-time attendance status</p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-purple-100">
          {students.map((student) => {
            const status = studentStatuses[student.id] || 'pending';
            return (
              <div key={student.id} className="p-4 hover:bg-purple-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      status === 'present' 
                        ? 'bg-purple-500 shadow-lg shadow-purple-200' 
                        : 'bg-purple-300'
                    }`}></div>
                    <div>
                      <div className="font-medium text-purple-900">{student.name}</div>
                      <div className="text-sm text-purple-600">{student.rollNo}</div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                    status === 'present'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {status === 'present' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span>Present</span>
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
