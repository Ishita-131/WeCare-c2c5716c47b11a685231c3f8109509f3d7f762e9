import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import MakeAppointments from './Components/ViewAppointments/MakeAppointments';
import Tracking from './Tracking';
import ChatBot from './ChatBot.js';
import NotificationTemplate from './NotificationTemplate';
import AppointmentsMade from './Components/ListAppointments.js/AppointmentsMade';
import MentalHealth from './MentalHealth'; // Correct import

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={DashboardScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Book an Appointment" component={MakeAppointments} />
        <Drawer.Screen name="Appointments Made" component={AppointmentsMade} />
        <Drawer.Screen name="Track Your Progress" component={Tracking} />
        <Drawer.Screen name="Wellbeing" component={MentalHealth}/> {/* Corrected component name */}
        <Drawer.Screen name="Chatbot" component={ChatBot} />
        <Drawer.Screen name="Access Notifications" component={NotificationTemplate} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={DashboardScreen}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="Account" component={Account}/>
        <Drawer.Screen name="Book an Appointment" component={MakeAppointments}/>
        <Drawer.Screen name="Track Your Progress" component={Tracking}/>
        <Drawer.Screen name="Chatbot" component={ChatBot}/>
        <Drawer.Screen name="Access Notifications" component={NotificationTemplate}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
