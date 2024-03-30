import * as React from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'; // Import ScrollView from react-native
import calories from './assets/images/calories.png';
import clock from './assets/images/clock.png';
import { supabase } from './supabase';


const FitnessTracker = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeTitle}>Welcome back</Text>
          <Text style={styles.todayTitle}>Today</Text>
        </View>
        <WorkoutCard />
        <View style={styles.cardContainer}>
          <LoggingCard />
          <CaloriesCard />
        </View>
      </View>
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
    <View style={styles.workoutCard}>
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
    </View>
  );
};

// LoggingCard component

const LoggingCard = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState(null); // State to hold selected exercise
  const [exerciseDetails, setExerciseDetails] = React.useState({
    date: '',
    duration: '',
    caloriesBurned: '',
  });
  const [exerciseList, setExerciseList] = React.useState([]); // State to hold exercise list
  const [filteredExerciseList, setFilteredExerciseList] = React.useState([]); // State to hold filtered exercise list
  const [searchQuery, setSearchQuery] = React.useState(''); // State to hold search query

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePress = () => {
    showModal(); // Show the modal when the button is pressed
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter exercise list based on the search query
    const filteredList = exerciseList.filter((exercise) =>
      exercise.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExerciseList(filteredList);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise); // Set the selected exercise
    hideModal(); // Hide the modal
  };

  const handleSubmit = () => {
    // You can handle the submission here, for now, let's log the exercise details
    console.log('Exercise details:', exerciseDetails);
    // Clear exercise details after submission
    setExerciseDetails({
      date: '',
      duration: '',
      caloriesBurned: '',
    });
  };

  const handleChangeDate = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, date: text }));
  };

  const handleChangeDuration = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, duration: text }));
  };

  const handleChangeCaloriesBurned = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, caloriesBurned: text }));
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
        <Text style={styles.loggingSmallText}>0 cal</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={clock} style={styles.clockImg} />
        <Text style={styles.loggingSmallText}>00:00 hr</Text>
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
              onChangeText={handleChangeDuration}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter duration in minutes"
            />
            {/* Input for Calories Burned */}
            <TextInput
              label="Calories Burned"
              value={exerciseDetails.caloriesBurned}
              onChangeText={handleChangeCaloriesBurned}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter calories burned"
            />
            {/* Submit button */}
            <Button onPress={handleSubmit}>Submit</Button>
          </Modal>
        )}
      </Portal>
    </View>
  );
};






const CaloriesCard = () => {
  return (
    <View style={styles.caloriesCard}>
      <Text style={styles.caloriesTitle}>Calories burned</Text>
      <View style={styles.caloriesCircle}>
        <Text style={styles.caloriesText}>1700</Text>
        <Text style={styles.caloriessmallText}>remaining</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
  },

  titleContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Distribute children along the row
    alignItems: 'center', // Align items vertically
    width: '100%', // Ensure full width
    paddingHorizontal: 20, // Add padding to the sides
  },

  welcomeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Adjust color as needed
    marginTop: 10,
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
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
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
    backgroundColor: '#8CA7BE',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  loggingcard: {
    width: 162, // Adjusted width to fit next to diet card
    height: 180,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
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
    tintColor: 'white',
  },

  clockImg: {
    width: 20,
    height: 20,
    marginRight: 5, // Adjust spacing between image and text
    tintColor: 'white',
  },

  loggingTitle: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    marginBottom: 3,
  },

  loggingSmallText: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 8,
  },

  caloriesCard: {
    width: 162,
    height: 180,
    borderRadius: 22,
    backgroundColor: '#6A7382',
    marginVertical: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  caloriesTitle: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },

  caloriessmallText: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 13,
    padding: 5,
    fontWeight: '400',
  },

  caloriesCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#8CA7BE', // Adjust circle color as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Add border for circle
    borderColor: 'white', // Color of circle border
  },

  caloriesText: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 24, // Adjust font size of calories number
    fontWeight: 'bold',
  },

  cardContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Evenly distribute items along the main axis
    width: 348, // Set width to match the target card's width
  },

  button2: {
    width: 91,
    height: 57,
    borderRadius: 99,
    backgroundColor: '#8CA7BE',
    justifyContent: 'center',
    alignItems: 'center',
    // Add box-shadow style
    shadowColor: 'rgba(149, 173, 254, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    shadowOpacity: 1,
    elevation: 5, // Android elevation for shadow effect
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
    backgroundColor: '#637697',
    marginTop: 10,
  },
});

export default FitnessTracker;
