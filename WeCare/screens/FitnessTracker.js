import * as React from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FitnessTracker = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <WorkoutCard />
      </View>
    </PaperProvider>
  );
};

const WorkoutCard = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const handlePress = () => {
    showModal(); // Show the modal when the button is pressed
  };

  return (
    <View style={styles.workoutCard}>
      <View style={styles.cardContent}>
        <Text style={styles.targetTitle}>Daily Workout Schedule</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCard: {
    width: 348,
    height: 80,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 118, 151, 0.2)', // Use rgba to set opacity of the background color
    marginVertical: 10,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Add space between title and button
    alignItems: 'center', // Align items vertically
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#637697',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF', // Change to white background
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Change text color to dark
  },
  workoutDetails: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Change text color to dark
  },
  closeButton: {
    backgroundColor: '#637697',
    marginTop: 10,
  },
});

export default FitnessTracker;
