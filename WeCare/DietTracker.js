import React, { useState } from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, TextInput, Switch } from 'react-native'; // Import ScrollView from react-native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { supabase } from './supabase';
import ProfileButton2 from './assets/images/ProfileButton2.png'; // Import the image
import StirFry from './assets/images/stirfry.png';
import Salad from './assets/images/salad.png';
import Drop from './assets/images/drop.png';


const DietTracker = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeStyles}>Diet Tracker</Text>
            <Image source={ProfileButton2} style={styles.profileButton} />
          </View>
          <WorkoutCard />
          <View style={styles.cardContainer}>
            <WaterLoggingCard />
            <CaloriesCard />
          </View>
          <QuoteCard />
          <FavouriteMeals />
          <FavouriteRec1 />
          <FavouriteRec2 />
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
        <Text style={styles.dailyWorkoutTitle}>Daily Meal Plan</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Meal Plan</Text>
          <View style={styles.workoutDetails}>
            <Text style={styles.modalText}>Date: March 29, 2024</Text>
            <Text style={styles.modalText}>Meal Plan:</Text>
            <Text style={styles.modalText}>1. Breakfast - Oatmeal with fruits</Text>
            <Text style={styles.modalText}>2. Lunch - Grilled chicken with vegetables</Text>
            <Text style={styles.modalText}>3. Snack - Greek yogurt with nuts</Text>
            <Text style={styles.modalText}>4. Dinner - Salmon with quinoa and steamed broccoli</Text>
            {/* Additional meals can be added here */}
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

const WaterLoggingCard = () => {
  const [visible, setVisible] = useState(false);
  const [waterAmount, setWaterAmount] = useState("0.25"); // Default water amount in liters
  const [totalWater, setTotalWater] = useState(0); // Total water consumption

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleLogWater = async () => {
    try {
      const { data, error } = await supabase.from('waterlog').insert([
        { amount: waterAmount, timestamp: new Date() },
      ]);

      if (error) {
        console.error('Error logging water consumption:', error.message);
      } else {
        console.log('Water consumption logged successfully:', data);
        const amountInLiters = parseFloat(waterAmount);
        setTotalWater(prevTotal => prevTotal + amountInLiters); // Update total water
        setWaterAmount("0.25");
        hideModal();
      }
    } catch (error) {
      console.error('Error logging water consumption:', error.message);
    }
  };

  return (
    <View style={styles.loggingcard}>
      <Text style={styles.loggingTitle}>Log Water Consumption</Text>
      <View style={styles.imageContainer}>
        <Image source={Drop} style={styles.clockImg} />
        <Text style={styles.loggingSmallText}>{totalWater.toFixed(2)}L drank today!</Text>
      </View>
      <TouchableOpacity style={styles.button2} onPress={showModal}>
        <Text style={styles.buttonText2}>Log Water</Text>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Log Water Consumption</Text>
          {/* Input for Water Amount */}
          <TextInput
            label="Amount (L)"
            value={waterAmount}
            onChangeText={(text) => setWaterAmount(text)}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount in liters"
          />
          {/* Submit button */}
          <Button onPress={handleLogWater}><Text>Submit</Text></Button>
        </Modal>
      </Portal>
    </View>
  );
};

const CaloriesCard = () => {
  const [mealName, setMealName] = useState('');
  const [time, setTime] = useState('');

  const handleLogMeal = async () => {
    try {
      // Check if any of the input fields are empty
      if (!mealName || !time) {
        console.error('Please fill in all fields');
        return;
      }

      // Insert meal data into the database
      const { data, error } = await supabase.from('meals').insert([
        { meal_name: mealName, time: time, timestamp: new Date() },
      ]);

      if (error) {
        console.error('Error logging meal:', error.message);
      } else {
        console.log('Meal logged successfully:', data);
        // Clear input fields after successful logging
        setMealName('');
        setTime('');
      }
    } catch (error) {
      console.error('Error logging meal:', error.message);
    }
  };

  return (
    <View style={styles.loggingcard}>
      <Text style={styles.loggingTitle}>Log Meal</Text>
      {/* Input for Meal Name */}
      <TextInput
        label="Meal Name"
        value={mealName}
        onChangeText={(text) => setMealName(text)}
        style={styles.input}
        placeholder="Enter meal"
      />
      {/* Input for Time */}
      <TextInput
        label="Time"
        value={time}
        onChangeText={(text) => setTime(text)}
        style={styles.input}
        placeholder="Enter time"
      />
      {/* Submit button */}
      <TouchableOpacity style={styles.buttonLog2} onPress={handleLogMeal}>
        <Text style={styles.buttonText2}>Log Meal</Text>
      </TouchableOpacity>
    </View>
  );
};


