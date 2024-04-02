import React, { useState } from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import calories from './assets/images/calories.png';
import { supabase } from './supabase';
import ProfileButton2 from './assets/images/ProfileButton2.png';
import Food from './assets/images/Food.png';
import Food2 from './assets/images/Food2.png';

const DietTracker = () => {
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeStyles}>Diet Tracker</Text>
            <Image source={ProfileButton2} style={styles.profileButton} />
          </View>
          <MealPlanCard />
          <View style={styles.cardContainer}>
            <CaloriesCard />
            <DietLoggingCard />
          </View>
          <UpcomingMeals />
          <Meal1 />
          <Meal2 />
          <FoodCount />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const DietLoggingCard = () => {
  const [visible, setVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodDetails, setFoodDetails] = useState({
    date: '',
    meal: '',
    caloriesConsumed: 0,
  });

  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);

  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePress = () => {
    showModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = foodList.filter((food) =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoodList(filteredList);
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    hideModal();
  };

  const handleCaloriesConsumedChange = (text) => {
    const caloriesConsumed = parseInt(text);
    setFoodDetails((prevDetails) => ({ ...prevDetails, caloriesConsumed }));
  };

  const handleSubmit = async () => {
    try {
      const { data: foodData, error: foodError } = await supabase
        .from('foodlist')
        .select('*')
        .eq('id', selectedFood.id)
        .single();
  
      if (foodError) {
        throw foodError;
      }
  
      const { data, error } = await supabase
        .from('foodlog')
        .insert([
          {
            foodname: selectedFood.name,
            consumedate: foodDetails.date,
            meal: foodDetails.meal,
            caloriesconsumed: parseInt(foodDetails.caloriesConsumed),
          },
        ]);
  
      if (error) {
        throw error;
      }
  
      console.log('Food details inserted successfully:', data);

      // Update total calories consumed
      setTotalCaloriesConsumed(totalCaloriesConsumed + parseInt(foodDetails.caloriesConsumed));
    } catch (error) {
      console.error('Error inserting food details:', error);
    }
  
    setFoodDetails({
      date: '',
      meal: '',
      caloriesConsumed: '',
    });
  };
  

  const handleChangeDate = (text) => {
    setFoodDetails((prevDetails) => ({ ...prevDetails, date: text }));
  };

  const handleChangeMeal = (text) => {
    setFoodDetails((prevDetails) => ({ ...prevDetails, meal: text }));
  };

  React.useEffect(() => {
    // Fetch food list from Supabase when component mounts
    const fetchFoodList = async () => {
      try {
        const { data, error } = await supabase.from('foodlist').select('*');
        if (error) {
          throw error;
        }
        setFoodList(data);
      } catch (error) {
        console.error('Error fetching food list:', error.message);
      }
    };

    fetchFoodList();
  }, []);

  return (
    <View style={styles.loggingcard}>
      <Text style={styles.loggingTitle}>Log Food Consumption</Text>
      <View style={styles.imageContainer}>
        <Image source={calories} style={styles.caloriesImg} />
        <Text style={styles.loggingSmallText}>{totalCaloriesConsumed} cal</Text>
      </View>
      <TouchableOpacity style={styles.button2} onPress={handlePress}>
        <Text style={styles.buttonText2}>Log</Text>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Food</Text>
          <TextInput
            label="Search"
            onChangeText={handleSearch}
            style={styles.searchBar}
            placeholder="Search for food items"
            placeholderTextColor="#999"
            value={searchQuery}
          />
          {searchQuery !== '' && (
            <ScrollView style={styles.foodListContainer}>
              {filteredFoodList.map((food) => (
                <TouchableOpacity key={food.id} onPress={() => handleSelectFood(food)} style={styles.foodItemContainer}>
                  <Text style={styles.foodItem}>{food.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </Modal>
        {selectedFood && (
          <Modal visible={!!selectedFood} onDismiss={() => setSelectedFood(null)} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Food Details</Text>
            {/* Input for Date */}
            <TextInput
              label="Date (YYYY-MM-DD)"
              value={foodDetails.date}
              onChangeText={handleChangeDate}
              style={styles.input}
              placeholder="YYYY-MM-DD"
            />
            {/* Input for Meal */}
            <TextInput
              label="Meal"
              value={foodDetails.meal}
              onChangeText={handleChangeMeal}
              style={styles.input}
              placeholder="Enter meal name"
            />
            {/* Input for Calories Consumed */}
            <TextInput
              label="Calories Consumed"
              value={foodDetails.caloriesConsumed}
              onChangeText={handleCaloriesConsumedChange}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter calories consumed"
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
      <Text style={styles.caloriesTitle}>Calories Consumed</Text>
      <View style={styles.caloriesCircle}>
        <Text style={styles.caloriesText}>1700</Text>
        <Text style={styles.caloriessmallText}>total</Text>
      </View>
    </View>
  );
};

const MealPlanCard = () => {
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
      style={styles.mealCard} // Apply gradient to the entire card
    >
    <View style={styles.mealPlanCard}>
        <Text style={styles.mealPlanTitle}>Today's meal plan</Text>
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

const UpcomingMeals = () => {
  const navigation = useNavigation();

  const handleSeeMorePress = () => {
    navigation.navigate('UpcomingMeals');
  };

  return (
    <View style={styles.UpcomingMeals}>
      <View style={styles.titleMealsContainer}>
        <Text style={styles.UpcomingMealsTitle}>Upcoming Meals</Text>
        <TouchableOpacity onPress={handleSeeMorePress}>
          <Text style={styles.seeMoreButton}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Meal1 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.meal1Container}>
      <View style={styles.cardContentMeal}>
        <Image source={Food} style={styles.foodImage} />
        <View>
          <Text style={styles.MealText}>Oatmeal</Text>
          <Text style={[styles.MealText2, styles.dateText]}>Today, 08:00am</Text>
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

const Meal2 = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.meal1Container}>
      <View style={styles.cardContentMeal}>
        <Image source={Food2} style={styles.foodImage} />
        <View>
          <Text style={styles.MealText}>Grilled Chicken Salad</Text>
          <Text style={[styles.MealText2, styles.dateText]}>Today, 12:00pm</Text>
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

const FoodCount = () => {
  return (
    <LinearGradient
      colors={['#92A3FD', '#9DCEFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.FoodCountStyle}
    >
      <View style={styles.cardContentFoodCount}>
        <Text style={styles.CountTitle}>Daily Food Count</Text>
        <View style={styles.countAndButtonContainer}>
          <TouchableOpacity style={styles.learnMoreButton2}>
            <Text style={styles.learnMoreText}>More Details</Text>
          </TouchableOpacity>
          <View style={styles.countContainer}>
            <Text style={styles.CountNumber}>3</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  welcomeStyles: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  // Diet Logging Card
  loggingcard: {
    backgroundColor: '#F3F6FD',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  loggingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  caloriesImg: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loggingSmallText: {
    fontSize: 18,
    color: '#666',
  },
  button2: {
    backgroundColor: '#FF6C65',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  buttonText2: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#F3F6FD',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  foodListContainer: {
    maxHeight: 200,
  },
  foodItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  foodItem: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#F3F6FD',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  // Calories Card
  caloriesCard: {
    backgroundColor: '#F3F6FD',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  caloriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  caloriesCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#92A3FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  caloriessmallText: {
    fontSize: 16,
    color: '#FFF',
  },

  // Meal Plan Card
  mealPlanCard: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Add space between title and button
    alignItems: 'center', // Align items vertically
  },

  mealPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  mealPlanText: {
    fontSize: 16,
  },

  mealCard:{
    width: 348,
    height: 80,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#1986EC', 
    marginVertical: 10,
    padding: 20,
    marginTop:-10,
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

  // Upcoming Meals
  UpcomingMeals: {
    backgroundColor: '#F3F6FD',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  titleMealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UpcomingMealsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    color: '#333',
  },

  // Meal Cards
  meal1Container: {
    backgroundColor: '#F3F6FD',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContentMeal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  MealText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  MealText2: {
    fontSize: 14,
    color: '#999',
  },
  dateText: {
    marginTop: 5,
  },

  // Food Count Card
  FoodCountStyle: {
    backgroundColor: '#F3F6FD',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContentFoodCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreButton2: {
    backgroundColor: '#FF6C65',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  learnMoreText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  countContainer: {
    backgroundColor: '#C58BF2',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  CountNumber: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DietTracker;
