import React, { useState, useEffect} from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, TextInput, Switch, RefreshControl } from 'react-native'; // Import ScrollView from react-native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import calories from './assets/images/calories.png';
import clock from './assets/images/clock.png';
import { supabase } from './supabase';
import ProfileButton2 from './assets/images/ProfileButton2.png'; // Import the image
import FullBody from './assets/images/FullBody.png';
import UpperBody from './assets/images/UpperBody.png';


const FitnessTracker = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  

  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  const handleCaloriesChange = (caloriesBurned) => {
    setTotalCaloriesBurned(caloriesBurned);
  };


  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
            <Text style={styles.welcomeStyles}>Fitness Tracker</Text>
            <Image source={ProfileButton2} style={styles.profileButton} />
          </View>
          <WorkoutCard />
          <View style={styles.cardContainer}>
          <LoggingCard onCaloriesChange={handleCaloriesChange} />
            <CaloriesCard totalCaloriesBurned={totalCaloriesBurned} />
          </View>
          <UpcomingWorkouts />
          <Upcoming1 />
          <Upcoming2 />
          <ExerciseCount />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};


const WorkoutCard = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePress = () => {
    showModal(); // Show the modal when the button is pressed
  };

  return (
    <LinearGradient
      colors={['#92A3FD', '#9DCEFF']} // Set gradient colors
      start={{ x: 0, y: 0 }} // Set start point of the gradient
      end={{ x: 1, y: 0 }} // Set end point of the gradient
      style={styles.workoutCard} // Apply gradient to the entire card
    >
      <View style={styles.cardContent}>
        <Text style={styles.dailyWorkoutTitle}>Daily Workout Schedule</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          {/* Modal Content */}
          <Text style={styles.modalTitle}>Daily Workout Schedule</Text>
          <View style={styles.workoutDetails}>
            <Text style={styles.modalText}>Date: March 29, 2024</Text>
            <Text style={styles.modalText}>Workout Routine:</Text>
            <Text style={styles.modalText}>1. Push-ups - 3 sets of 15 repetitions</Text>
            <Text style={styles.modalText}>2. Squats - 4 sets of 12 repetitions</Text>
            <Text style={styles.modalText}>3. Lunges - 3 sets of 10 repetitions (each leg)</Text>
            {/* Additional content such as instructions, progress tracking, etc. can be added here */}
          </View>
          <Button onPress={hideModal} mode="contained" style={styles.closeButton}>
            Close
          </Button>
        </Modal>
      </Portal>
    </LinearGradient>
  );
};

