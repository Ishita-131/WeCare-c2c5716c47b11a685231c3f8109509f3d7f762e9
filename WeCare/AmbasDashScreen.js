import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const AdminDashScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome Back</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                    <Image
                        source={require('./assets/images/Profile Button.png')} // Make sure the path is correct
                        style={styles.profileIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.PatientInfoContainer} >
                <View style={styles.textContainer}>
                <Text style={[styles.PatientInfoTitle, {marginLeft:10,}]}>
                    Patient Information
                </Text>
                <Text style={[{marginLeft:10,}]}>
                    Click below to view your patients information
                </Text>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('View Scheduled Appointments')}>
                    <Text style={styles.buttonText}>Click here</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('View Scheduled Appointments')}>
                    <Text style={styles.buttonText}>View Appointments</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        width: '85%',
        marginLeft: 30,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom:-10,
    },

    profileIcon: {
        width: 45,
        height: 45,
    },

    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    PatientInfoContainer:{   
    flexDirection: 'row', // Set the direction of children to horizontal
    justifyContent: 'space-between', // Distribute space between the children
    alignItems: 'center', // Center children vertically
    marginHorizontal: 20, // Adjust horizontal margin to make the container smaller
    marginTop: 20, // Adjust as needed
    marginBottom: 20, // Adjust as needed
    height: 180,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,},

    PatientInfoTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },

    textContainer: {
        flex: 2,
    },

    button2: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        width: '90%',
        height:55,
        marginLeft: 20,
        marginTop:20,
    },

});

export default AdminDashScreen;
