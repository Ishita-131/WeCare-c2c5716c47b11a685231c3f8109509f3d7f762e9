import React, { useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from './chatbot.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import UpcomingWorkouts from './UpcomingWorkouts.js';
import FavMeals from './FavMeals.js';
import DeleteProfile from './DeleteProfile.js'; 
import RetrieveProfile from './RetrieveProfile.js';
import Options from './Options.js';
import SelectRole from './SelectRole'; 
import AdminDashboard from './AdminDashboard';
import AmbassadorDashboard from './AmbassadorDashboard';
import TechnicalIssue from './TechnicalIssue';
import ViewTechnicalIssue from './ViewTechnicalIssue';
import Onboarding1 from './Onboarding1.js';
import Onboarding2 from './Onboarding2.js';
import Onboarding3 from './Onboarding3.js';
import Onboarding4 from './Onboarding4.js';
import Onboarding5 from './Onboarding5.js';
import * as Notifications from 'expo-notifications';
import NotificationTemplate from './NotificationInbox';
import MentalHealth from './Components/MentalHealth /MentalHealth.js';
import Breathing from './Components/MentalHealth /Breathing.js';
import BreathingScreen from './Components/MentalHealth /BreathingScreen.js';
import ResourceMental from './Components/MentalHealth /MentalResourse.js';
import MoodTracking from './MoodTracking.js';
import MoodEntryDetails from './Components/MentalHealth /MoodEntryDetails.js';
import UserManagement from './UserManagement.js';
import ExerciseLogList from './ExerciseLogList.js';
import Support from './Components/MentalHealth /SupportGroup.js';

const Stack = createNativeStackNavigator();

const notifications = [
  {
    content: {
      title: "Time to Drink Water 💧",
      body: 'Drinking water regularly is important for your health.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 30,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "New Day 🌅",
      body: 'Embrace today’s chance to grow.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 35,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Just Breathe 🍃",
      body: 'Inhale calm, exhale stress.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 37,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Inner Strength 💪",
      body: 'You\'re stronger than your struggles.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 40,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Keep Growing 🌱",
      body: 'Every challenge is a step forward.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 48,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Trust Yourself 🌟",
      body: 'Your uniqueness is your power.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 50,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Act Kindly ❤️",
      body: 'Small kindnesses make big waves.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 42,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Evening Reflection 🌆",
      body: 'Cherish today\'s moments, big and small.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 43,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  {
    content: {
      title: "Wind Down 🌜",
      body: 'Release the day\'s stress, welcome peace.',
    },
    trigger: {
      repeats: true,
      hour: 12,
      minute: 44,
      sound: 'default',
    },
    timestamp: Date.now() // Include the current timestamp when scheduling
  },
  
];

export default function App() {
  registerNNPushToken(20413, 'XXCgXNEW3momP1iuI6L78k');
  const [session, setSession] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Sign out at the start
    supabase.auth.signOut().then(() => {
      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Check if Notifications module is available
    if (Notifications) {
      registerNotificationListeners();
      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    } else {
      console.error("Notifications module is not available.");
    }
  }, []);

  const registerNotificationListeners = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  };

  useEffect(() => {
    if (Notifications) {
      scheduleAndStoreNotifications();
    }
  }, []);

  const scheduleAndStoreNotifications = async () => {
    try {
      for (const notification of notifications) {
        await Notifications.scheduleNotificationAsync(notification);
        let storedNotifications = await AsyncStorage.getItem('notifications');
        storedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
        storedNotifications.push(notification);
        await AsyncStorage.setItem('notifications', JSON.stringify(storedNotifications));
      }
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Platform.OS !== 'web') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  return (
    <AcceptProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!session ? (
            <>
              <Stack.Screen name="Onboarding1" component={Onboarding1}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="Onboarding2" component={Onboarding2}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="Onboarding3" component={Onboarding3} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Onboarding4" component={Onboarding4} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Onboarding5" component={Onboarding5} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Welcome" component={WelcomePage} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Login" component={Login}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="SignUp" component={SignUp}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="Auth" component={Auth} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
            </>
          ) : (
            <>
              <Stack.Screen name="SelectRole" component={SelectRole} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="AmbassadorDashboard" component={AmbassadorDashboard} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Dashboard" component={Dashboard}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="Account" component={Account} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Profile" component={Profile}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="Tracking" component={Tracking} options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="FitnessTracker" component={FitnessTracker}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} /> 
              <Stack.Screen name="DietTracker" component={DietTracker}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} /> 
              <Stack.Screen name="MentalHealth" component={MentalHealth}options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })} /> 
              <Stack.Screen name="Breathing" component={Breathing}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="BreathingScreen" component={BreathingScreen}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="MentalResource" component={ResourceMental}options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })} />
              <Stack.Screen name="MoodTracking" component={MoodTracking}options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })} />
              <Stack.Screen name="MoodEntryDetails" component={MoodEntryDetails}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="ChatBot" component={ChatBot} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/>
              <Stack.Screen name="UpcomingWorkouts" component={UpcomingWorkouts} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="ExerciseLogList" component={ExerciseLogList} options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="Support" component={Support} options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="FavMeals" component={FavMeals} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="Appointments" component={MakeAppointments}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="UserManagement" component={UserManagement}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="DeleteProfile" component={DeleteProfile} options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })}/> 
              <Stack.Screen name="Options" component={Options}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="RetrieveProfile" component={RetrieveProfile}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} /> 
              <Stack.Screen name="TechnicalIssue" component={TechnicalIssue}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} /> 
              <Stack.Screen name="ViewTechnicalIssue" component={ViewTechnicalIssue}options={({ navigation }) => ({
                headerShown: false,
                navigation: navigation,
              })} />
              <Stack.Screen name="NotificationTemplate" component={NotificationTemplate}options={({ navigation }) => ({
                headerShown: true,
                navigation: navigation,
              })} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AcceptProvider>
  );
}