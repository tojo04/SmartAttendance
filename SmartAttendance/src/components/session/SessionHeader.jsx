import React from 'react';
import { Clock, Users, Play, Square, Radio, StopCircle } from 'lucide-react';
import { formatDuration } from '../../utils/attendanceUtils';

/**
 * Session header component with controls and info
 */
const SessionHeader = ({ 
  selectedClass, 
  sessionDuration, 
  geoSoundActive, 
  onGenerateWave, 
  onStopWave, 
  onStopSession 
}) => {
  return (
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
            onClick={() => {
              console.log('🔥 DEBUG: Generate Wave button clicked');
              onGenerateWave();
            }}
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
            onClick={() => {
              console.log('🔥 DEBUG: Stop Wave button clicked');
              onStopWave();
            }}
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
            onClick={onStopSession}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Square className="h-4 w-4" />
            <span>Stop Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionHeader;
