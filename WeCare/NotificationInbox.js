import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
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

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Inbox
      </Text>
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
    </View>
  );
};

export default InboxScreen;