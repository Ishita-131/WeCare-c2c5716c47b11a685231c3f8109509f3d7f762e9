import * as React from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'; // Import FlatList
import calories from './assets/images/calories.png';
import clock from './assets/images/clock.png';
import { supabase } from './supabase'; // Import supabase object

const LoggingCard = () => {
  const [visible, setVisible] = React.useState(false);
  const [exerciseModalVisible, setExerciseModalVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [exerciseList, setExerciseList] = React.useState([]); // State to hold exercise list
  const [selectedExercise, setSelectedExercise] = React.useState(null); // State to hold selected exercise
  const [exerciseDetails, setExerciseDetails] = React.useState({
    date: '',
    duration: '',
    caloriesBurned: '',
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showExerciseModal = () => setExerciseModalVisible(true);
  const hideExerciseModal = () => setExerciseModalVisible(false);

  const handlePress = () => {
    showModal(); // Show the modal when the button is pressed
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    // Fetch exercise list from Supabase based on the search query
    const { data, error } = await supabase
      .from('exerciseslist')
      .select('*')
      .ilike('name', `%${query}%`); // Use ilike filter for case-insensitive search
    if (error) {
      console.error('Error fetching exercise list:', error.message);
      return;
    }
    setExerciseList(data || []);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise); // Set the selected exercise
    hideModal(); // Hide the modal
    showExerciseModal(); // Show the exercise details modal
  };

  const handleSubmit = () => {
    // You can handle the submission here, for now, let's log the exercise details
    console.log('Exercise details:', exerciseDetails);
  };

  const handleChangeDate = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, date: text }));
  };

  const handleChangeDuration = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, duration: text }));
  };

  const handleChangeCaloriesBurned = (text) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, caloriesBurned: text }));
  };

  return (
    <View style={styles.loggingcard}>
      <Text style={styles.loggingTitle}>Log Exercise</Text>
      <View style={styles.imageContainer}>
        <Image source={calories} style={styles.caloriesImg} />
        <Text style={styles.loggingSmallText}>0 cal</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={clock} style={styles.clockImg} />
        <Text style={styles.loggingSmallText}>00:00 hr</Text>
      </View>
      <TouchableOpacity style={styles.button2} onPress={handlePress}>
        <Text style={styles.buttonText2}>Log</Text>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Exercise</Text>
          <TextInput
            label="Search"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchBar}
            placeholder="Search for exercises"
            placeholderTextColor="#999"
          />
          <FlatList // Use FlatList to render the exercise list
            data={exerciseList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectExercise(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Modal>
        <Modal visible={exerciseModalVisible} onDismiss={hideExerciseModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Log Exercise Details</Text>
          {/* Input for Date */}
          <TextInput
            label="Date (YYYY-MM-DD)"
            value={exerciseDetails.date}
            onChangeText={handleChangeDate}
            style={styles.input}
            placeholder="YYYY-MM-DD"
          />
          {/* Input for Duration */}
          <TextInput
            label="Duration (minutes)"
            value={exerciseDetails.duration}
            onChangeText={handleChangeDuration}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter duration in minutes"
          />
          {/* Input for Calories Burned */}
          <TextInput
            label="Calories Burned"
            value={exerciseDetails.caloriesBurned}
            onChangeText={handleChangeCaloriesBurned}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter calories burned"
          />
          {/* Submit button */}
          <Button onPress={handleSubmit}>Submit</Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default LoggingCard;
