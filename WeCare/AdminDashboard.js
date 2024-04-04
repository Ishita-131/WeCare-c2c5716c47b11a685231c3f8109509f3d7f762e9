import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import MakeAppointments from './makeappointments';
import Tracking from './Tracking';
import ChatbotTemplate from './ChatBot';
import NotificationTemplate from './NotificationTemplate';
import DeleteProfile from './DeleteProfile'; // Import DeleteProfile component
import RetrieveProfile from './RetrieveProfile'; // Import RetrieveProfile component
import MentalHealth from './MentalHealth'; // Correct import
import TechnicalIssue from './TechnicalIssue';
import ViewTechnicalIssue from './ViewTechnicalIssue';


const Drawer = createDrawerNavigator();

const Dashboard = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={DashboardScreen}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="Account" component={Account}/>
        <Drawer.Screen name="Book an Appointment" component={MakeAppointments}/>
        <Drawer.Screen name="Track Your Progress" component={Tracking}/>
        <Drawer.Screen name="Wellbeing" component={MentalHealth}/> {/* Corrected component name */}

        <Drawer.Screen name="Chatbot" component={ChatbotTemplate}/>
        <Drawer.Screen name="Access Notifications" component={NotificationTemplate}/>
        {/* Admin Dashboard Buttons */}
        <Drawer.Screen name="Edit User Profiles" component={Options}/>
        <Drawer.Screen name="Report Technical Issue" component={TechnicalIssue}/>
        <Drawer.Screen name="View Technical Issue" component={TechnicalIssue}/>
    
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
