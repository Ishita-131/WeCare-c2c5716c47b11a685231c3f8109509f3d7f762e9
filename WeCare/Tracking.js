import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import glass1 from './assets/images/glass1.png';
import boots1 from './assets/images/boots1.png';

const Tracking = () => {
  return (
    <View style={styles.container}>
      <TargetCard />
      <View style={styles.cardContainer}>
        <FitnessCard />
        <DietCard />
      </View>
    </View>
  );
};

const TargetCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.targetTitle}>Today's Target</Text>
      <Card2 />
      <Card3 />
    </View>
  );
};

const Card2 = () => {
  return (
    <View style={styles.card2}>
      <Image source={glass1} style={styles.waterImg} />
      <Text style={styles.measurement}>2L</Text>
      <Text style={styles.waterTitle}>Water Intake</Text>
    </View>
  );
};

const Card3 = () => {
  return (
    <View style={styles.card3}>
      <Image source={boots1} style={styles.stepImg} />
      <Text style={styles.stepCount}>2400</Text>
      <Text style={styles.stepTitle}>Steps Today</Text>
    </View>
  );
};

const FitnessCard = () => {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('FitnessTracker');
      };
  return (
    <View style={styles.fitnesscard}>
      <Text style={styles.fitnessTitle}>Fitness Tracker</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const DietCard = () => {

    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('DietTracker');
      };

  return (
    <View style={styles.dietcard}>
      <Text style={styles.dietTitle}>Diet Tracker</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
  },

  targetTitle: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
  },

  waterTitle: {
    color: '#637697',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginLeft: 20,
  },

  measurement: {
    color: '#637697',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginRight: 40,
    marginTop: -40,
  },

  stepTitle: {
    color: '#637697',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginLeft: 20,
  },

  stepCount: {
    color: '#637697',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginTop: -40,
    marginRight: 20,
  },

  waterImg: {
    marginTop: 10,
  },

  stepImg: {
    marginTop: 17,
  },

  card: {
    width: 348,
    height: 140,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
  },

  cardContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Evenly distribute items along the main axis
    width: 348, // Set width to match the target card's width
  },

  fitnesscard: {
    width: 162, // Adjusted width to fit next to diet card
    height: 140,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
  },

  dietcard: {
    width: 162, // Adjusted width to fit next to fitness card
    height: 140,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: '#6A7382', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
  },

  fitnessTitle: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: "center",
  },

  dietTitle: {
    color: 'white',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: "center",
  },

  card2: {
    width: 143.619,
    height: 70,
    flexShrink: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 10,
    marginTop: 10,
  },

  card3: {
    width: 143.619,
    height: 70,
    flexShrink: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 10,
    marginTop: -70,
    marginLeft: 160,
  },

  button: {
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
    marginLeft:15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tracking;
