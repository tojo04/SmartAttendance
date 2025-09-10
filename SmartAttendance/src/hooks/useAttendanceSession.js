import { useState } from 'react';
import { initializeStudentStatuses, simulateStudentArrivals, filterStudentsByStatus } from '../utils/attendanceUtils';

/**
 * Custom hook for managing attendance session state and actions
 */
export const useAttendanceSession = () => {
  const [currentView, setCurrentView] = useState('classList');
  const [selectedClass, setSelectedClass] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [studentStatuses, setStudentStatuses] = useState({});

  /**
   * Start a new attendance session
   * @param {Object} classData - The class data object
   */
  const startSession = (classData) => {
    setSelectedClass(classData);
    setSessionStartTime(Date.now());
    setSessionDuration(0);
    setStudentStatuses(initializeStudentStatuses(classData));
    setCurrentView('activeSession');
  };

  /**
   * Stop the current session and go to summary
   */
  const stopSession = () => {
    setCurrentView('summary');
  };

  /**
   * Go back to the class list view
   */
  const goBackToClasses = () => {
    setCurrentView('classList');
    setSelectedClass(null);
    setSessionStartTime(null);
    setSessionDuration(0);
    setStudentStatuses({});
  };

  /**
   * Update session duration
   * @param {number} duration - New duration in seconds
   */
  const updateSessionDuration = (duration) => {
    setSessionDuration(duration);
  };

  /**
   * Simulate student arrivals for demonstration
   */
  const simulateStudentArrival = () => {
    if (!selectedClass) return;
    
    const pendingStudents = filterStudentsByStatus(
      selectedClass.students, 
      studentStatuses, 
      'pending'
    );
    
    simulateStudentArrivals(pendingStudents, setStudentStatuses);
  };

  /**
   * Mark a specific student as present
   * @param {number} studentId - The student ID
   */
  const markStudentPresent = (studentId) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: 'present'
    }));
  };

  /**
   * Mark a specific student as absent
   * @param {number} studentId - The student ID
   */
  const markStudentAbsent = (studentId) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: 'absent'
    }));
  };

  /**
   * Get students filtered by status
   * @param {string} status - Status to filter by ('present', 'absent', 'pending')
   * @returns {Array} Filtered students array
   */
  const getStudentsByStatus = (status) => {
    if (!selectedClass) return [];
    return filterStudentsByStatus(selectedClass.students, studentStatuses, status);
  };

  return {
    // State
    currentView,
    selectedClass,
    sessionStartTime,
    sessionDuration,
    studentStatuses,
    
    // Actions
    startSession,
    stopSession,
    goBackToClasses,
    updateSessionDuration,
    simulateStudentArrival,
    markStudentPresent,
    markStudentAbsent,
    setStudentStatuses,
    
    // Computed values
    getStudentsByStatus,
    presentStudents: getStudentsByStatus('present'),
    absentStudents: getStudentsByStatus('absent'),
    pendingStudents: getStudentsByStatus('pending')
  };
};
