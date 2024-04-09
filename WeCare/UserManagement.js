import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserManagement = () => {
    const navigation = useNavigation();

    const handleDeleteProfiles = () => {
        navigation.navigate('Delete User Profiles');
    };

    const handleRetrieveProfiles = () => {
        navigation.navigate('Retrieve Deleted Profiles');
    };

    const handleViewTechnicalIssues = () => {
        navigation.navigate('View Technical Issues');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select management option</Text>
            <TouchableOpacity style={styles.button} onPress={handleDeleteProfiles}>
                <Text style={styles.buttonText}>Delete User Profiles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRetrieveProfiles}>
                <Text style={styles.buttonText}>Retrieve Deleted Profiles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleViewTechnicalIssues}>
                <Text style={styles.buttonText}>View Technical Issues</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        marginVertical: 10,
        minWidth: 300,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserManagement;
