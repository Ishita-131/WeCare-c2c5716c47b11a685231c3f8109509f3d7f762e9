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

            {/* Patient Information Card */}
            <View style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>
                        Patient Information
                    </Text>
                    <Text>
                        Click below to view your patients' information
                    </Text>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('View Scheduled Appointments')}>
                        <Text style={styles.buttonText2}>Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>

             {/* View Appointments Button */}
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('View Scheduled Appointments')}>
                <Text style={styles.buttonText}>View Appointments</Text>
            </TouchableOpacity>

            {/* Chatbot Access Card */}
            <View style={styles.chatbotCard}>
                <Image source={require('./assets/images/chatbot.png')} style={styles.chatbotImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.chatbotTitle}>
                        Chatbot Access
                    </Text>
                    <Text>
                        Ask the chatbot any questions you have
                    </Text>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Chatbot')}>
                        <Text style={styles.buttonText2}>Chatbot</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rowContainer}>
            {/* Notes Access Card */}
            <View style={styles.notesCard}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.notesTitle}>
                        Your Notes
                    </Text>
                </View>
                <TouchableOpacity style={styles.notesButton} onPress={() => navigation.navigate('Notes')}>
                <Image source={require('./assets/images/notes.png')} style={styles.notesImage} />
                </TouchableOpacity>
            </View>

            {/* Notes Access Card */}
            <View style={styles.notesCard}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.notesTitle}>
                        Your Notes
                    </Text>
                </View>
                <TouchableOpacity style={styles.notesButton} onPress={() => navigation.navigate('NotesPage')}>
                <Image source={require('./assets/images/notes.png')} style={styles.notesImage} />
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: -10,
    },

    profileIcon: {
        width: 45,
        height: 45,
    },

    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
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
        elevation: 4,
    },

    textContainer: {
        flex: 1,
        marginLeft: 20,
    },

    cardTextContainer: {
        marginLeft: 30,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },

    notesTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        marginLeft:-10,
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

    button2: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        width: '90%',
        height: 55,
        marginTop: 20,
    },

    buttonText2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    notesButton:{
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 22,
        width: '60%',
        marginLeft:30,
    },

    chatbotCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
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
        elevation: 4,
    },

    chatbotImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 20,
    },

    chatbotTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },

    notesCard:{
        justifyContent: 'flex-start',
        marginHorizontal: 10,
        marginBottom: 20,
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
        elevation: 4,
        width:'44%',
    },

    notesImage:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        tintColor:'white',
        marginRight:20,
    },

    fillerImage:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft:'60%',
    },

    rowContainer:{
        flexDirection: 'row',
        marginLeft:10,
    },
});

export default AdminDashScreen;
