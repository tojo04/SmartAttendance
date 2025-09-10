/**
 * Format time duration from seconds to MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted time string
 */
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate attendance statistics
 * @param {Object} selectedClass - The selected class object
 * @param {Object} studentStatuses - Object mapping student IDs to their status
 * @returns {Object} Statistics object with present, absent, total, and rate
 */
export const calculateAttendanceStats = (selectedClass, studentStatuses) => {
  if (!selectedClass) return { present: 0, absent: 0, total: 0, rate: 0 };
  
  const present = selectedClass.students.filter(
    student => studentStatuses[student.id] === 'present'
  ).length;
  const total = selectedClass.students.length;
  const absent = total - present;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;
  
  return { present, absent, total, rate };
};

/**
 * Filter students by their attendance status
 * @param {Array} students - Array of student objects
 * @param {Object} studentStatuses - Object mapping student IDs to their status
 * @param {string} status - The status to filter by ('present', 'absent', 'pending')
 * @returns {Array} Filtered array of students
 */
export const filterStudentsByStatus = (students, studentStatuses, status) => {
  if (!students) return [];
  
  return students.filter(student => {
    const studentStatus = studentStatuses[student.id] || 'pending';
    return status === 'absent' 
      ? studentStatus !== 'present' 
      : studentStatus === status;
  });
};

/**
 * Initialize student statuses for a class
 * @param {Object} classData - The class object containing students
 * @returns {Object} Object mapping student IDs to 'pending' status
 */
export const initializeStudentStatuses = (classData) => {
  const initialStatuses = {};
  if (classData?.students) {
    classData.students.forEach(student => {
      initialStatuses[student.id] = 'pending';
    });
  }
  return initialStatuses;
};

/**
 * Simulate random student arrivals for demonstration
 * @param {Array} pendingStudents - Array of students with pending status
 * @param {Function} setStudentStatuses - State setter function
 * @param {number} maxStudents - Maximum number of students to mark (default: 3)
 */
export const simulateStudentArrivals = (pendingStudents, setStudentStatuses, maxStudents = 3) => {
  if (!pendingStudents || pendingStudents.length === 0) return;
  
  // Randomly select 1-3 students to mark as present
  const numToMark = Math.min(
    Math.floor(Math.random() * maxStudents) + 1,
    pendingStudents.length
  );
  
  const studentsToMark = [];
  const availableStudents = [...pendingStudents];
  
  for (let i = 0; i < numToMark; i++) {
    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const student = availableStudents.splice(randomIndex, 1)[0];
    studentsToMark.push(student);
  }
  
  // Update statuses with a slight delay for visual effect
  studentsToMark.forEach((student, index) => {
    setTimeout(() => {
      setStudentStatuses(prev => ({
        ...prev,
        [student.id]: 'present'
      }));
    }, index * 500);
  });
};

/**
 * Generate a random signal strength value within a range
 * @param {number} min - Minimum value (default: 95)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Random signal strength value
 */
export const generateSignalStrength = (min = 95, max = 100) => {
  return min + Math.random() * (max - min);
};

/**
 * Calculate detected devices based on attendance and random factors
 * @param {number} presentCount - Number of present students
 * @param {number} maxStudents - Maximum number of students in class
 * @returns {number} Number of detected devices
 */
export const calculateDetectedDevices = (presentCount, maxStudents) => {
  return Math.min(
    Math.floor(Math.random() * 8) + Math.max(0, presentCount - 2),
    maxStudents || 0
  );
};
