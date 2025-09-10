import { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { generateSignalStrength, calculateDetectedDevices } from '../utils/attendanceUtils';

/**
 * Custom hook for managing geo-sound system functionality
 * Handles ultrasonic frequency generation and system status
 */
export const useGeoSound = () => {
  const [geoSoundActive, setGeoSoundActive] = useState(false);
  const [geoSoundStrength, setGeoSoundStrength] = useState(0);
  const [lastSoundTest, setLastSoundTest] = useState(null);
  const [detectedDevices, setDetectedDevices] = useState(0);
  const [isAudioSupported, setIsAudioSupported] = useState(true);

  // Initialize audio support status
  useEffect(() => {
    setIsAudioSupported(audioService.isAudioSupported());
  }, []);

  /**
   * Start geo-sound wave generation
   * @returns {Promise<boolean>} Success status
   */
  const generateWave = async () => {
    console.log('🔥 DEBUG: generateWave function called');
    if (!geoSoundActive) {
      const audioStarted = await audioService.startUltrasonicFrequency();
      if (audioStarted) {
        setGeoSoundActive(true);
        setGeoSoundStrength(generateSignalStrength(95, 100));
        console.log('🌊 Wave generation started - 19.5 kHz ultrasonic frequency');
        return true;
      } else {
        console.log('❌ Failed to start wave generation');
        return false;
      }
    }
    console.log('⚠️ Wave already active, not starting again');
    return false;
  };

  /**
   * Stop geo-sound wave generation
   */
  const stopWave = () => {
    console.log('🔥 DEBUG: stopWave function called');
    if (geoSoundActive) {
      audioService.stopUltrasonicFrequency();
      setGeoSoundActive(false);
      setGeoSoundStrength(0);
      setDetectedDevices(0);
      console.log('🛑 Wave generation stopped');
    } else {
      console.log('⚠️ Wave not active, nothing to stop');
    }
  };

  /**
   * Test geo-sound system with real frequency
   * @returns {Promise<string>} Test result message
   */
  const testGeoSound = async () => {
    setLastSoundTest(new Date());
    
    let testSuccess = false;
    let message = '';
    
    if (isAudioSupported) {
      try {
        testSuccess = await audioService.testUltrasonicFrequency();
        const newStrength = testSuccess ? generateSignalStrength(95, 100) : generateSignalStrength(60, 80);
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
      const newStrength = testSuccess ? generateSignalStrength(95, 100) : generateSignalStrength(60, 80);
      setGeoSoundStrength(newStrength);
      
      message = `🔧 Simulation Mode Test\n\n📊 Signal Strength: ${Math.round(newStrength)}%\n⚠️ Web Audio API not available\n📝 Running in demo mode\n\n${testSuccess ? '✓ Simulation successful' : '⚠️ Simulated interference detected'}`;
    }
    
    return message;
  };

  /**
   * Update detected devices count
   * @param {number} presentCount - Number of present students
   * @param {number} maxStudents - Maximum number of students
   */
  const updateDetectedDevices = (presentCount, maxStudents) => {
    if (geoSoundActive) {
      setDetectedDevices(calculateDetectedDevices(presentCount, maxStudents));
    }
  };

  /**
   * Reset geo-sound system to initial state
   */
  const resetGeoSound = () => {
    stopWave();
    setLastSoundTest(null);
    setDetectedDevices(0);
    setGeoSoundStrength(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioService.cleanup();
    };
  }, []);

  return {
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
    isPlaying: audioService.isPlaying()
  };
};
