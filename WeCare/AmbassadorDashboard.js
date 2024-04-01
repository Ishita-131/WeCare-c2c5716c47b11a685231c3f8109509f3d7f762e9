import React from 'react';
import { View, Text, Button } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to Tracking" onPress={() => navigation.navigate('Tracking')} />
      <Button title='View Scheduled Appointments' onPress={() => navigation.navigate('Appointments')}/> 
    </View>
  );
};

export default Dashboard;