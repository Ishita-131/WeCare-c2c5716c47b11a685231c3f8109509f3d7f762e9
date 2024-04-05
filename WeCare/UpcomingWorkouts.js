import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Switch, Text } from 'react-native'; // Import Text component from react-native
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Workout from './assets/images/Workout.png'; // Import Workout image
import Workout2 from './assets/images/Workout2.png'; // Import Workout2 image


const UpcomingWorkouts = () => {
  const navigation = useNavigation(); // Initialize navigation
  
  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.UpcomingWorkouts}>
          <View style={styles.titleWorkoutsContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
            <Text style={styles.UpcomingWorkoutsTitle}>Upcoming Workouts</Text>
          </View>
          <FullBody />
          <UpperBody />
          <Cardio />
          <StrengthTraining />
        </View>
      </View>
    </ScrollView>
  );
};

const FullBody = () => {
  const [isEnabled, setIsEnabled] = React.useState(false); // Initialize isEnabled state for Switch component
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); // Function to toggle the Switch component

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={Workout} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>FullBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>Today, 03:00pm</Text>
        </View>
        <Switch // Switch component
          trackColor={{ false: '#767577', true: '#C58BF2' }} // Track color based on state
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'} // Thumb color based on state
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch} // Toggle state on change
          value={isEnabled} // Current state value
        />
      </View>
    </View>
  );
};

const UpperBody = () => {
  const [isEnabled, setIsEnabled] = React.useState(false); // Initialize isEnabled state for Switch component
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); // Function to toggle the Switch component

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={Workout2} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>UpperBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>April 20, 01:00pm</Text>
        </View>
        <Switch // Switch component
          trackColor={{ false: '#767577', true: '#C58BF2' }} // Track color based on state
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'} // Thumb color based on state
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch} // Toggle state on change
          value={isEnabled} // Current state value
        />
      </View>
    </View>
  );
};

const Cardio = () => {
  const [isEnabled, setIsEnabled] = React.useState(false); // Initialize isEnabled state for Switch component
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); // Function to toggle the Switch component

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={Workout2} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>UpperBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>April 20, 01:00pm</Text>
        </View>
        <Switch // Switch component
          trackColor={{ false: '#767577', true: '#C58BF2' }} // Track color based on state
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'} // Thumb color based on state
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch} // Toggle state on change
          value={isEnabled} // Current state value
        />
      </View>
    </View>
  );
};

const StrengthTraining = () => {
  const [isEnabled, setIsEnabled] = React.useState(false); // Initialize isEnabled state for Switch component
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); // Function to toggle the Switch component

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={Workout2} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>UpperBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>April 20, 01:00pm</Text>
        </View>
        <Switch // Switch component
          trackColor={{ false: '#767577', true: '#C58BF2' }} // Track color based on state
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'} // Thumb color based on state
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch} // Toggle state on change
          value={isEnabled} // Current state value
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
    marginTop: 60,
  },

  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1986EC',
    marginLeft: 10,
  },

  UpcomingWorkouts: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleWorkoutsContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Distribute children along the row
    alignItems: 'center', // Align items vertically
    marginRight:85,
  },
  UpcomingWorkoutsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeMoreButton: {
    fontSize: 14,
    color: '#ADA4A5',
  },
  upcoming1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContentUpcoming: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  UpcomingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  UpcomingText2: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  dateText: {
    marginTop: 5,
  },
  workoutImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default UpcomingWorkouts;
