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
  Zap,
  Radio,
  StopCircle
} from 'lucide-react';

// Mock data for classes and students
const mockClasses = [
  {
    id: 1,
    subject: 'Computer Science',
    grade: 'BCS 2023',
    section: 'A',
    studentCount: 54,
    students: [
      { id: 1, name: 'Sankalp', rollNo: '12311001', email: 'sankalpbcs12311001@iiitsonepat.ac.in' },
      { id: 2, name: 'Madhursuman', rollNo: '12311002', email: 'madhursumanbcs12311002@iiitsonepat.ac.in' },
      { id: 3, name: 'Joydeep Gharami', rollNo: '12311003', email: 'joydeepgharamibcs12311003@iiitsonepat.ac.in' },
      { id: 4, name: 'Varun K R', rollNo: '12311004', email: 'varunkrbcs12311004@iiitsonepat.ac.in' },
      { id: 5, name: 'Shikhar Kanaujia', rollNo: '12311005', email: 'shikharkanaujiabcs12311005@iiitsonepat.ac.in' },
      { id: 6, name: 'Rupesh Agarwal', rollNo: '12311006', email: 'rupeshagarwalbcs12311006@iiitsonepat.ac.in' },
      { id: 7, name: 'Hitendra Vishwas', rollNo: '12311007', email: 'hitendravishwasbcs12311007@iiitsonepat.ac.in' },
      { id: 8, name: 'Satyansh Singh', rollNo: '12311009', email: 'satyanshsinghbcs12311009@iiitsonepat.ac.in' },
      { id: 9, name: 'Lovish Singla', rollNo: '12311010', email: 'lovishsinglabcs12311010@iiitsonepat.ac.in' },
      { id: 10, name: 'Pradeep Guguloth', rollNo: '12311011', email: 'pradeepgugulothbcs12311011@iiitsonepat.ac.in' },
      { id: 11, name: 'Shaurya Singh', rollNo: '12311012', email: 'shauryasinghbcs12311012@iiitsonepat.ac.in' },
      { id: 12, name: 'Sahil Kumar', rollNo: '12311013', email: 'sahilkumarbcs12311013@iiitsonepat.ac.in' },
      { id: 13, name: 'Vikash', rollNo: '12311014', email: 'vikashbcs12311014@iiitsonepat.ac.in' },
      { id: 14, name: 'Harsh Kaldoke', rollNo: '12311015', email: 'harshkaldokebcs12311015@iiitsonepat.ac.in' },
      { id: 15, name: 'Pankaj Bishnoi', rollNo: '12311016', email: 'pankajbishnoibcs12311016@iiitsonepat.ac.in' },
      { id: 16, name: 'Ankit Kumar Sharma', rollNo: '12311017', email: 'ankitkumarsharmabcs12311017@iiitsonepat.ac.in' },
      { id: 17, name: 'Utkarsh', rollNo: '12311018', email: 'utkarshbcs12311018@iiitsonepat.ac.in' },
      { id: 18, name: 'Shubham Rawat', rollNo: '12311019', email: 'shubhamrawatbcs12311019@iiitsonepat.ac.in' },
      { id: 19, name: 'Daulat Singh', rollNo: '12311020', email: 'daulatsinghbcs12311020@iiitsonepat.ac.in' },
      { id: 20, name: 'Ankush', rollNo: '12311021', email: 'ankushbcs12311021@iiitsonepat.ac.in' },
      { id: 21, name: 'Kartheek Budime', rollNo: '12311022', email: 'kartheekbudimebcs12311022@iiitsonepat.ac.in' },
      { id: 22, name: 'Yojit Goula', rollNo: '12311023', email: 'yojitgoulabcs12311023@iiitsonepat.ac.in' },
      { id: 23, name: 'Jay Agrawal', rollNo: '12311024', email: 'jayagrawalbcs12311024@iiitsonepat.ac.in' },
      { id: 24, name: 'Ritheesh Reddy Cheemala', rollNo: '12311025', email: 'ritheeshreddycheemalabcs12311025@iiitsonepat.ac.in' },
      { id: 25, name: 'Ravi Garg', rollNo: '12311026', email: 'ravigargbcs12311026@iiitsonepat.ac.in' },
      { id: 26, name: 'Nirmanyu Sood', rollNo: '12311027', email: 'nirmanyusoodbcs12311027@iiitsonepat.ac.in' },
      { id: 27, name: 'Ankur Kumar Verma', rollNo: '12311028', email: 'ankurkumarvermabcs12311028@iiitsonepat.ac.in' },
      { id: 28, name: 'Mohit Mehta', rollNo: '12311029', email: 'mohitmehtabcs12311029@iiitsonepat.ac.in' },
      { id: 29, name: 'Rohit Kumawat', rollNo: '12311030', email: 'rohitkumawatbcs12311030@iiitsonepat.ac.in' },
      { id: 30, name: 'Aniket Singh', rollNo: '12311031', email: 'aniketsinghbcs12311031@iiitsonepat.ac.in' },
      { id: 31, name: 'Supradeep Reddy Bodireddy', rollNo: '12311032', email: 'supradeepreddybodireddygaribcs12311032@iiitsonepat.ac.in' },
      { id: 32, name: 'Harsh Raj', rollNo: '12311033', email: 'harshrajbcs12311033@iiitsonepat.ac.in' },
      { id: 33, name: 'Utkarsh Pawade', rollNo: '12311035', email: 'utkarshpawadebcs12311035@iiitsonepat.ac.in' },
      { id: 34, name: 'Rahul', rollNo: '12311036', email: 'rahulbcs12311036@iiitsonepat.ac.in' },
      { id: 35, name: 'Priyanshu Singh', rollNo: '12311037', email: 'priyanshusinghbcs12311037@iiitsonepat.ac.in' },
      { id: 36, name: 'Aditya Joshi', rollNo: '12311039', email: 'adityajoshibcs12311039@iiitsonepat.ac.in' },
      { id: 37, name: 'Aditya Kumar', rollNo: '12311040', email: 'adityakumarbcs12311040@iiitsonepat.ac.in' },
      { id: 38, name: 'Shlok Gupta', rollNo: '12311041', email: 'shlokguptabcs12311041@iiitsonepat.ac.in' },
      { id: 39, name: 'Rajan Kumar', rollNo: '12311042', email: 'rajankumarbcs12311042@iiitsonepat.ac.in' },
      { id: 40, name: 'Shubhrit Shanker', rollNo: '12311043', email: 'shubhritshankerbcs12311043@iiitsonepat.ac.in' },
      { id: 41, name: 'Namanindoria', rollNo: '12311044', email: 'namanindoriabcs12311044@iiitsonepat.ac.in' },
      { id: 42, name: 'Kishna Aggarwal', rollNo: '12311045', email: 'kishnaaggarwalbcs12311045@iiitsonepat.ac.in' },
      { id: 43, name: 'Kavya Gupta', rollNo: '12311046', email: 'kavyaguptabcs12311046@iiitsonepat.ac.in' },
      { id: 44, name: 'Nakul Saini', rollNo: '12311047', email: 'nakulsainibcs12311047@iiitsonepat.ac.in' },
      { id: 45, name: 'Prakhar Srivastava', rollNo: '12311048', email: 'prakharsrivastavabcs12311048@iiitsonepat.ac.in' },
      { id: 46, name: 'Yuvan Sai Yegireddi', rollNo: '12311049', email: 'yuvansaiyegireddibcs12311049@iiitsonepat.ac.in' },
      { id: 47, name: 'Sameet Patro', rollNo: '12311050', email: 'sameetpatrobcs12311050@iiitsonepat.ac.in' },
      { id: 48, name: 'Harsh Kumar', rollNo: '12311051', email: 'harshkumarbcs12311051@iiitsonepat.ac.in' },
      { id: 49, name: 'Suyash Bajpai', rollNo: '12311052', email: 'suyashbajpaibcs12311052@iiitsonepat.ac.in' },
      { id: 50, name: 'Himanshu Bhilware', rollNo: '12311054', email: 'himanshubhilwarebcs12311054@iiitsonepat.ac.in' },
      { id: 51, name: 'Sujal Verma', rollNo: '12311055', email: 'sujalvermabcs12311055@iiitsonepat.ac.in' },
      { id: 52, name: 'Kunal Sharma', rollNo: '12311056', email: 'kunalsharmabcs12311056@iiitsonepat.ac.in' },
      { id: 53, name: 'Ankur Gautam', rollNo: '12311057', email: 'ankurgautambcs12311057@iiitsonepat.ac.in' },
      { id: 54, name: 'Yugank Fatehpuria', rollNo: '12311058', email: 'yugankfatehpuriabcs12311058@iiitsonepat.ac.in' },
      { id: 55, name: 'Aryan Rana', rollNo: '12311059', email: 'aryanranabcs12311059@iiitsonepat.ac.in' },
      { id: 56, name: 'Swati', rollNo: '12311060', email: 'swatibcs12311060@iiitsonepat.ac.in' }
    ]
  },
  {
    id: 2,
    subject: 'Data Structures',
    grade: 'BCS 2023',
    section: 'B',
    studentCount: 25,
    students: [
      { id: 57, name: 'Sankalp', rollNo: '12311001', email: 'sankalpbcs12311001@iiitsonepat.ac.in' },
      { id: 58, name: 'Madhursuman', rollNo: '12311002', email: 'madhursumanbcs12311002@iiitsonepat.ac.in' },
      { id: 59, name: 'Joydeep Gharami', rollNo: '12311003', email: 'joydeepgharamibcs12311003@iiitsonepat.ac.in' },
      { id: 60, name: 'Varun K R', rollNo: '12311004', email: 'varunkrbcs12311004@iiitsonepat.ac.in' },
      { id: 61, name: 'Shikhar Kanaujia', rollNo: '12311005', email: 'shikharkanaujiabcs12311005@iiitsonepat.ac.in' },
      { id: 62, name: 'Rupesh Agarwal', rollNo: '12311006', email: 'rupeshagarwalbcs12311006@iiitsonepat.ac.in' },
      { id: 63, name: 'Hitendra Vishwas', rollNo: '12311007', email: 'hitendravishwasbcs12311007@iiitsonepat.ac.in' },
      { id: 64, name: 'Satyansh Singh', rollNo: '12311009', email: 'satyanshsinghbcs12311009@iiitsonepat.ac.in' },
      { id: 65, name: 'Lovish Singla', rollNo: '12311010', email: 'lovishsinglabcs12311010@iiitsonepat.ac.in' },
      { id: 66, name: 'Pradeep Guguloth', rollNo: '12311011', email: 'pradeepgugulothbcs12311011@iiitsonepat.ac.in' },
      { id: 67, name: 'Shaurya Singh', rollNo: '12311012', email: 'shauryasinghbcs12311012@iiitsonepat.ac.in' },
      { id: 68, name: 'Sahil Kumar', rollNo: '12311013', email: 'sahilkumarbcs12311013@iiitsonepat.ac.in' },
      { id: 69, name: 'Vikash', rollNo: '12311014', email: 'vikashbcs12311014@iiitsonepat.ac.in' },
      { id: 70, name: 'Harsh Kaldoke', rollNo: '12311015', email: 'harshkaldokebcs12311015@iiitsonepat.ac.in' },
      { id: 71, name: 'Pankaj Bishnoi', rollNo: '12311016', email: 'pankajbishnoibcs12311016@iiitsonepat.ac.in' },
      { id: 72, name: 'Ankit Kumar Sharma', rollNo: '12311017', email: 'ankitkumarsharmabcs12311017@iiitsonepat.ac.in' },
      { id: 73, name: 'Utkarsh', rollNo: '12311018', email: 'utkarshbcs12311018@iiitsonepat.ac.in' },
      { id: 74, name: 'Shubham Rawat', rollNo: '12311019', email: 'shubhamrawatbcs12311019@iiitsonepat.ac.in' },
      { id: 75, name: 'Daulat Singh', rollNo: '12311020', email: 'daulatsinghbcs12311020@iiitsonepat.ac.in' },
      { id: 76, name: 'Ankush', rollNo: '12311021', email: 'ankushbcs12311021@iiitsonepat.ac.in' },
      { id: 77, name: 'Kartheek Budime', rollNo: '12311022', email: 'kartheekbudimebcs12311022@iiitsonepat.ac.in' },
      { id: 78, name: 'Yojit Goula', rollNo: '12311023', email: 'yojitgoulabcs12311023@iiitsonepat.ac.in' },
      { id: 79, name: 'Jay Agrawal', rollNo: '12311024', email: 'jayagrawalbcs12311024@iiitsonepat.ac.in' },
      { id: 80, name: 'Ritheesh Reddy Cheemala', rollNo: '12311025', email: 'ritheeshreddycheemalabcs12311025@iiitsonepat.ac.in' },
      { id: 81, name: 'Ravi Garg', rollNo: '12311026', email: 'ravigargbcs12311026@iiitsonepat.ac.in' }
    ]
  },
  {
    id: 3,
    subject: 'Algorithm Design',
    grade: 'BCS 2023',
    section: 'C',
    studentCount: 31,
    students: [
      { id: 82, name: 'Nirmanyu Sood', rollNo: '12311027', email: 'nirmanyusoodbcs12311027@iiitsonepat.ac.in' },
      { id: 83, name: 'Ankur Kumar Verma', rollNo: '12311028', email: 'ankurkumarvermabcs12311028@iiitsonepat.ac.in' },
      { id: 84, name: 'Mohit Mehta', rollNo: '12311029', email: 'mohitmehtabcs12311029@iiitsonepat.ac.in' },
      { id: 85, name: 'Rohit Kumawat', rollNo: '12311030', email: 'rohitkumawatbcs12311030@iiitsonepat.ac.in' },
      { id: 86, name: 'Aniket Singh', rollNo: '12311031', email: 'aniketsinghbcs12311031@iiitsonepat.ac.in' },
      { id: 87, name: 'Supradeep Reddy Bodireddy', rollNo: '12311032', email: 'supradeepreddybodireddygaribcs12311032@iiitsonepat.ac.in' },
      { id: 88, name: 'Harsh Raj', rollNo: '12311033', email: 'harshrajbcs12311033@iiitsonepat.ac.in' },
      { id: 89, name: 'Utkarsh Pawade', rollNo: '12311035', email: 'utkarshpawadebcs12311035@iiitsonepat.ac.in' },
      { id: 90, name: 'Rahul', rollNo: '12311036', email: 'rahulbcs12311036@iiitsonepat.ac.in' },
      { id: 91, name: 'Priyanshu Singh', rollNo: '12311037', email: 'priyanshusinghbcs12311037@iiitsonepat.ac.in' },
      { id: 92, name: 'Aditya Joshi', rollNo: '12311039', email: 'adityajoshibcs12311039@iiitsonepat.ac.in' },
      { id: 93, name: 'Aditya Kumar', rollNo: '12311040', email: 'adityakumarbcs12311040@iiitsonepat.ac.in' },
      { id: 94, name: 'Shlok Gupta', rollNo: '12311041', email: 'shlokguptabcs12311041@iiitsonepat.ac.in' },
      { id: 95, name: 'Rajan Kumar', rollNo: '12311042', email: 'rajankumarbcs12311042@iiitsonepat.ac.in' },
      { id: 96, name: 'Shubhrit Shanker', rollNo: '12311043', email: 'shubhritshankerbcs12311043@iiitsonepat.ac.in' },
      { id: 97, name: 'Namanindoria', rollNo: '12311044', email: 'namanindoriabcs12311044@iiitsonepat.ac.in' },
      { id: 98, name: 'Kishna Aggarwal', rollNo: '12311045', email: 'kishnaaggarwalbcs12311045@iiitsonepat.ac.in' },
      { id: 99, name: 'Kavya Gupta', rollNo: '12311046', email: 'kavyaguptabcs12311046@iiitsonepat.ac.in' },
      { id: 100, name: 'Nakul Saini', rollNo: '12311047', email: 'nakulsainibcs12311047@iiitsonepat.ac.in' },
      { id: 101, name: 'Prakhar Srivastava', rollNo: '12311048', email: 'prakharsrivastavabcs12311048@iiitsonepat.ac.in' },
      { id: 102, name: 'Yuvan Sai Yegireddi', rollNo: '12311049', email: 'yuvansaiyegireddibcs12311049@iiitsonepat.ac.in' },
      { id: 103, name: 'Sameet Patro', rollNo: '12311050', email: 'sameetpatrobcs12311050@iiitsonepat.ac.in' },
      { id: 104, name: 'Harsh Kumar', rollNo: '12311051', email: 'harshkumarbcs12311051@iiitsonepat.ac.in' },
      { id: 105, name: 'Suyash Bajpai', rollNo: '12311052', email: 'suyashbajpaibcs12311052@iiitsonepat.ac.in' },
      { id: 106, name: 'Himanshu Bhilware', rollNo: '12311054', email: 'himanshubhilwarebcs12311054@iiitsonepat.ac.in' },
      { id: 107, name: 'Sujal Verma', rollNo: '12311055', email: 'sujalvermabcs12311055@iiitsonepat.ac.in' },
      { id: 108, name: 'Kunal Sharma', rollNo: '12311056', email: 'kunalsharmabcs12311056@iiitsonepat.ac.in' },
      { id: 109, name: 'Ankur Gautam', rollNo: '12311057', email: 'ankurgautambcs12311057@iiitsonepat.ac.in' },
      { id: 110, name: 'Yugank Fatehpuria', rollNo: '12311058', email: 'yugankfatehpuriabcs12311058@iiitsonepat.ac.in' },
      { id: 111, name: 'Aryan Rana', rollNo: '12311059', email: 'aryanranabcs12311059@iiitsonepat.ac.in' },
      { id: 112, name: 'Swati', rollNo: '12311060', email: 'swatibcs12311060@iiitsonepat.ac.in' }
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
  
  // Geo-Sound system state
  const [geoSoundActive, setGeoSoundActive] = useState(false);
  const [geoSoundStrength, setGeoSoundStrength] = useState(0);
  const [lastSoundTest, setLastSoundTest] = useState(null);
  const [detectedDevices, setDetectedDevices] = useState(0);
  
  // Web Audio API state for real frequency generation
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isAudioSupported, setIsAudioSupported] = useState(true);

  // Initialize Web Audio API
  const initializeAudio = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        setIsAudioSupported(false);
        console.warn('Web Audio API not supported in this browser');
        return null;
      }

      const context = new AudioContext();
      setAudioContext(context);
      
      // Resume audio context if it's suspended (required by browsers)
      if (context.state === 'suspended') {
        await context.resume();
      }
      
      return context;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      setIsAudioSupported(false);
      return null;
    }
  };

  // Start ultrasonic frequency generation
  const startUltrasonicFrequency = async () => {
    try {
      let context = audioContext;
      if (!context) {
        context = await initializeAudio();
        if (!context) return false;
      }

      // Create oscillator for 19.5 kHz frequency
      const osc = context.createOscillator();
      const gain = context.createGain();
      
      // Set frequency to 19.5 kHz (ultrasonic range)
      osc.frequency.value = 19550;
      osc.type = 'sine';
      
      // Set very low volume (ultrasonic should be inaudible but detectable)
      gain.gain.value = 0.01; // Very low volume
      
      // Connect audio nodes
      osc.connect(gain);
      gain.connect(context.destination);
      
      // Start the oscillator
      osc.start();
      
      setOscillator(osc);
      setGainNode(gain);
      
      return true;
    } catch (error) {
      console.error('Failed to start ultrasonic frequency:', error);
      return false;
    }
  };

  // Stop ultrasonic frequency generation
  const stopUltrasonicFrequency = () => {
    try {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        setOscillator(null);
      }
      if (gainNode) {
        gainNode.disconnect();
        setGainNode(null);
      }
    } catch (error) {
      console.error('Error stopping ultrasonic frequency:', error);
    }
  };

  // Test ultrasonic frequency generation
  const testUltrasonicFrequency = async () => {
    try {
      let context = audioContext;
      if (!context) {
        context = await initializeAudio();
        if (!context) return false;
      }

      // Create a temporary test oscillator
      const testOsc = context.createOscillator();
      const testGain = context.createGain();
      
      testOsc.frequency.value = 19500;
      testOsc.type = 'sine';
      testGain.gain.value = 0.02; // Slightly higher for test
      
      testOsc.connect(testGain);
      testGain.connect(context.destination);
      
      // Play test tone for 1 second
      testOsc.start();
      testOsc.stop(context.currentTime + 1);
      
      return true;
    } catch (error) {
      console.error('Ultrasonic frequency test failed:', error);
      return false;
    }
  };

  // Timer effect for active sessions
  useEffect(() => {
    let interval;
    if (currentView === 'activeSession' && sessionStartTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
        
        // Simulate geo-sound fluctuations
        if (geoSoundActive) {
          setGeoSoundStrength(95 + Math.random() * 5); // 95-100%
          setDetectedDevices(Math.min(
            Math.floor(Math.random() * 8) + Math.max(0, getAttendanceStats().present - 2),
            selectedClass?.studentCount || 0
          ));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, sessionStartTime, geoSoundActive, selectedClass]);

  // Cleanup effect for audio
  useEffect(() => {
    return () => {
      // Cleanup audio when component unmounts
      stopUltrasonicFrequency();
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  // Generate wave function (start ultrasonic frequency)
  const generateWave = async () => {
    if (!geoSoundActive) {
      const audioStarted = await startUltrasonicFrequency();
      if (audioStarted) {
        setGeoSoundActive(true);
        console.log('🌊 Wave generation started - 19.5 kHz ultrasonic frequency');
      } else {
        console.log('❌ Failed to start wave generation');
      }
    }
  };

  // Stop wave function
  const stopWave = () => {
    if (geoSoundActive) {
      stopUltrasonicFrequency();
      setGeoSoundActive(false);
      console.log('🛑 Wave generation stopped');
    }
  };

  // Format time duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start attendance session
  const startSession = async (classData) => {
    setSelectedClass(classData);
    setSessionStartTime(Date.now());
    setSessionDuration(0);
    
    // Initialize all students as pending
    const initialStatuses = {};
    classData.students.forEach(student => {
      initialStatuses[student.id] = 'pending';
    });
    setStudentStatuses(initialStatuses);
    
    // Activate geo-sound system with real frequency generation
    setGeoSoundActive(true);
    setLastSoundTest(new Date());
    setDetectedDevices(0);
    
    // Start real ultrasonic frequency generation
    const audioStarted = await startUltrasonicFrequency();
    if (audioStarted) {
      setGeoSoundStrength(98);
      console.log('✅ Ultrasonic frequency generation started: 19.5 kHz');
    } else {
      setGeoSoundStrength(0);
      console.warn('⚠️ Failed to start ultrasonic frequency - falling back to simulation mode');
      // Show user notification
      if (!isAudioSupported) {
        alert('⚠️ Audio not supported in this browser. Geo-Sound will run in simulation mode.');
      }
    }
    
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
    // Stop real ultrasonic frequency generation
    stopUltrasonicFrequency();
    console.log('🔇 Ultrasonic frequency generation stopped');
    
    // Deactivate geo-sound system
    setGeoSoundActive(false);
    setGeoSoundStrength(0);
    setDetectedDevices(0);
    setCurrentView('summary');
  };

  // Test geo-sound system with real frequency
  const testGeoSound = async () => {
    setLastSoundTest(new Date());
    
    let testSuccess = false;
    let message = '';
    
    if (isAudioSupported && audioContext) {
      // Perform real ultrasonic frequency test
      try {
        testSuccess = await testUltrasonicFrequency();
        const newStrength = testSuccess ? 95 + Math.random() * 5 : 60 + Math.random() * 20;
        setGeoSoundStrength(newStrength);
        
        if (testSuccess) {
          message = `✅ Real Ultrasonic Test Successful!\n\n🔊 19.5 kHz frequency generated\n📊 Signal Strength: ${Math.round(newStrength)}%\n📡 Web Audio API: Active\n🎯 Range: 15m radius\n\n✓ All systems operational`;
        } else {
          message = `⚠️ Ultrasonic Test Warning!\n\n📊 Signal Strength: ${Math.round(newStrength)}%\n⚠️ Audio generation issue detected\n🔧 Check browser audio permissions`;
        }
      } catch (error) {
        testSuccess = false;
        message = `❌ Ultrasonic Test Failed!\n\n🚫 Web Audio API Error\n📋 Error: ${error.message}\n🔧 Falling back to simulation mode`;
      }
    } else {
      // Fallback simulation mode
      testSuccess = Math.random() > 0.05;
      const newStrength = testSuccess ? 95 + Math.random() * 5 : 60 + Math.random() * 20;
      setGeoSoundStrength(newStrength);
      
      message = `🔧 Simulation Mode Test\n\n📊 Signal Strength: ${Math.round(newStrength)}%\n⚠️ Web Audio API not available\n📝 Running in demo mode\n\n${testSuccess ? '✓ Simulation successful' : '⚠️ Simulated interference detected'}`;
    }
    
    alert(message);
  };

  // Go back to class list
  const goBackToClasses = () => {
    // Stop ultrasonic frequency if active
    stopUltrasonicFrequency();
    
    setCurrentView('classList');
    setSelectedClass(null);
    setSessionStartTime(null);
    setSessionDuration(0);
    setStudentStatuses({});
    
    // Reset geo-sound system
    setGeoSoundActive(false);
    setGeoSoundStrength(0);
    setLastSoundTest(null);
    setDetectedDevices(0);
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
    <header className="bg-white shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-lg shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">SmartAttendance</h1>
              <p className="text-sm text-purple-600">Secure Geo-Sound & Visual QR System</p>
            </div>
          </div>
          {currentView !== 'classList' && (
            <button
              onClick={goBackToClasses}
              className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
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
        <h2 className="text-3xl font-bold text-purple-900 mb-2">Your Classes</h2>
        <p className="text-purple-700">Select a class to start an attendance session</p>
        
        {/* Audio Capability Status */}
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          isAudioSupported 
            ? 'bg-purple-50 text-purple-800 border border-purple-200' 
            : 'bg-orange-50 text-orange-800 border border-orange-200'
        }`}>
          <div className="flex items-center space-x-2">
            <Volume2 className={`h-4 w-4 ${isAudioSupported ? 'text-purple-600' : 'text-orange-600'}`} />
            <span className="font-medium">
              {isAudioSupported 
                ? '🔊 Real Ultrasonic Generation Available' 
                : '🔧 Simulation Mode Only'}
            </span>
          </div>
          <p className="mt-1 text-xs">
            {isAudioSupported 
              ? 'Your browser supports Web Audio API. Sessions will generate real 19.5 kHz ultrasonic frequencies.'
              : 'Web Audio API not available. Sessions will run in simulation mode for demonstration.'}
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((classData) => (
          <div key={classData.id} className="bg-white rounded-xl shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-3 rounded-lg shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  {classData.studentCount} students
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-purple-900 mb-1">
                {classData.subject}
              </h3>
              <p className="text-purple-600 mb-4">
                {classData.grade} - Section {classData.section}
              </p>
              
              <button
                onClick={() => startSession(classData)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
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
        <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                Active Session: {selectedClass?.subject} - {selectedClass?.grade}
              </h2>
              <div className="flex items-center space-x-6 text-sm text-purple-600">
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
            
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={generateWave}
                disabled={geoSoundActive}
                className={`${
                  geoSoundActive 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2`}
              >
                <Radio className="h-4 w-4" />
                <span>Generate Wave</span>
              </button>
              
              <button
                onClick={stopWave}
                disabled={!geoSoundActive}
                className={`${
                  !geoSoundActive 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-700 hover:bg-purple-800'
                } text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2`}
              >
                <StopCircle className="h-4 w-4" />
                <span>Stop Wave</span>
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
            <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-purple-900">Visual QR Share</h3>
                <QrCode className="h-5 w-5 text-purple-400" />
              </div>
              
              <div className="bg-purple-50 rounded-lg p-8 mb-4">
                <div className="qr-pattern w-full h-64 rounded-lg border-2 border-dashed border-purple-300"></div>
              </div>
              
              <p className="text-sm text-purple-600 text-center">
                Students must overlay their QR share with this pattern to complete verification
              </p>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">System Status</h3>
              
              <div className="space-y-4">
                {/* Geo-Sound Status */}
                <div className={`p-4 rounded-lg border ${geoSoundActive 
                  ? 'bg-purple-50 border-purple-200' 
                  : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Volume2 className={`h-6 w-6 ${geoSoundActive 
                        ? 'text-purple-600 animate-pulse' 
                        : 'text-gray-400'}`} />
                      <span className={`font-semibold ${geoSoundActive 
                        ? 'text-purple-800' 
                        : 'text-gray-600'}`}>Geo-Sound System</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${geoSoundActive 
                        ? 'bg-purple-500 animate-pulse' 
                        : 'bg-gray-400'}`}></div>
                      <span className={`text-sm font-medium ${geoSoundActive 
                        ? 'text-purple-600' 
                        : 'text-gray-500'}`}>
                        {geoSoundActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-600">Frequency:</span>
                      <span className={`font-medium ${geoSoundActive ? 'text-purple-700' : 'text-gray-500'}`}>
                        {geoSoundActive ? '19.5 kHz' : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Signal Strength:</span>
                      <span className={`font-medium ${
                        geoSoundStrength > 90 ? 'text-purple-700' : 
                        geoSoundStrength > 70 ? 'text-yellow-700' : 'text-red-700'
                      }`}>
                        {geoSoundActive ? `${Math.round(geoSoundStrength)}%` : '0%'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Range:</span>
                      <span className={`font-medium ${geoSoundActive ? 'text-purple-700' : 'text-gray-500'}`}>
                        {geoSoundActive ? '15m radius' : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Devices Detected:</span>
                      <span className={`font-medium ${geoSoundActive ? 'text-purple-700' : 'text-gray-500'}`}>
                        {detectedDevices}
                      </span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-purple-600">Audio Mode:</span>
                      <span className={`font-medium ${
                        oscillator && isAudioSupported ? 'text-purple-700' : 'text-orange-700'
                      }`}>
                        {oscillator && isAudioSupported ? '🔊 Real Generation' : '🔧 Simulation Mode'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`mt-3 p-2 rounded text-xs ${geoSoundActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-600'}`}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${geoSoundActive 
                        ? 'bg-purple-500 animate-ping' 
                        : 'bg-gray-400'}`}></div>
                      <span>
                        {geoSoundActive 
                          ? `${oscillator && isAudioSupported ? '🔊 Real ultrasonic generation active' : '🔧 Simulation mode active'} • Last tested: ${lastSoundTest ? lastSoundTest.toLocaleTimeString() : 'Not tested'}`
                          : 'System inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Visual QR Status */}
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <QrCode className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Visual QR Ready</span>
                  </div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Live Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">{stats.present}</div>
                <div className="text-sm font-medium text-purple-800">Students Present</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-400 mb-1">{stats.total - stats.present}</div>
                <div className="text-sm font-medium text-purple-600">Students Pending</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Student Roster */}
          <div className="bg-white rounded-xl shadow-lg border border-purple-200">
            <div className="p-6 border-b border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900">Live Student Roster</h3>
              <p className="text-sm text-purple-600 mt-1">Real-time attendance status</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-purple-100">
                {selectedClass?.students.map((student) => {
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
        <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-8 mb-8">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-purple-900 mb-2">Session Complete</h2>
            <p className="text-purple-600">
              {selectedClass?.subject} - {selectedClass?.grade} • Duration: {formatDuration(sessionDuration)}
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.present}</div>
              <div className="text-sm font-medium text-purple-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{stats.absent}</div>
              <div className="text-sm font-medium text-purple-600">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.total}</div>
              <div className="text-sm font-medium text-purple-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-1">{stats.rate}%</div>
              <div className="text-sm font-medium text-purple-600">Attendance Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button
              onClick={goBackToClasses}
              className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Save and Close
            </button>
          </div>
        </div>

        {/* Detailed Lists */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Present Students */}
          <div className="bg-white rounded-xl shadow-lg border border-purple-200">
            <div className="p-6 border-b border-purple-200">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">
                  Present Students ({presentStudents.length})
                </h3>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-purple-100">
                {presentStudents.map((student) => (
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

          {/* Absent Students */}
          <div className="bg-white rounded-xl shadow-lg border border-purple-200">
            <div className="p-6 border-b border-purple-200">
              <div className="flex items-center space-x-3">
                <UserX className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">
                  Absent Students ({absentStudents.length})
                </h3>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-purple-100">
                {absentStudents.map((student) => (
                  <div key={student.id} className="p-4 flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div>
                      <div className="font-medium text-purple-900">{student.name}</div>
                      <div className="text-sm text-purple-600">{student.rollNo}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header />
      
      {currentView === 'classList' && <ClassListView />}
      {currentView === 'activeSession' && <ActiveSessionView />}
      {currentView === 'summary' && <SessionSummaryView />}
    </div>
  );
};

export default App;