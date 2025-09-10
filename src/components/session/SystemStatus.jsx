import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Volume2, QrCode, ToggleLeft, ToggleRight } from 'lucide-react';

/**
 * Visual QR Share display component
 */
const VisualQRShare = () => {
  const [showStaticQR, setShowStaticQR] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  const toggleQRMode = () => {
    setShowStaticQR(!showStaticQR);
    
    // Generate QR code when switching to static mode
    if (!showStaticQR) {
      generateQRCode();
    }
  };

  const generateQRCode = async () => {
    try {
      // Create attendance verification data
      const attendanceData = {
        sessionId: `session_${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'mark_attendance',
        verification: 'qr_scan',
        classId: 'current_class',
        teacherId: 'teacher_001'
      };
      
      // Generate QR code with attendance data
      const qrDataURL = await QRCode.toDataURL(JSON.stringify(attendanceData), {
        width: 256,
        margin: 2,
        color: {
          dark: '#7c3aed', // Purple color
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      
      setQrCodeDataURL(qrDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <QrCode className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-purple-900">
            {showStaticQR ? 'Static QR Code' : 'Visual QR Share'}
          </h3>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleQRMode}
          className="flex items-center space-x-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
        >
          {showStaticQR ? (
            <ToggleRight className="h-4 w-4 text-purple-600" />
          ) : (
            <ToggleLeft className="h-4 w-4 text-purple-600" />
          )}
          <span className="text-sm font-medium text-purple-700">
            {showStaticQR ? 'Static' : 'Visual'}
          </span>
        </button>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-8 mb-4">
        {showStaticQR ? (
          // Static QR Code
          <div className="w-full h-64 rounded-lg bg-white flex items-center justify-center border-2 border-purple-200">
            {qrCodeDataURL ? (
              <div className="text-center">
                <img 
                  src={qrCodeDataURL} 
                  alt="Attendance QR Code" 
                  className="w-48 h-48 mx-auto rounded-lg shadow-lg border-2 border-purple-300"
                />
                <p className="mt-2 text-xs text-purple-600 font-medium">
                  Session QR Code
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-48 h-48 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-purple-300">
                  <div className="text-purple-600">
                    <QrCode className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Generating QR Code...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Animated Visual QR Pattern
          <div className="qr-pattern w-full h-64 rounded-lg border-2 border-dashed border-purple-300"></div>
        )}
      </div>
      
      <p className="text-sm text-purple-600 text-center">
        {showStaticQR 
          ? 'Students can scan this QR code with their mobile phones for attendance verification'
          : 'Students must overlay their QR share with this pattern to complete verification'
        }
      </p>
      
      {/* Mode Description */}
      <div className={`mt-4 p-3 rounded-lg text-xs ${
        showStaticQR 
          ? 'bg-blue-50 text-blue-800 border border-blue-200' 
          : 'bg-purple-50 text-purple-800 border border-purple-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            showStaticQR ? 'bg-blue-500' : 'bg-purple-500'
          }`}></div>
          <span className="font-medium">
            {showStaticQR 
              ? '📱 Standard QR Mode: Direct scanning enabled'
              : '🔒 Visual Cryptography Mode: Requires overlay verification'
            }
          </span>
        </div>
        <p className="mt-1">
          {showStaticQR 
            ? 'Students can scan this QR code with any standard QR reader app or camera app to mark their attendance.'
            : 'Enhanced security through visual cryptography - students need both shares to complete verification.'
          }
        </p>
      </div>
      
      {/* QR Code Data Display (for development/testing) */}
      {showStaticQR && qrCodeDataURL && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <details className="text-xs">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              QR Code Data (Click to expand)
            </summary>
            <div className="mt-2 p-2 bg-white rounded border font-mono text-xs text-gray-600 break-all">
              {qrCodeDataURL && JSON.stringify(JSON.parse(atob(qrCodeDataURL.split(',')[1]).split('').map(c => String.fromCharCode(c.charCodeAt(0))).join('').match(/"text":"([^"]+)"/)?.[1] || '{}'), null, 2)}
            </div>
          </details>
        </div>
      )}
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
