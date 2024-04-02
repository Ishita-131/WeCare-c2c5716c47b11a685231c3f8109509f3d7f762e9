import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';

import { View, Text, Button } from 'react-native';

import DashboardScreen from './dashboardScreen';

import Profile from './Profile';

import Account from './Account';

import MakeAppointments from './Components/ViewAppointments/MakeAppointments';

import Tracking from './Tracking';
import ChatBot from './ChatBot.js'; // Import ChatBot component
import NotificationTemplate from './NotificationTemplate';

const Drawer = createDrawerNavigator();

export default function Dashboard() {

return (

<NavigationContainer independent={true}>

<Drawer.Navigator>

<Drawer.Screen name="Home" component={DashboardScreen}/>

<Drawer.Screen name="Profile" component={Profile}/>

<Drawer.Screen name="Account" component={Account}/>

<Drawer.Screen name="Book an Appointment " component={MakeAppointments}/>

<Drawer.Screen name="Track Your Progress" component={Tracking}/>

<Drawer.Screen name="Chatbot" component={ChatBot}/>

<Drawer.Screen name="Access Notifications" component={NotificationTemplate}/>

</Drawer.Navigator>

</NavigationContainer>

)

}