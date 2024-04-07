// MoodEntryDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodEntryDetails = ({ route }) => {
  const { date } = route.params;

  // Fetch mood entry details for the selected date from the backend
  // Replace this with actual backend integration code

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Entry Details</Text>
      <Text style={styles.date}>Date: {date}</Text>
      {/* Display mood entry details here */}
      {/* Replace the below text with actual mood entry details */}
      <Text style={styles.details}>Mood: Happy</Text>
      <Text style={styles.details}>Notes: Today was a great day!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MoodEntryDetails;
