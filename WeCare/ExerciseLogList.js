import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { supabase } from './supabase'; // Import your Supabase client instance

const ExerciseLogList = () => {
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchExerciseLogs();
  }, []);

  const fetchExerciseLogs = async () => {
    setRefreshing(true);
        try {
            const { data, error } = await supabase
              .from('exerciselog')
              .select('*')
              .order('exercisedate', { ascending:false }); // Sort by exercisedate in ascending order
      if (error) {
        console.error('Error fetching exercise logs:', error.message);
      } else {
        console.log('Exercise logs fetched successfully:', data);
        setExerciseLogs(data);
      }
    } catch (error) {
      console.error('Error fetching exercise logs:', error.message);
    }
    setRefreshing(false);
  };

  const renderExerciseLogItem = ({ item }) => (
    <View style={styles.exerciseLogContainer}>
      <Text style={styles.boldText}>Exercise: {item.exercisename}</Text>
      <Text>Date: {new Date(item.exercisedate).toDateString()}</Text>
      <Text>Duration: {item.durationminutes} minutes</Text>
      <Text>Calories Burned: {item.caloriesburned}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exerciseLogs}
        renderItem={renderExerciseLogItem}
        keyExtractor={(item) => item.exerciseid.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchExerciseLogs} />} // Add RefreshControl to handle pull-to-refresh
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  exerciseLogContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ExerciseLogList;
