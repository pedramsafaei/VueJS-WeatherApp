/**
 * Geolocation Service
 * Handles browser geolocation API interactions
 */

/**
 * Get user's current position
 * @returns {Promise<Object>} - Position object with lat and lon
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        let message = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied. Please enable location access in your browser.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        reject(new Error(message));
      },
      options
    );
  });
};

/**
 * Check if geolocation is supported
 * @returns {boolean} - True if supported
 */
export const isGeolocationSupported = () => {
  return 'geolocation' in navigator;
};

export default {
  getCurrentPosition,
  isGeolocationSupported,
};
