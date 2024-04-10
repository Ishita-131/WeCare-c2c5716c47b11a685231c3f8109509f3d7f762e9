import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MentalHealth = () => {
  const navigation = useNavigation();

  const goToBreathing = () => {
    navigation.navigate('BreathingScreen');
  };

  const moodTracking = () => {
    navigation.navigate('MoodTracking');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.widgetsContainer}>
        {/* Breathing */}
        <TouchableOpacity style={styles.widgetButton} onPress={goToBreathing}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Deep Breathing</Text>
          </View>
        </TouchableOpacity>
        
        {/* Resource */}
        <TouchableOpacity style={styles.widgetButton} onPress={() => navigation.navigate('MentalResource')}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Mental Health Resource</Text>
          </View>
        </TouchableOpacity>

        {/* Mood Tracking */}
        <TouchableOpacity style={styles.widgetButton} onPress={moodTracking}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Mood Tracking</Text>
          </View>
        </TouchableOpacity>

        {/* Add more widgets here */}
        <TouchableOpacity style={styles.widgetButton} onPress={() => navigation.navigate('Support')}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30, // Add top padding to push content below the title
  },
  widgetsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  widgetButton: {
    width: '48%', // Adjust width to fit two widgets with spacing
    aspectRatio: 1,
    borderRadius: 22,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add margin to create spacing between widgets
  },
  widgetInner: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetText: {
    color: '#1986EC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MentalHealth;
