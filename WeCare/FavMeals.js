import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Salmon from './assets/images/salmon.png';
import Pasta from './assets/images/pasta.png';

const FavMeals = () => {
    const navigation = useNavigation();
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.favoriteMeals}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.backButton}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.favoriteMealsTitle}>Favorite Meals</Text>
            </View>
            <MealCard name="Spaghetti Bolognese" image={Salmon} />
            <MealCard name="Grilled Salmon" image={Pasta} />
            <MealCard name="Pasta Carbonara" image={Pasta} />
            <MealCard name="Chicken Alfredo" image={Salmon} />
            <MealCard name="Shrimp Scampi" image={Pasta} />
            <MealCard name="Caesar Salad" image={Salmon} />
            <MealCard name="Beef Stroganoff" image={Pasta} />
            <MealCard name="Vegetable Stir Fry" image={Salmon} />
            <MealCard name="Honey Garlic Chicken" image={Pasta} />
            <MealCard name="Teriyaki Salmon" image={Salmon} />
            <MealCard name="Tofu Curry" image={Pasta} />
            <MealCard name="Mushroom Risotto" image={Salmon} />
            <MealCard name="Eggplant Parmesan" image={Pasta} />
            <MealCard name="Lemon Herb Chicken" image={Salmon} />
            <MealCard name="Sesame Ginger Beef" image={Pasta} />
            <MealCard name="Cajun Shrimp" image={Salmon} />
            <MealCard name="Pesto Pasta" image={Pasta} />
            <MealCard name="Spinach Artichoke Chicken" image={Salmon} />
            <MealCard name="Beef Tacos" image={Pasta} />
            <MealCard name="Chicken Quesadillas" image={Salmon} />
            <MealCard name="Vegetarian Pizza" image={Pasta} />
            <MealCard name="BBQ Ribs" image={Salmon} />
            <MealCard name="Hawaiian Poke Bowl" image={Pasta} />
            <MealCard name="Beef Burritos" image={Salmon} />
            <MealCard name="Caprese Salad" image={Pasta} />
            <MealCard name="Sweet and Sour Pork" image={Salmon} />
            <MealCard name="Miso Soup" image={Pasta} />
            <MealCard name="Lentil Soup" image={Salmon} />
            <MealCard name="Beef Pho" image={Pasta} />
            <MealCard name="Vegetable Curry" image={Salmon} />
            <MealCard name="Ratatouille" image={Pasta} />
            <MealCard name="Cheeseburger" image={Salmon} />
            <MealCard name="Club Sandwich" image={Pasta} />
            <MealCard name="Fish and Chips" image={Salmon} />
            <MealCard name="Chicken Fried Rice" image={Pasta} />
            <MealCard name="Beef Bulgogi" image={Salmon} />
            <MealCard name="Egg Fried Rice" image={Pasta} />
            <MealCard name="Pad Thai" image={Salmon} />
            <MealCard name="Chicken Shawarma" image={Pasta} />
          </View>
        </View>
      </ScrollView>
    );
  };

const MealCard = ({ name, image }) => {
    return (
      <View style={styles.mealCard}>
        <Image source={image} style={styles.mealImage} />
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>{name}</Text>
          {/* Add more details about the meal if needed */}
        </View>
        <TouchableOpacity style={styles.plusButtonContainer} onPress={() => { /* Add onPress functionality */ }}>
          <Text style={styles.plusButton}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 60,
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1986EC',
    marginLeft: 10,
  },
  favoriteMeals: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 85,
    marginBottom:20,
  },
  favoriteMealsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginRight:20,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
  },
  plusButton: {
    fontSize: 20,
    color: 'white',
    padding:10,
  },

  plusButtonContainer: {
    backgroundColor: '#1986EC',
    borderRadius: 30,
    padding: 3,
  },
});

export default FavMeals;
