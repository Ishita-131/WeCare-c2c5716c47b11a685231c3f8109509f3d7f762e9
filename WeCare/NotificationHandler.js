// NotificationHandler.js
import { Notifications } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const scheduleNotifications = async (notifications) => {
  try {
    for (const notification of notifications) {
      // Generate a unique timestamp for each notification
      const timestamp = Date.now();
      
      // Schedule notification
      await Notifications.scheduleNotificationAsync({
        ...notification,
        timestamp: timestamp
      });
      
      // Update notification timestamp
      notification.timestamp = timestamp;
    }
    
    // Store notifications in AsyncStorage
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

export default scheduleNotifications;
