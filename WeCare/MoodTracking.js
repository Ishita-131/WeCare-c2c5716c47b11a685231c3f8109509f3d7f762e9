import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { supabase } from './supabase.js';
import { BarChart } from 'react-native-chart-kit';

const MoodTracking = ({ userId }) => {
  const [selectedMood, setSelectedMood] = useState('happy');
  const [thoughts, setThoughts] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [moodData, setMoodData] = useState([]);

  const moodIcons = [
    { mood: 'happy', icon: '😊' },
    { mood: 'sad', icon: '😢' },
    { mood: 'angry', icon: '😡' },
    { mood: 'anxious', icon: '😰' },
  ];

  const factors = [
    'Family',
    'Work',
    'Education',
    'Finances',
    'Relationship',
    'Hobbies',
    'Work Colleagues',
    'Deadlines',
    'Exercise',
    'Weather',
    'Sleep',
    'Health',
  ];

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const { data, error } = await supabase.from('mood_entries').select('*');
      if (error) {
        throw error;
      }
      
      const moodCounts = moodIcons.map(icon => {
        const count = data.filter(entry => entry.mood === icon.mood).length;
        return { mood: icon.mood, count };
      });
      
      const totalCount = moodCounts.reduce((total, mood) => total + mood.count, 0);
      
      const averageMoodData = moodCounts.map(mood => ({
        mood: mood.mood,
        count: totalCount ? (mood.count / totalCount) * 100 : 0, // Convert count to percentage
      }));
      
      const existingMoodData = moodData.map(item => ({
        mood: item.mood,
        count: item.count,
      }));

      const combinedMoodData = averageMoodData.map(avgMood => {
        const existingMood = existingMoodData.find(item => item.mood === avgMood.mood);
        return {
          mood: avgMood.mood,
          count: existingMood ? (avgMood.count + existingMood.count) / 2 : avgMood.count,
        };
      });

      setMoodData(combinedMoodData);
    } catch (error) {
      console.error('Error fetching mood data:', error.message);
    }
  };

  const toggleFactor = (factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((item) => item !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (thoughts) {
      try {
        const { data, error } = await supabase.from('mood_entries').insert([
          { userid: userId, mood: selectedMood, notes: thoughts, factors: selectedFactors.join(', ') }
        ]);
        if (error) {
          throw error;
        }
        console.log('Mood entry submitted successfully:', data);
        setSelectedMood('happy');
        setThoughts('');
        setSelectedFactors([]);
        Keyboard.dismiss();
        Alert.alert('Mood Entry Submitted', 'Your mood entry has been submitted successfully.');
        fetchMoodData(); // Fetch data again after submission
      } catch (error) {
        console.error('Error submitting mood entry:', error.message);
        Alert.alert('Error', 'Failed to submit mood entry. Please try again.');
      }
    } else {
      alert('Please write your thoughts.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Track your monthly mood</Text>
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
        <View style={styles.factorContainer}>
          <Text style={styles.subtitle}>What's affecting your mood</Text>
          <View style={styles.factorContainer}>
            {factors.map((factor, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.factor,
                  selectedFactors.includes(factor) && styles.selectedFactor,
                ]}
                onPress={() => toggleFactor(factor)}
              >
                <Text style={styles.factorText}>{factor}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
        <Text style={styles.subtitle}>View your monthly average</Text>
        <BarChart
          style={{ marginBottom: 20 }}
          data={{
            labels: moodData.map(item => item.mood),
            datasets: [
              {
                data: moodData.map(item => item.count),
                colors: [
                  (opacity = 1) => `rgba(0, 92, 190, ${opacity})`, // Blue
                  (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, // Orange
                  (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Purple
                  (opacity = 1) => `rgba(173, 216, 230, ${opacity})`, // Sky Blue
                ],
              },
            ],
          }}
          width={300}
          height={200}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>
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
  factorContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  factor: {
    backgroundColor: '#b3d9ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedFactor: {
    backgroundColor: '#80b3ff',
  },
  factorText: {
    fontSize: 16,
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
