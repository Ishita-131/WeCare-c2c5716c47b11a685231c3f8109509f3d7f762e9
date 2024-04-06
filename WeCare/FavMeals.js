import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Salmon from './assets/images/salmon.png';
import Pasta from './assets/images/pasta.png';
import Carbonara from './assets/images/Carbonara.png';
import Shrimp from './assets/images/shrimp.png';
import ChickenSalad from './assets/images/chickenSalad.png';
import StirFry from './assets/images/stirfry.png';
import HoneyChicken from './assets/images/HoneyChicken.png';
import Salad from './assets/images/salad.png';

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
            <MealCard name="Spaghetti Bolognese" image={Pasta} />
            <MealCard name="Grilled Salmon" image={Salmon} />
            <MealCard name="Pasta Carbonara" image={Carbonara} />
            <MealCard name="Shrimp Scampi" image={Shrimp} />
            <MealCard name="Caesar Salad" image={ChickenSalad} />
            <MealCard name="Vegetable Stir Fry" image={StirFry} />
            <MealCard name="Honey Garlic Chicken" image={HoneyChicken} />
            <MealCard name="Lemon Herb Chicken" image={HoneyChicken} />
            <MealCard name="Cajun Shrimp" image={Shrimp} />
            <MealCard name="Pesto Pasta" image={Pasta} />
            <MealCard name="Greek Salad" image={Salad} />
            <MealCard name="Spinach Artichoke Chicken" image={HoneyChicken} />
            <MealCard name="Caprese Salad" image={Salad} />
            <MealCard name="Chicken Shawarma" image={HoneyChicken} />
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
