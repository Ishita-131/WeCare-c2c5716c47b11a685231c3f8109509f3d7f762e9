import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Profile from './Profile';
import Account from './Account';
import ChatbotTemplate from './chatbot';
import TechnicalIssue from './TechnicalIssue';
import AdminDashScreen from './AmbasDashScreen';
import NotesPage from './NotesPage';
import ViewPatients from './Components/ViewPatients/ListAmbassApp';

const Drawer = createDrawerNavigator();

export default function Dashboard() {

  return (

    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={AdminDashScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="View Scheduled Appointments" component={ViewPatients} />
        <Drawer.Screen name="Notes" component={NotesPage} />
        <Drawer.Screen name="Report Technical Issues" component={TechnicalIssue}/>
        <Drawer.Screen name="Chatbot" component={ChatbotTemplate} />
        <Drawer.Screen name="Sign Out" component={Account} />
      </Drawer.Navigator>
    </NavigationContainer>

  )

}

