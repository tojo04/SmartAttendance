/**
 * Audio Service for managing ultrasonic frequency generation
 * Handles Web Audio API for real ultrasonic sound generation
 */
class AudioService {
  constructor() {
    this.audioContext = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isSupported = true;
    this.frequency = 19550; // 19.5 kHz ultrasonic frequency
  }

  /**
   * Initialize Web Audio API context
   * @returns {Promise<AudioContext|null>} Audio context or null if failed
   */
  async initialize() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        this.isSupported = false;
        console.warn('Web Audio API not supported in this browser');
        return null;
      }

      this.audioContext = new AudioContext();
      
      // Resume audio context if it's suspended (required by browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      return this.audioContext;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      this.isSupported = false;
      return null;
    }
  }

  /**
   * Start ultrasonic frequency generation
   * @returns {Promise<boolean>} Success status
   */
  async startUltrasonicFrequency() {
    try {
      if (!this.audioContext) {
        await this.initialize();
        if (!this.audioContext) return false;
      }

      // Create oscillator for ultrasonic frequency
      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();
      
      // Set frequency to 19.5 kHz (ultrasonic range)
      this.oscillator.frequency.value = this.frequency;
      this.oscillator.type = 'sine';
      
      // Set very low volume (ultrasonic should be inaudible but detectable)
      this.gainNode.gain.value = 0.01; // Very low volume
      
      // Connect audio nodes
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      // Start the oscillator
      this.oscillator.start();
      
      return true;
    } catch (error) {
      console.error('Failed to start ultrasonic frequency:', error);
      return false;
    }
  }

  /**
   * Stop ultrasonic frequency generation
   */
  stopUltrasonicFrequency() {
    try {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      if (this.gainNode) {
        this.gainNode.disconnect();
        this.gainNode = null;
      }
    } catch (error) {
      console.error('Error stopping ultrasonic frequency:', error);
    }
  }

  /**
   * Test ultrasonic frequency generation with temporary oscillator
   * @param {number} duration - Test duration in seconds (default: 1)
   * @returns {Promise<boolean>} Success status
   */
  async testUltrasonicFrequency(duration = 1) {
    try {
      if (!this.audioContext) {
        await this.initialize();
        if (!this.audioContext) return false;
      }

      // Create a temporary test oscillator
      const testOsc = this.audioContext.createOscillator();
      const testGain = this.audioContext.createGain();
      
      testOsc.frequency.value = 19500;
      testOsc.type = 'sine';
      testGain.gain.value = 0.02; // Slightly higher for test
      
      testOsc.connect(testGain);
      testGain.connect(this.audioContext.destination);
      
      // Play test tone for specified duration
      testOsc.start();
      testOsc.stop(this.audioContext.currentTime + duration);
      
      return true;
    } catch (error) {
      console.error('Ultrasonic frequency test failed:', error);
      return false;
    }
  }

  /**
   * Check if audio is currently playing
   * @returns {boolean} True if oscillator is active
   */
  isPlaying() {
    return this.oscillator !== null;
  }

  /**
   * Get audio support status
   * @returns {boolean} True if Web Audio API is supported
   */
  isAudioSupported() {
    return this.isSupported;
  }

  /**
   * Get current frequency
   * @returns {number} Current frequency in Hz
   */
  getFrequency() {
    return this.frequency;
  }

  /**
   * Set frequency (for future use)
   * @param {number} freq - New frequency in Hz
   */
  setFrequency(freq) {
    this.frequency = freq;
    if (this.oscillator) {
      this.oscillator.frequency.value = freq;
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.stopUltrasonicFrequency();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    this.audioContext = null;
  }
}

// Create and export a singleton instance
export const audioService = new AudioService();
export default audioService;
