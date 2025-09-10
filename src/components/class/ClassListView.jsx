import React from 'react';
import { Users, Play, Volume2 } from 'lucide-react';

/**
 * Individual class card component
 */
const ClassCard = ({ classData, onStartSession }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
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
          onClick={() => onStartSession(classData)}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Play className="h-4 w-4" />
          <span>Start Attendance Session</span>
        </button>
      </div>
    </div>
  );
};

/**
 * Class list view component
 */
const ClassListView = ({ classes, onStartSession, isAudioSupported }) => {
  return (
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
        {classes.map((classData) => (
          <ClassCard
            key={classData.id}
            classData={classData}
            onStartSession={onStartSession}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassListView;
