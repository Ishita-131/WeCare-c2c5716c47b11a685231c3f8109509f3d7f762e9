import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';

import { View, Text, Button } from 'react-native';

import DashboardScreen from './dashboardScreen';

import Profile from './Profile';

import Account from './Account';
import Tracking from './Tracking';
import ChatbotTemplate from './ChatBot';
import NotificationTemplate from './NotificationTemplate';
import AppointmentsMade from './Components/ListAppointments.js/AppointmentsMade';

const Drawer = createDrawerNavigator();

export default function Dashboard() {

return (

<NavigationContainer independent={true}>

<Drawer.Navigator>

<Drawer.Screen name="Home" component={DashboardScreen}/>

<Drawer.Screen name="Profile" component={Profile}/>

<Drawer.Screen name="Account" component={Account}/>

<Drawer.Screen name="Manage an Appointment " component={AppointmentsMade}/>

<Drawer.Screen name="Track Your Progress" component={Tracking}/>

<Drawer.Screen name="Chatbot" component={ChatbotTemplate}/>

<Drawer.Screen name="Access Notifications" component={NotificationTemplate}/>

</Drawer.Navigator>

</NavigationContainer>

)

}
