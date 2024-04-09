import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const AdminDashboard = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greeting}>Admin Dashboard</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={require('./assets/images/Profile Button.png')}
                        style={styles.profileIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.statistics}>
                <Text style={styles.statisticsTitle}>App Statistics</Text>
                <View style={styles.statisticsCards}>
                    <View style={styles.statisticsCard}>
                        <Text style={styles.statisticsCardTitle}>Active Users</Text>
                        <Text style={styles.statisticsCardValue}>1234</Text>
                    </View>
                    <View style={styles.statisticsCard}>
                        <Text style={styles.statisticsCardTitle}>Sessions Today</Text>
                        <Text style={styles.statisticsCardValue}>5678</Text>
                    </View>
                    <View style={styles.statisticsCard}>
                        <Text style={styles.statisticsCardTitle}>Total Content</Text>
                        <Text style={styles.statisticsCardValue}>90</Text>
                    </View>
                </View>
            </View>


        <View style={styles.rowContainer}>
            {/* User Management */}
            <View style={styles.userCardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>
                        User Management
                    </Text>
                    <Text>
                        View and manage user accounts
                    </Text>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('User Management')}>
                        <Text style={styles.buttonText2}>Manage</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* Content Management */}
            <View style={styles.contentCardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>
                        Notifications
                    </Text>
                    <Text>
                        Manage notifications for your users accounts
                    </Text>
                    <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Manage Notifications')}>
                        <Text style={styles.buttonText2}>Manage</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

         {/* App Settings */}
         <View style={styles.settingsCard}>
                <Text style={styles.settingsTitle}>App Settings</Text>
                <Text style={styles.settingsDescription}>Configure app settings and preferences</Text>
                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('App Settings')}>
                    <Text style={styles.settingsButtonText}>Configure</Text>
                </TouchableOpacity>
            </View>

            {/* App Updates */}
            <View style={styles.updatesCard}>
                <Text style={styles.updatesTitle}>App Updates</Text>
                <Text style={styles.updatesDescription}>View recent app updates and release notes</Text>
                <TouchableOpacity style={styles.updatesButton} onPress={() => navigation.navigate('App Updates')}>
                    <Text style={styles.updatesButtonText}>View Updates</Text>
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
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    userCardContainer:{
        alignItems: 'center',
        marginLeft:10,
        marginBottom: 20,
        height: 210,
        width:'45%',
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

    contentCardContainer:{
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        height: 210,
        width:'45%',
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

    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textContainer: {
        flex: 1,
        marginLeft: 20,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },

    button2: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 22,
        width: '100%',
        height: 55,
        marginTop: 15,
    },

    button3: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 22,
        width: '100%',
        height: 55,
        marginTop: 20,
    },

    buttonText2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },

    statistics: {
        backgroundColor: '#7FBFFF',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop:30,
    },

    statisticsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    statisticsCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statisticsCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 3,
        alignItems: 'center',
    },

    statisticsCardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign:'center',
    },

    statisticsCardValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign:'center',
    },
    // New styles for Settings Card
    settingsCard: {
        backgroundColor: '#7FBFFF',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20,
    },

    settingsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },

    settingsDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },

    settingsButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        alignSelf: 'center',
    },

    settingsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    updatesCard: {
        backgroundColor: '#7FBFFF', // Sky blue color
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20,
    },

    updatesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },

    updatesDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },

    updatesButton: {
        backgroundColor: '#007AFF', // Blue color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 22,
        alignSelf: 'center',
    },

    updatesButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AdminDashboard;
