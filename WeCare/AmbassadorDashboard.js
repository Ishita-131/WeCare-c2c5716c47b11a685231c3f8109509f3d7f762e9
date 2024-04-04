import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import ChatbotTemplate from './ChatBot';
import ViewArrangement from './Components/ViewAppointments/ViewArrangement.js';
import AppointmentsMade from './Components/ListAppointments.js/AppointmentsMade';


const Drawer = createDrawerNavigator();

export default function Dashboard() {

  return (

    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={DashboardScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="View Scheduled Appointments" component={ViewArrangement} />
        <Drawer.Screen name="Chatbot" component={ChatbotTemplate} />
      </Drawer.Navigator>
    </NavigationContainer>

  )

}

