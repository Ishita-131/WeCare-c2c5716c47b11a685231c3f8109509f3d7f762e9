
import 'react-native-gesture-handler';
import { createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DashboardScreen from './dashboardScreen';
import Profile from './Profile';
import Account from './Account';
import MakeAppointments from './Components/ViewAppointments/MakeAppointments';
import Tracking from './Tracking.js';
import ChatBot from './chatbot';
import NotificationTemplate from './NotificationInbox';
import AppointmentsMade from './Components/ListAppointments.js/AppointmentsMade';
import MentalHealth from './Components/MentalHealth /MentalHealth.js'; // Correct import


const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={DashboardScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Book an Appointment" component={MakeAppointments} />
      <Drawer.Screen name="Appointments Made" component={AppointmentsMade} />
      <Drawer.Screen name="Wellness" component={Tracking} />
      <Drawer.Screen name="Mental Health" component={MentalHealth}/>
      <Drawer.Screen name="Chatbot" component={ChatBot} />
      <Drawer.Screen name="Access Notifications" component={NotificationTemplate} />
      <Drawer.Screen name="Sign Out" component={Account} />
    </Drawer.Navigator>
  );
}
