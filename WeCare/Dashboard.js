import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import MakeAppointments from './Components/ViewAppointments/MakeAppointments';
import Tracking from './Tracking.js';
import ChatBot from './ChatBot.js';
import NotificationTemplate from './NotificationTemplate';
import AppointmentsMade from './Components/ListAppointments.js/AppointmentsMade';
import MentalHealth from './MentalHealth'; // Correct import

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={DashboardScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Book an Appointment" component={MakeAppointments} />
      <Drawer.Screen name="Appointments Made" component={AppointmentsMade} />
      <Drawer.Screen name="Tracking" component={Tracking} />
      <Drawer.Screen name="Mental Health" component={MentalHealth}/>
      <Drawer.Screen name="Chatbot" component={ChatBot} />
      <Drawer.Screen name="Access Notifications" component={NotificationTemplate} />
    </Drawer.Navigator>
  );
}
