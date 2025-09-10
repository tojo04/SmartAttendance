import React from 'react';

/**
 * Attendance statistics cards component
 */
const AttendanceStats = ({ stats, variant = 'default' }) => {
  const { present, absent, total, rate } = stats;

  if (variant === 'summary') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{present}</div>
          <div className="text-sm font-medium text-purple-600">Present</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">{absent}</div>
          <div className="text-sm font-medium text-purple-600">Absent</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{total}</div>
          <div className="text-sm font-medium text-purple-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-700 mb-1">{rate}%</div>
          <div className="text-sm font-medium text-purple-600">Attendance Rate</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
        <div className="text-3xl font-bold text-purple-600 mb-1">{present}</div>
        <div className="text-sm font-medium text-purple-800">Students Present</div>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center border border-purple-200">
        <div className="text-3xl font-bold text-purple-400 mb-1">{total - present}</div>
        <div className="text-sm font-medium text-purple-600">Students Pending</div>
      </div>
    </div>
  );
};

export default AttendanceStats;
