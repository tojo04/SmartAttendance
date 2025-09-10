import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Play, 
  Square, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Volume2,
  QrCode,
  Download,
  ArrowLeft,
  UserCheck,
  UserX,
  Zap
} from 'lucide-react';

// Mock data for classes and students
const mockClasses = [
  {
    id: 1,
    subject: 'Physics',
    grade: 'Grade 12',
    section: 'A',
    studentCount: 28,
    students: [
      { id: 1, name: 'Alice Johnson', rollNo: 'P12A001' },
      { id: 2, name: 'Bob Smith', rollNo: 'P12A002' },
      { id: 3, name: 'Carol Davis', rollNo: 'P12A003' },
      { id: 4, name: 'David Wilson', rollNo: 'P12A004' },
      { id: 5, name: 'Emma Brown', rollNo: 'P12A005' },
      { id: 6, name: 'Frank Miller', rollNo: 'P12A006' },
      { id: 7, name: 'Grace Lee', rollNo: 'P12A007' },
      { id: 8, name: 'Henry Taylor', rollNo: 'P12A008' },
      { id: 9, name: 'Ivy Chen', rollNo: 'P12A009' },
      { id: 10, name: 'Jack Anderson', rollNo: 'P12A010' },
      { id: 11, name: 'Kate Thompson', rollNo: 'P12A011' },
      { id: 12, name: 'Liam Garcia', rollNo: 'P12A012' },
      { id: 13, name: 'Maya Patel', rollNo: 'P12A013' },
      { id: 14, name: 'Noah Martinez', rollNo: 'P12A014' },
      { id: 15, name: 'Olivia Rodriguez', rollNo: 'P12A015' },
      { id: 16, name: 'Peter Kim', rollNo: 'P12A016' },
      { id: 17, name: 'Quinn O\'Brien', rollNo: 'P12A017' },
      { id: 18, name: 'Rachel Green', rollNo: 'P12A018' },
      { id: 19, name: 'Sam Cooper', rollNo: 'P12A019' },
      { id: 20, name: 'Tina Wang', rollNo: 'P12A020' },
      { id: 21, name: 'Uma Singh', rollNo: 'P12A021' },
      { id: 22, name: 'Victor Lopez', rollNo: 'P12A022' },
      { id: 23, name: 'Wendy Clark', rollNo: 'P12A023' },
      { id: 24, name: 'Xavier Hall', rollNo: 'P12A024' },
      { id: 25, name: 'Yuki Tanaka', rollNo: 'P12A025' },
      { id: 26, name: 'Zoe Adams', rollNo: 'P12A026' },
      { id: 27, name: 'Alex Morgan', rollNo: 'P12A027' },
      { id: 28, name: 'Blake Turner', rollNo: 'P12A028' }
    ]
  },
  {
    id: 2,
    subject: 'Chemistry',
    grade: 'Grade 11',
    section: 'B',
    studentCount: 25,
    students: [
      { id: 29, name: 'Aria Foster', rollNo: 'C11B001' },
      { id: 30, name: 'Ben Carter', rollNo: 'C11B002' },
      { id: 31, name: 'Chloe Evans', rollNo: 'C11B003' },
      { id: 32, name: 'Dylan Reed', rollNo: 'C11B004' },
      { id: 33, name: 'Ella Murphy', rollNo: 'C11B005' },
      { id: 34, name: 'Felix Wright', rollNo: 'C11B006' },
      { id: 35, name: 'Gina Scott', rollNo: 'C11B007' },
      { id: 36, name: 'Hugo Bell', rollNo: 'C11B008' },
      { id: 37, name: 'Iris Collins', rollNo: 'C11B009' },
      { id: 38, name: 'Jake Morris', rollNo: 'C11B010' },
      { id: 39, name: 'Kira Hayes', rollNo: 'C11B011' },
      { id: 40, name: 'Leo Barnes', rollNo: 'C11B012' },
      { id: 41, name: 'Mia Ross', rollNo: 'C11B013' },
      { id: 42, name: 'Nate Powell', rollNo: 'C11B014' },
      { id: 43, name: 'Opal Hughes', rollNo: 'C11B015' },
      { id: 44, name: 'Paul Fisher', rollNo: 'C11B016' },
      { id: 45, name: 'Quincy Ward', rollNo: 'C11B017' },
      { id: 46, name: 'Ruby Price', rollNo: 'C11B018' },
      { id: 47, name: 'Seth Gray', rollNo: 'C11B019' },
      { id: 48, name: 'Tara Stone', rollNo: 'C11B020' },
      { id: 49, name: 'Ulysses Cook', rollNo: 'C11B021' },
      { id: 50, name: 'Vera James', rollNo: 'C11B022' },
      { id: 51, name: 'Wade Brooks', rollNo: 'C11B023' },
      { id: 52, name: 'Xara Kelly', rollNo: 'C11B024' },
      { id: 53, name: 'Yara Rivera', rollNo: 'C11B025' }
    ]
  },
  {
    id: 3,
    subject: 'Mathematics',
    grade: 'Grade 10',
    section: 'C',
    studentCount: 30,
    students: [
      { id: 54, name: 'Adam White', rollNo: 'M10C001' },
      { id: 55, name: 'Bella Torres', rollNo: 'M10C002' },
      { id: 56, name: 'Chris Parker', rollNo: 'M10C003' },
      { id: 57, name: 'Dana Lewis', rollNo: 'M10C004' },
      { id: 58, name: 'Ethan Young', rollNo: 'M10C005' },
      { id: 59, name: 'Fiona King', rollNo: 'M10C006' },
      { id: 60, name: 'George Hill', rollNo: 'M10C007' },
      { id: 61, name: 'Hannah Green', rollNo: 'M10C008' },
      { id: 62, name: 'Ian Baker', rollNo: 'M10C009' },
      { id: 63, name: 'Jenna Adams', rollNo: 'M10C010' },
      { id: 64, name: 'Kyle Nelson', rollNo: 'M10C011' },
      { id: 65, name: 'Luna Carter', rollNo: 'M10C012' },
      { id: 66, name: 'Mason Mitchell', rollNo: 'M10C013' },
      { id: 67, name: 'Nora Perez', rollNo: 'M10C014' },
      { id: 68, name: 'Owen Roberts', rollNo: 'M10C015' },
      { id: 69, name: 'Paige Turner', rollNo: 'M10C016' },
      { id: 70, name: 'Quentin Phillips', rollNo: 'M10C017' },
      { id: 71, name: 'Riley Campbell', rollNo: 'M10C018' },
      { id: 72, name: 'Sophia Parker', rollNo: 'M10C019' },
      { id: 73, name: 'Tyler Evans', rollNo: 'M10C020' },
      { id: 74, name: 'Unity Davis', rollNo: 'M10C021' },
      { id: 75, name: 'Violet Miller', rollNo: 'M10C022' },
      { id: 76, name: 'William Wilson', rollNo: 'M10C023' },
      { id: 77, name: 'Xander Moore', rollNo: 'M10C024' },
      { id: 78, name: 'Yasmin Taylor', rollNo: 'M10C025' },
      { id: 79, name: 'Zachary Anderson', rollNo: 'M10C026' },
      { id: 80, name: 'Abby Thomas', rollNo: 'M10C027' },
      { id: 81, name: 'Brian Jackson', rollNo: 'M10C028' },
      { id: 82, name: 'Carly White', rollNo: 'M10C029' },
      { id: 83, name: 'Derek Harris', rollNo: 'M10C030' }
    ]
  }
];

