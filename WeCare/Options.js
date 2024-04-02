import React from 'react';
import { View, Text, Button } from 'react-native'; 

const Dashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Delete User Profiles" onPress={() => navigation.navigate('DeleteProfile')} />
      <Button title="Retrieving Deleted User Profiles" onPress={() => navigation.navigate('RetrieveProfile')} />
      
    </View>
  );
};

export default Dashboard;
