import React from 'react';
import { CheckCircle, Download, UserCheck, UserX } from 'lucide-react';
import AttendanceStats from '../common/AttendanceStats';
import { calculateAttendanceStats, formatDuration } from '../../utils/attendanceUtils';

/**
 * Student list component for summary view
 */
const StudentList = ({ students, title, icon: Icon, emptyMessage }) => {
  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6 text-center">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center justify-center space-x-3">
          <Icon className="h-5 w-5 text-purple-600" />
          <span>{title} (0)</span>
        </h3>
        <p className="text-purple-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200">
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">
            {title} ({students.length})
          </h3>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto">
        <div className="divide-y divide-purple-100">
          {students.map((student) => (
            <div key={student.id} className="p-4 flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <div className="font-medium text-purple-900">{student.name}</div>
                <div className="text-sm text-purple-600">{student.rollNo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Session summary view component
 */
const SessionSummaryView = ({ 
  selectedClass, 
  sessionDuration, 
  studentStatuses, 
  presentStudents, 
  absentStudents,
  onBackToClasses 
}) => {
  const stats = calculateAttendanceStats(selectedClass, studentStatuses);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Header */}
      <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-8 mb-8">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-purple-900 mb-2">Session Complete</h2>
          <p className="text-purple-600">
            {selectedClass?.subject} - {selectedClass?.grade} • Duration: {formatDuration(sessionDuration)}
          </p>
        </div>

        {/* Statistics Grid */}
        <AttendanceStats stats={stats} variant="summary" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button
            onClick={onBackToClasses}
            className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Save and Close
          </button>
        </div>
      </div>

      {/* Detailed Lists */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Present Students */}
        <StudentList
          students={presentStudents}
          title="Present Students"
          icon={UserCheck}
          emptyMessage="No students marked as present"
        />

        {/* Absent Students */}
        <StudentList
          students={absentStudents}
          title="Absent Students"
          icon={UserX}
          emptyMessage="All students are present!"
        />
      </div>
    </div>
  );
};

export default SessionSummaryView;