const App = () => {
  // Main application state
  const [currentView, setCurrentView] = useState('classList'); // 'classList', 'activeSession', 'summary'
  const [selectedClass, setSelectedClass] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [studentStatuses, setStudentStatuses] = useState({});

  // Timer effect for active sessions
  useEffect(() => {
    let interval;
    if (currentView === 'activeSession' && sessionStartTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, sessionStartTime]);

  // Format time duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start attendance session
  const startSession = (classData) => {
    setSelectedClass(classData);
    setSessionStartTime(Date.now());
    setSessionDuration(0);
    
    // Initialize all students as pending
    const initialStatuses = {};
    classData.students.forEach(student => {
      initialStatuses[student.id] = 'pending';
    });
    setStudentStatuses(initialStatuses);
    
    setCurrentView('activeSession');
  };

  // Simulate student arrivals (for demonstration)
  const simulateStudentArrival = () => {
    if (!selectedClass) return;
    
    const pendingStudents = selectedClass.students.filter(
      student => studentStatuses[student.id] === 'pending'
    );
    
    if (pendingStudents.length === 0) return;
    
    // Randomly select 1-3 students to mark as present
    const numToMark = Math.min(
      Math.floor(Math.random() * 3) + 1,
      pendingStudents.length
    );
    
    const studentsToMark = [];
    for (let i = 0; i < numToMark; i++) {
      const randomIndex = Math.floor(Math.random() * pendingStudents.length);
      const student = pendingStudents.splice(randomIndex, 1)[0];
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

  // Stop session and go to summary
  const stopSession = () => {
    setCurrentView('summary');
  };

  // Go back to class list
  const goBackToClasses = () => {
    setCurrentView('classList');
    setSelectedClass(null);
    setSessionStartTime(null);
    setSessionDuration(0);
    setStudentStatuses({});
  };

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    if (!selectedClass) return { present: 0, absent: 0, total: 0, rate: 0 };
    
    const present = selectedClass.students.filter(
      student => studentStatuses[student.id] === 'present'
    ).length;
    const total = selectedClass.students.length;
    const absent = total - present;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { present, absent, total, rate };
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SmartAttendance</h1>
              <p className="text-sm text-gray-500">Secure Geo-Sound & Visual QR System</p>
            </div>
          </div>
          {currentView !== 'classList' && (
            <button
              onClick={goBackToClasses}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Classes</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );

  // Class List View Component
  const ClassListView = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Classes</h2>
        <p className="text-gray-600">Select a class to start an attendance session</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((classData) => (
          <div key={classData.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {classData.studentCount} students
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {classData.subject}
              </h3>
              <p className="text-gray-600 mb-4">
                {classData.grade} - Section {classData.section}
              </p>
              
              <button
                onClick={() => startSession(classData)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Start Attendance Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Active Session View Component
  const ActiveSessionView = () => {
    const stats = getAttendanceStats();
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Active Session: {selectedClass?.subject} - {selectedClass?.grade}
              </h2>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {formatDuration(sessionDuration)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Total Students: {selectedClass?.studentCount}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <button
                onClick={simulateStudentArrival}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Simulate Student Arrival</span>
              </button>
              
              <button
                onClick={stopSession}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Square className="h-4 w-4" />
                <span>Stop Session</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: QR Share and System Status */}
          <div className="space-y-6">
            {/* Visual QR Share Display */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Visual QR Share</h3>
                <QrCode className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-4">
                <div className="qr-pattern w-full h-64 rounded-lg border-2 border-dashed border-gray-300"></div>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                Students must overlay their QR share with this pattern to complete verification
              </p>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-green-600 animate-pulse" />
                    <span className="font-medium text-green-800">Geo-Sound Active</span>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <QrCode className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Visual QR Ready</span>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Live Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{stats.present}</div>
                <div className="text-sm font-medium text-green-800">Students Present</div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.total - stats.present}</div>
                <div className="text-sm font-medium text-yellow-800">Students Pending</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Student Roster */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Student Roster</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time attendance status</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {selectedClass?.students.map((student) => {
                  const status = studentStatuses[student.id] || 'pending';
                  return (
                    <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            status === 'present' 
                              ? 'bg-green-500 shadow-lg shadow-green-200' 
                              : 'bg-yellow-400'
                          }`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNo}</div>
                          </div>
                        </div>
                        
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                          status === 'present'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
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
        </div>
      </div>
    );
  };

  // Session Summary View Component
  const SessionSummaryView = () => {
    const stats = getAttendanceStats();
    const presentStudents = selectedClass?.students.filter(
      student => studentStatuses[student.id] === 'present'
    ) || [];
    const absentStudents = selectedClass?.students.filter(
      student => studentStatuses[student.id] !== 'present'
    ) || [];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Session Complete</h2>
            <p className="text-gray-600">
              {selectedClass?.subject} - {selectedClass?.grade} • Duration: {formatDuration(sessionDuration)}
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.present}</div>
              <div className="text-sm font-medium text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{stats.absent}</div>
              <div className="text-sm font-medium text-gray-600">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
              <div className="text-sm font-medium text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.rate}%</div>
              <div className="text-sm font-medium text-gray-600">Attendance Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button
              onClick={goBackToClasses}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Save and Close
            </button>
          </div>
        </div>

        {/* Detailed Lists */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Present Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Present Students ({presentStudents.length})
                </h3>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {presentStudents.map((student) => (
                  <div key={student.id} className="p-4 flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.rollNo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Absent Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <UserX className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Absent Students ({absentStudents.length})
                </h3>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {absentStudents.map((student) => (
                  <div key={student.id} className="p-4 flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.rollNo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentView === 'classList' && <ClassListView />}
      {currentView === 'activeSession' && <ActiveSessionView />}
      {currentView === 'summary' && <SessionSummaryView />}
    </div>
  );
};

export default App;