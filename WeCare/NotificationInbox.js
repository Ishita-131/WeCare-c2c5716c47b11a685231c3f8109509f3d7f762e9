import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InboxScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications !== null) {
          const parsedNotifications = JSON.parse(storedNotifications);
          // Sort notifications by timestamp in descending order
          parsedNotifications.sort((a, b) => b.timestamp - a.timestamp);
          setNotifications(parsedNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const deleteNotification = async (index) => {
    try {
      const updatedNotifications = [...notifications];
      updatedNotifications.splice(index, 1);
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteNotification(index) }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', onPress: clearAllNotifications }
      ]
    );
  };

  const clearAllNotifications = async () => {
    try {
      await AsyncStorage.removeItem('notifications');
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.content.title}</Text>
              <Text>{item.content.body}</Text>
              <Text style={{ color: '#888', marginTop: 5 }}>
                Sent on: {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No notifications</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Clear All" onPress={handleClearAll} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
    paddingTop:10,
  },
  buttonContainer:{
    height:150,
  },
});

export default InboxScreen;
