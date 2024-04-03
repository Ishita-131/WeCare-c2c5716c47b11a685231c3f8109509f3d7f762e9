import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabase.js';
import Auth from './Auth.js';
import Account from './Account.js';
import Profile from './Profile.js';
import Dashboard from './Dashboard.js'; 
import WelcomePage from './WelcomePage.js';
import Tracking from './Tracking.js';
import FitnessTracker from './FitnessTracker.js';
import DietTracker from './DietTracker.js';
import MakeAppointments from './Components/ViewAppointments/MakeAppointments.js';
import registerNNPushToken from 'native-notify';
import { AcceptProvider } from './Components/ViewAppointments/accept.js';
import ChatBot from './ChatBot.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import UpcomingWorkouts from './UpcomingWorkouts.js';
import DeleteProfile from './DeleteProfile.js'; 
import RetrieveProfile from './RetrieveProfile.js';
import Options from './Options.js';
import SelectRole from './SelectRole'; 
import AdminDashboard from './AdminDashboard';
import AmbassadorDashboard from './AmbassadorDashboard';
import Onboarding1 from './Onboarding1.js';
import Onboarding2 from './Onboarding2.js';
import Onboarding3 from './Onboarding3.js';
import Onboarding4 from './Onboarding4.js';
import Onboarding5 from './Onboarding5.js';
import ViewArrangement from './Components/ViewAppointments/ViewArrangement.js';
import AskAppointment from './Components/ViewAppointments/AskAppointment.js';

const Stack = createNativeStackNavigator();

export default function App() {
  registerNNPushToken(20413, 'XXCgXNEW3momP1iuI6L78k');
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Sign out at the start
    supabase.auth.signOut().then(() => {
      //  listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    });
  }, []);

  return (
    <AcceptProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!session ? (
            <>
              <Stack.Screen name="Onboarding1" component={Onboarding1} />
              <Stack.Screen name="Onboarding2" component={Onboarding2} />
              <Stack.Screen name="Onboarding3" component={Onboarding3} />
              <Stack.Screen name="Onboarding4" component={Onboarding4} />
              <Stack.Screen name="Onboarding5" component={Onboarding5} />
              <Stack.Screen name="Welcome" component={WelcomePage} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Auth" component={Auth} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
            </>
          ) : (
            <>
              <Stack.Screen name="SelectRole" component={SelectRole} />
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
              <Stack.Screen name="AmbassadorDashboard" component={AmbassadorDashboard} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Tracking" component={Tracking} /> 
              <Stack.Screen name="FitnessTracker" component={FitnessTracker} /> 
              <Stack.Screen name="DietTracker" component={DietTracker} /> 
              <Stack.Screen name="ChatBot" component={ChatBot} />
              <Stack.Screen name="UpcomingWorkouts" component={UpcomingWorkouts} /> 
              <Stack.Screen name="Appointments" component={MakeAppointments} />
              <Stack.Screen name="ViewArrangements" component={ViewArrangement} />
              <Stack.Screen name='AskAppointment' component={AskAppointment} />
              <Stack.Screen name="DeleteProfile" component={DeleteProfile} /> 
              <Stack.Screen name="Options" component={Options} />
              <Stack.Screen name="RetrieveProfile" component={RetrieveProfile} /> 
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AcceptProvider>
  );
}
