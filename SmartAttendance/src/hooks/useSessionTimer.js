import { useEffect } from 'react';

/**
 * Custom hook for managing session timer
 * Updates session duration every second when session is active
 */
export const useSessionTimer = (
  currentView, 
  sessionStartTime, 
  updateSessionDuration, 
  geoSoundActive, 
  updateGeoSoundMetrics
) => {
  useEffect(() => {
    let interval;
    
    if (currentView === 'activeSession' && sessionStartTime) {
      interval = setInterval(() => {
        const newDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
        updateSessionDuration(newDuration);
        
        // Update geo-sound metrics if active
        if (geoSoundActive && updateGeoSoundMetrics) {
          updateGeoSoundMetrics();
        }
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentView, sessionStartTime, geoSoundActive, updateSessionDuration, updateGeoSoundMetrics]);
};
