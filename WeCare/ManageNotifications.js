import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

const ManageNotifications = () => {
    const [emailNotification, setEmailNotification] = useState(true);
    const [pushNotification, setPushNotification] = useState(true);
    const [smsNotification, setSmsNotification] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleEmailToggle = () => {
        setEmailNotification(previousState => !previousState);
    };

    const handlePushToggle = () => {
        setPushNotification(previousState => !previousState);
    };

    const handleSmsToggle = () => {
        setSmsNotification(previousState => !previousState);
    };

    const handleUserSelection = (userId) => {
        const index = selectedUsers.indexOf(userId);
        if (index === -1) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleSendNotification = () => {
        // Code to send notifications to selected users goes here
        console.log("Notification sent to selected users:", selectedUsers);
        console.log("Notification message:", notificationMessage);
        // Reset state after sending notification
        setSelectedUsers([]);
        setNotificationMessage('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Users</Text>
            <View style={styles.userList}>
                {[1, 2, 3, 4, 5].map(userId => (
                    <TouchableOpacity
                        key={userId}
                        style={[styles.userItem, selectedUsers.includes(userId) && styles.selectedUser]}
                        onPress={() => handleUserSelection(userId)}
                    >
                        <Text>User {userId}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.title}>Notification Message</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="Enter notification message"
                value={notificationMessage}
                onChangeText={setNotificationMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
                <Text style={styles.sendButtonText}>Send Notification</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    notificationOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    optionText: {
        fontSize: 18,
    },

    userList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },

    userItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },

    selectedUser: {
        backgroundColor: '#007AFF',
    },

    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },

    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 22,
        alignItems: 'center',
    },

    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ManageNotifications;
