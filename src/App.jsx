import React from 'react';
import Header from './components/common/Header';
import ClassListView from './components/class/ClassListView';
import ActiveSessionView from './components/session/ActiveSessionView';
import SessionSummaryView from './components/session/SessionSummaryView';
import { useAttendanceSession } from './hooks/useAttendanceSession';
import { useGeoSound } from './hooks/useGeoSound';
import { useSessionTimer } from './hooks/useSessionTimer';
import { mockClasses } from './data/mockData';
import { calculateAttendanceStats, generateSignalStrength } from './utils/attendanceUtils';

/**
 * Main SmartAttendance Application Component
 * Manages the overall application state and routing between views
 */
const App = () => {
  // Custom hooks for state management
  const {
    currentView,
    selectedClass,
    sessionStartTime,
    sessionDuration,
    studentStatuses,
    startSession,
    stopSession,
    goBackToClasses,
    updateSessionDuration,
    simulateStudentArrival,
    presentStudents,
    absentStudents
  } = useAttendanceSession();

  const {
    geoSoundActive,
    geoSoundStrength,
    lastSoundTest,
    detectedDevices,
    isAudioSupported,
    generateWave,
    stopWave,
    testGeoSound,
    updateDetectedDevices,
    resetGeoSound,
    isPlaying
  } = useGeoSound();

  // Update geo-sound metrics during active sessions
  const updateGeoSoundMetrics = () => {
    if (geoSoundActive) {
      const stats = calculateAttendanceStats(selectedClass, studentStatuses);
      updateDetectedDevices(stats.present, selectedClass?.studentCount);
      
      // Simulate signal strength fluctuations
      const newStrength = generateSignalStrength(95, 100);
      // Note: In a real implementation, you'd update the strength via the hook
    }
  };

  // Timer hook for session duration and geo-sound updates
  useSessionTimer(
    currentView, 
    sessionStartTime, 
    updateSessionDuration, 
    geoSoundActive, 
    updateGeoSoundMetrics
  );

  // Enhanced session handlers
  const handleStartSession = async (classData) => {
    startSession(classData);
    
    // Start geo-sound system automatically
    const waveStarted = await generateWave();
    if (waveStarted) {
      console.log('✅ Session started with geo-sound active');
    } else {
      console.warn('⚠️ Session started but geo-sound failed to activate');
    }
  };

  const handleStopSession = () => {
    stopWave();
    resetGeoSound();
    stopSession();
  };

  const handleBackToClasses = () => {
    stopWave();
    resetGeoSound();
    goBackToClasses();
  };

  // Geo-sound props bundle for passing to components
  const geoSoundProps = {
    geoSoundActive,
    geoSoundStrength,
    lastSoundTest,
    detectedDevices,
    isAudioSupported,
    isPlaying
  };

  // Main render logic based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'classList':
        return (
          <ClassListView
            classes={mockClasses}
            onStartSession={handleStartSession}
            isAudioSupported={isAudioSupported}
          />
        );
      
      case 'activeSession':
        return (
          <ActiveSessionView
            selectedClass={selectedClass}
            sessionDuration={sessionDuration}
            studentStatuses={studentStatuses}
            geoSoundProps={geoSoundProps}
            onGenerateWave={generateWave}
            onStopWave={stopWave}
            onStopSession={handleStopSession}
            onTestGeoSound={testGeoSound}
          />
        );
      
      case 'summary':
        return (
          <SessionSummaryView
            selectedClass={selectedClass}
            sessionDuration={sessionDuration}
            studentStatuses={studentStatuses}
            presentStudents={presentStudents}
            absentStudents={absentStudents}
            onBackToClasses={handleBackToClasses}
          />
        );
      
      default:
        return <ClassListView classes={mockClasses} onStartSession={handleStartSession} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header 
        currentView={currentView} 
        onBackToClasses={handleBackToClasses} 
      />
      {renderCurrentView()}
    </div>
  );
};

export default App;