import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import ChatBot from './ChatBot2';
import DeleteProfile from './DeleteProfile'; // Import DeleteProfile component
import RetrieveProfile from './RetrieveProfile'; // Import RetrieveProfile component
import ViewTechnicalIssue from './ViewTechnicalIssue';


const Drawer = createDrawerNavigator();

const Dashboard = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={DashboardScreen}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="Chatbot" component={ChatBot}/>
        {/* Admin Dashboard Buttons */}
        <Drawer.Screen name="Delete User Profiles" component={DeleteProfile}/>
        <Drawer.Screen name="Retrieve Deleted User Profiles" component={RetrieveProfile}/>
        <Drawer.Screen name="View Technical Issues" component={ViewTechnicalIssue}/>
        <Drawer.Screen name="Sign Out" component={Account} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
