import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { supabase } from './supabase.js';
import MonthlyCalendarScreen from './Components/MentalHealth /MonthlyCalendarScreen';
import MoodFactors from './MoodFactors.js';


const MoodTracking = ({ userId }) => {
  const [selectedMood, setSelectedMood] = useState('happy'); // Initialize to default mood
  const [thoughts, setThoughts] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);

  // Define the moodIcons array
  const moodIcons = [
    { mood: 'happy', icon: '😊' },
    { mood: 'sad', icon: '😢' },
    { mood: 'angry', icon: '😡' },
    { mood: 'anxious', icon: '😰' },
    // Add more moods and corresponding icons as needed
  ];

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (thoughts) {
      try {
        // Submit mood entry to backend database
        const { data, error } = await supabase.from('mood_entries').insert([
          { userId, mood: selectedMood, notes: thoughts, factors: selectedFactors.join(', ') }
        ]);
        if (error) {
          throw error;
        }
        console.log('Mood entry submitted successfully:', data);
        // Reset state after submission
        setSelectedMood('happy'); // Reset mood to default
        setThoughts('');
        setSelectedFactors([]);
        // Dismiss keyboard
        Keyboard.dismiss();
        // Show confirmation alert
        Alert.alert('Mood Entry Submitted', 'Your mood entry has been submitted successfully.');
      } catch (error) {
        console.error('Error submitting mood entry:', error.message);
        Alert.alert('Error', 'Failed to submit mood entry. Please try again.');
      }
    } else {
      alert('Please write your thoughts.');
    }
  };

  // Define dismissKeyboard function
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Track your monthly mood</Text>
        <MoodFactors onSelectFactors={setSelectedFactors} />
        <View style={styles.moodIconsContainer}>
          {moodIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.moodIcon, selectedMood === item.mood && styles.selectedMoodIcon]}
              onPress={() => handleMoodSelection(item.mood)}
              accessibilityLabel={`Select ${item.mood} mood`}
            >
              <Text style={styles.moodText}>{item.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.thoughtsContainer}>
          <Text style={styles.subHeading}>Write about Today</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Share your thoughts..."
            value={thoughts}
            onChangeText={(text) => setThoughts(text)}
            accessibilityLabel="Write your thoughts here"
          />
          <Button title="Submit" onPress={handleSubmit} accessibilityLabel="Submit mood entry" />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <MonthlyCalendarScreen />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    marginTop: 50,
    backgroundColor: '#ffffff', // White background
  },
  container: {
    flex: 0,
    backgroundColor: 'white', // Make entire screen background white
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moodIconsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moodIcon: {
    backgroundColor: '#b3d9ff', // Sky Blue
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 10,
  },
  selectedMoodIcon: {
    backgroundColor: '#0059b3', // Navy Blue
  },
  moodText: {
    fontSize: 20,
  },
  thoughtsContainer: {
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
});

export default MoodTracking;
