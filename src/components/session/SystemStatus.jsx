import React from 'react';
import { Volume2, QrCode } from 'lucide-react';

/**
 * Visual QR Share display component
 */
const VisualQRShare = () => {
  return (
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
  );
};

/**
 * Geo-Sound system status component
 */
const GeoSoundStatus = ({ 
  geoSoundActive, 
  geoSoundStrength, 
  detectedDevices, 
  lastSoundTest, 
  isAudioSupported,
  isPlaying 
}) => {
  return (
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
            isPlaying && isAudioSupported ? 'text-purple-700' : 'text-orange-700'
          }`}>
            {isPlaying && isAudioSupported ? '🔊 Real Generation' : '🔧 Simulation Mode'}
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
              ? `${isPlaying && isAudioSupported ? '🔊 Real ultrasonic generation active' : '🔧 Simulation mode active'} • Last tested: ${lastSoundTest ? lastSoundTest.toLocaleTimeString() : 'Not tested'}`
              : 'System inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * System status panel component
 */
const SystemStatus = ({ geoSoundProps, onTestGeoSound }) => {
  const handleTestClick = async () => {
    const message = await onTestGeoSound();
    alert(message);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">System Status</h3>
      
      <div className="space-y-4">
        {/* Geo-Sound Status */}
        <GeoSoundStatus {...geoSoundProps} />
        
        {/* Visual QR Status */}
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <QrCode className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Visual QR Ready</span>
          </div>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>

        {/* Test Button */}
        <button
          onClick={handleTestClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Test Geo-Sound System
        </button>
      </div>
    </div>
  );
};

export { VisualQRShare, GeoSoundStatus, SystemStatus };
export default SystemStatus;