// LoggingCard component
const LoggingCard = ({ onCaloriesChange }) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const [exerciseDetails, setExerciseDetails] = React.useState({
    date: '',
    duration: '',
    caloriesBurned: 0,
  });

  const [totalCaloriesBurned, setTotalCaloriesBurned] = React.useState(0); // State to hold total calories burned
  const [totalDuration, setTotalDuration] = React.useState(0); // State to hold total duration in minutes

  const [exerciseList, setExerciseList] = React.useState([]);
  const [filteredExerciseList, setFilteredExerciseList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePress = () => {
    showModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = exerciseList.filter((exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExerciseList(filteredList);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    hideModal();
  };

  const handleDurationChange = (text) => {
    const duration = parseInt(text);
    const caloriesBurned = duration * selectedExercise.calories_per_minute;
    setExerciseDetails((prevDetails) => ({ ...prevDetails, duration, caloriesBurned }));
  };

  const handleSubmit = async () => {
    try {
      const { data: exerciseData, error: exerciseError } = await supabase
        .from('exerciseslist')
        .select('*')
        .eq('id', selectedExercise.id)
        .single();
  
      if (exerciseError) {
        throw exerciseError;
      }
  
      const caloriesBurned = exerciseData.calories_per_minute * parseInt(exerciseDetails.duration);
  
      const { data, error } = await supabase
        .from('exerciselog')
        .insert([
          {
            exercisename: selectedExercise.name,
            exercisedate: exerciseDetails.date,
            durationminutes: parseInt(exerciseDetails.duration),
            caloriesburned: caloriesBurned,
          },
        ]);
  
      if (error) {
        throw error;
      }
  
      console.log('Exercise details inserted successfully:', data);
  
      // Update total calories burned and total duration
      setTotalCaloriesBurned(totalCaloriesBurned + caloriesBurned);
      setTotalDuration(totalDuration + parseInt(exerciseDetails.duration));
      
      // Clear exercise details after successful submission
      setExerciseDetails({
        date: '',
        duration: '',
        caloriesBurned: '',
      });
  
      // Pass the calories burned value to the parent component
      onCaloriesChange(totalCaloriesBurned + caloriesBurned);
    } catch (error) {
      console.error('Error inserting exercise details:', error);
    }
  };  
  
    const handleChangeDate = (text) => {
      setExerciseDetails((prevDetails) => ({ ...prevDetails, date: text }));
    };
  
    const formatDuration = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')} hr`;
    };
  
    React.useEffect(() => {
      // Fetch exercise list from Supabase when component mounts
      const fetchExerciseList = async () => {
        try {
          const { data, error } = await supabase.from('exerciseslist').select('*');
          if (error) {
            throw error;
          }
          setExerciseList(data);
        } catch (error) {
          console.error('Error fetching exercise list:', error.message);
        }
      };
  
      fetchExerciseList();
    }, []);

  return (
    <View style={styles.loggingcard}>
      <Text style={styles.loggingTitle}>Log Exercise</Text>
      <View style={styles.imageContainer}>
        <Image source={calories} style={styles.caloriesImg} />
        <Text style={styles.loggingSmallText}>{totalCaloriesBurned} cal</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={clock} style={styles.clockImg} />
        <Text style={styles.loggingSmallText}>{formatDuration(totalDuration)}</Text>
      </View>
      <TouchableOpacity style={styles.button2} onPress={handlePress}>
        <Text style={styles.buttonText2}>Log</Text>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Exercise</Text>
          <TextInput
            label="Search"
            onChangeText={handleSearch}
            style={styles.searchBar}
            placeholder="Search for exercises"
            placeholderTextColor="#999"
            value={searchQuery}
          />
          {searchQuery !== '' && (
            <ScrollView style={styles.exerciseListContainer}>
              {filteredExerciseList.map((exercise) => (
                <TouchableOpacity key={exercise.id} onPress={() => handleSelectExercise(exercise)} style={styles.exerciseItemContainer}>
                  <Text style={styles.exerciseItem}>{exercise.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </Modal>
        {selectedExercise && (
          <Modal visible={!!selectedExercise} onDismiss={() => setSelectedExercise(null)} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Exercise Details</Text>
            {/* Input for Date */}
            <TextInput
              label="Date (YYYY-MM-DD)"
              value={exerciseDetails.date}
              onChangeText={handleChangeDate}
              style={styles.input}
              placeholder="YYYY-MM-DD"
            />
            {/* Input for Duration */}
            <TextInput
                label="Duration (minutes)"
                value={exerciseDetails.duration}
                onChangeText={handleDurationChange}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter duration in minutes"
            />
            {/* Submit button */}
            <Button onPress={handleSubmit}>Submit</Button>
          </Modal>
        )}
      </Portal>
    </View>
  );
};

const CaloriesCard = ({ totalCaloriesBurned }) => {
  return (
    <View style={styles.caloriesCard}>
      <Text style={styles.caloriesTitle}>Calories burned</Text>
      <View style={styles.caloriesCircle}>
        <Text style={styles.caloriesText}>{totalCaloriesBurned}</Text>
        <Text style={styles.caloriessmallText}>burned</Text>
      </View>
    </View>
  );
};


const UpcomingWorkouts = () => {
  const navigation = useNavigation();

  const handleSeeMorePress = () => {
    navigation.navigate('UpcomingWorkouts'); // Navigate to the UpcomingWorkouts page
  };

  return (
    <View style={styles.UpcomingWorkouts}>
      <View style={styles.titleWorkoutsContainer}>
        <Text style={styles.UpcomingWorkoutsTitle}>Upcoming Workouts</Text>
        <TouchableOpacity onPress={handleSeeMorePress}>
          <Text style={styles.seeMoreButton}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Upcoming1 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={FullBody} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>FullBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>Today, 03:00pm</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#C58BF2' }}
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};


const Upcoming2 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={UpperBody} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText2}>UpperBody Workout</Text>
          <Text style={[styles.UpcomingText2, styles.dateText]}>April 20, 01:00pm</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#C58BF2' }}
          thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const ExerciseCount = () => {
  const navigation = useNavigation(); 
  const [weeklyExerciseCount, setWeeklyExerciseCount] = useState(0);

  useEffect(() => {
    const fetchExerciseLog = async () => {
      try {
        // Fetch exercise log data for the current week
        const { data, error } = await supabase
          .from('exerciselog')
          .select('*')
          .range(new Date(new Date().setDate(new Date().getDate() - 7)), new Date());

        if (error) {
          throw error;
        }

        // Calculate the total number of exercises logged within the current week
        const count = data.length;
        setWeeklyExerciseCount(count);
      } catch (error) {
        console.error('Error fetching exercise log:', error.message);
      }
    };

    fetchExerciseLog();
  }, []);
  const handleMoreDetailsPress = () => {
    // Navigate to ExerciseLogList component
    navigation.navigate('ExerciseLogList');
  };

  return (
    <LinearGradient
      colors={['#92A3FD', '#9DCEFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.ExerciseCountStyle}
    >
      <View style={styles.cardContentExCount}>
        <Text style={styles.CountTitle}>Weekly Exercise Count</Text>
        <View style={styles.countAndButtonContainer}>
        <TouchableOpacity style={styles.learnMoreButton2} onPress={handleMoreDetailsPress}>
  <Text style={styles.learnMoreText}>More Details</Text>
</TouchableOpacity>
          <View style={styles.countContainer}>
            <Text style={styles.CountNumber}>{weeklyExerciseCount}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
    marginTop:60,
  },

  titleContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Distribute children along the row
    alignItems: 'center', // Align items vertically
    width: '100%', // Ensure full width
    paddingHorizontal: 20, // Add padding to the sides
    marginTop: 8, 
  },

  welcomeStyles: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 40,
    textAlign: 'left',
  },

  profileButton: {
    width: 51.508,
    height: 51.508,
    flexShrink: 0,
    borderRadius: 51.508,
    backgroundColor: '#9DCEFF',
  },

  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1986EC',
    marginLeft: 10,
  },

  todayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Adjust color as needed
    marginTop: 10,
  },

  workoutCard: {
    width: 348,
    height: 80,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#1986EC', 
    marginVertical: 10,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Add space between title and button
    alignItems: 'center', // Align items vertically
  },
  dailyWorkoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#1986EC',
    fontWeight: 'bold',
  },

  loggingcard: {
    width: 162, // Adjusted width to fit next to diet card
    height: 180,
    flexShrink: 0,
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },

  searchBar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#f0f0f0', // Light gray background
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15, // Increased bottom margin for better separation
  },

  exerciseListContainer: {
    marginTop: 10,
    borderRadius: 10,
    maxHeight: 200, // Limit the height of the exercise list
    backgroundColor: '#f0f0f0', // Light gray background for the exercise list
  },

  exerciseItemContent: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Space evenly between items
  },

  exerciseItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  exerciseItem: {
    fontSize: 16,
    color: '#333',
    margin:5,
    fontWeight: '600',
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  caloriesImg: {
    width: 20,
    height: 20,
    marginRight: 5, // Adjust spacing between image and text
    tintColor: 'black',
  },

  clockImg: {
    width: 20,
    height: 20,
    marginRight: 5, // Adjust spacing between image and text
    tintColor: 'black',
  },

  loggingTitle: {
    color: 'black',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    marginBottom: 5,
  },

  loggingSmallText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 8,
  },

  caloriesCard: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 162, // Adjusted width to fit next to diet card
    height: 180,
    flexShrink: 0,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },

  caloriesTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },

  caloriessmallText: {
    color: 'white',
    fontSize: 13,
    padding: 5,
    fontWeight: '400',
  },

  caloriesCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#1986EC' , // Adjust circle color as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Add border for circle
    borderColor: 'white', // Color of circle border
  },

  caloriesText: {
    color: 'white',
    fontSize: 24, // Adjust font size of calories number
    fontWeight: 'bold',
  },

  cardContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Evenly distribute items along the main axis
    width: 348, // Set width to match the target card's width
  },

  UpcomingWorkoutsTitle: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24, // React Native does not require units for lineHeight
    color: '#1D1617', // Use the provided color or fallback to #1D1617
    marginTop:10, 
  },

  titleWorkoutsContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Distribute children along the row
    alignItems: 'center', // Align items vertically
    width: '100%', // Ensure full width
    paddingHorizontal: 20, // Add padding to the sides
    marginTop: 8, 
  }, 

  seeMoreButton: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#ADA4A5',
    marginTop: 10,
  },

  workoutImage: {
    width: 50, // Adjust the width to make the image smaller
    height: 50, // Adjust the height to make the image smaller
  },

  upcoming1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#1D1617',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 40,
    elevation: 4,
    marginVertical: 10,
  },
  cardContentUpcoming: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flex: 1,
  },

  UpcomingText: {
    fontSize: 14, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18, // React Native does not require units for lineHeight
    marginRight: 40,
    marginTop: -15, 
  }, 

  UpcomingText2: {
    fontSize: 14, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18, // React Native does not require units for lineHeight
    marginRight: 18,
    marginTop: -15, 
  }, 

  dateText: {
    marginTop:5,
    fontSize: 10, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 15, // React Native does not require units for lineHeight
    color: '#ADA4A5', // Specify the color explicitly
  },

  ExerciseCountStyle: {
    // Updated styles for Exercise Count card
    width: 348,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:50, 
  },

  cardContentExCount: {
    // Updated styles for content container
    flex: 1,
  },

  CountTitle: {
    // Styles for Weekly Exercise Count title
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop:10,
  },

  countAndButtonContainer: {
    // Container for count and button
    flexDirection: 'row',
    alignItems: 'center',
  },

  countContainer: {
    // Container for exercise count
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 90,
    height: 90,
    marginLeft:20,
    marginBottom:10,
  },

  CountNumber: {
    // Styles for exercise count number
    color: '#1986EC',
    fontSize: 24,
    fontWeight: 'bold',
  },

  learnMoreButton: {
    // Styles for "More Details" button
    backgroundColor: '#1986EC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 20, // Add margin to separate button from count
  },

  learnMoreText: {
    // Styles for "More Details" button text
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  learnMoreButton2: {
    // Styles for "More Details" button
    backgroundColor: '#1986EC',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 50,
    marginLeft:-3,
  },

  button2: {
    width: 91,
    height: 57,
    borderRadius: 99,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF', // Change to white background
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Change text color to dark
  },
  workoutDetails: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Change text color to dark
  },
  closeButton: {
    backgroundColor: '#1986EC',
    marginTop: 10,
  },
});


export default FitnessTracker;