const QuoteCard = () => {
  return (
    <View style={styles.quoteContainer}>

      <Text style={styles.quote}>
      "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
      </Text>

    </View>
  );
};

const FavouriteMeals = () => {
  const navigation = useNavigation();

  const handleSeeMorePress = () => {
    navigation.navigate('FavMeals'); // Navigate to the FavMeals page
  };

  return (
    <View style={styles.UpcomingWorkouts}>
      <View style={styles.FavMealsContainer}>
        <Text style={styles.MealsTitle}>Favourtie Meals</Text>
        <TouchableOpacity onPress={handleSeeMorePress}>
          <Text style={styles.seeMoreButton}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const FavouriteRec1 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        {/* Move the image container to the left side */}
        <Image source={StirFry} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText}>Stirfry</Text>
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


const FavouriteRec2 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.upcoming1Container}>
      <View style={styles.cardContentUpcoming}>
        <Image source={Salad} style={styles.workoutImage} />
        <View>
          <Text style={styles.UpcomingText2}>Greek Salad</Text>
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
  return (
    <LinearGradient
      colors={['#92A3FD', '#9DCEFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.MealStyle}
    >
      <View style={styles.cardContentExCount}>
        <Text style={styles.nutrientTitle}>Nutritional Value</Text>
        <View style={styles.nutritionalInfo}>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientLabel}>Calories:</Text>
            <Text style={styles.nutrientValue}>500 kcal</Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientLabel}>Protein:</Text>
            <Text style={styles.nutrientValue}>25g</Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientLabel}>Carbs:</Text>
            <Text style={styles.nutrientValue}>50g</Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientLabel}>Fat:</Text>
            <Text style={styles.nutrientValue}>20g</Text>
          </View>
          {/* Add more nutrients as needed */}
        </View>
        {/* More Details Button */}
        <TouchableOpacity style={styles.learnMoreButton2}>
          <Text style={styles.learnMoreText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
    marginTop: 60,
    flex: 1, // Ensure the container takes up the entire screen
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
    height: 210,
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
    paddingVertical: 5,
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
    margin: 5,
    fontWeight: '600',
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
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
    fontSize: 15,
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
    backgroundColor: '#1986EC', // Adjust circle color as needed
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

  quoteContainer: {
    flexDirection: 'row', // Set the direction of children to horizontal
    justifyContent: 'space-between', // Distribute space between the children
    alignItems: 'center', // Center children vertically
    marginHorizontal: 20, // Adjust horizontal margin to make the container smaller
    marginTop: 20, // Adjust as needed
    marginBottom: 20, // Adjust as needed
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  quote: {
    flex: 1, // Take up the remaining space in the flex container
    fontStyle: 'italic',
    fontSize: 14, // Adjust font size as needed
    textAlign: 'center', // Align to the left if text is short
    fontWeight: '600',
  },

  MealsTitle: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24, // React Native does not require units for lineHeight
    color: '#1D1617', // Use the provided color or fallback to #1D1617
    marginTop:10, 
  },

  FavMealsContainer: {
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

  workoutImage: {
    width: 50, // Adjust the width to make the image smaller
    height: 50, // Adjust the height to make the image smaller
    marginRight:-80,
  },

  UpcomingText: {
    fontSize: 14, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18, // React Native does not require units for lineHeight
    marginTop: -15,
  },

  UpcomingText2: {
    fontSize: 14, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18, // React Native does not require units for lineHeight
    marginTop: -15,
  },

  dateText: {
    marginTop: 5,
    fontSize: 10, // React Native does not require units for fontSize
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 15, // React Native does not require units for lineHeight
    color: '#ADA4A5', // Specify the color explicitly
  },

  MealStyle: {
    // Updated styles for Exercise Count card
    width: 348,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },

  nutrientTitle:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  nutritionalInfo: {
    marginTop: 10,
  },

  nutrient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft:8,
  },

  nutrientLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  nutrientValue: {
    color: 'white',
    fontSize: 14,
    marginRight:70,
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
    marginLeft: -3,
    marginTop:10,
    width:300,
  },

  button2: {
    width: 120,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonLog2: {
    width: 120,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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


export default DietTracker;
