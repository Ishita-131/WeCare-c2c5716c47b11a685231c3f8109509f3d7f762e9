import React from 'react';
import { View, Text, Button } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to Tracking" onPress={() => navigation.navigate('Tracking')} />
      <Button title='Go to Appointments' onPress={() => navigation.navigate('Appointments')}/>
      <Button title="Edit User Profiles(Admin Only)" onPress={() => navigation.navigate('Options')} />
    </View>
  );
};

export default Dashboard;
