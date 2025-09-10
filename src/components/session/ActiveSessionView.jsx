import React from 'react';
import SessionHeader from './SessionHeader';
import { VisualQRShare } from './SystemStatus';
import AttendanceStats from '../common/AttendanceStats';
import StudentRoster from '../common/StudentRoster';
import { calculateAttendanceStats } from '../../utils/attendanceUtils';

/**
 * Active session view component
 */
const ActiveSessionView = ({ 
  selectedClass,
  sessionDuration,
  studentStatuses,
  geoSoundProps,
  onGenerateWave,
  onStopWave,
  onStopSession,
  onTestGeoSound
}) => {
  const stats = calculateAttendanceStats(selectedClass, studentStatuses);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Session Header */}
      <SessionHeader
        selectedClass={selectedClass}
        sessionDuration={sessionDuration}
        geoSoundActive={geoSoundProps.geoSoundActive}
        onGenerateWave={onGenerateWave}
        onStopWave={onStopWave}
        onStopSession={onStopSession}
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: QR Share and System Status */}
        <div className="space-y-6">
          {/* Visual QR Share Display */}
          <VisualQRShare />

          {/* System Status temporarily disabled */}

          {/* Live Counters */}
          <AttendanceStats stats={stats} />
        </div>

        {/* Right Column: Live Student Roster */}
        <StudentRoster
          students={selectedClass?.students}
          studentStatuses={studentStatuses}
        />
      </div>
    </div>
  );
};

export default ActiveSessionView;
