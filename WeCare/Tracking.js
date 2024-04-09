import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import glass1 from './assets/images/glass1.png';
import boots1 from './assets/images/boots1.png';
import ProfileButton2 from './assets/images/ProfileButton2.png'; // Import the image
import ProgressImg from './assets/images/ProgressImg.png'; // Import the image
import BannerPie from './assets/images/BannerPie.png'; // Import the circular image


const Tracking = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.container2}>
          <TargetCard />
          <NotificationButton />
          <ProgressCard />
          <View style={styles.cardContainer}>
            <FitnessCard navigation={navigation} />
            <DietCard navigation={navigation} />
          </View>
          <BMICard />
        </View>
      </View>
    </ScrollView>
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

const NotificationButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('NotificationTemplate'); // Navigate to the NotificationInbox page
  };

  return (
    <TouchableOpacity style={styles.notificationButton} onPress={handlePress}>
      <Text style={styles.notificationButtonText}>Notifications</Text>
    </TouchableOpacity>
  );
};


const ProgressCard = () => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  return (
    <View>
      <LinearGradient
        colors={['#92A3FD', '#9DCEFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.progressCard}
      >
        <View style={styles.cardContent}>
          <Text style={styles.progressText}>Tip for tracking your fitness progress</Text>
          <TouchableOpacity style={styles.learnMoreButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <Image source={ProgressImg} style={styles.progressImage} />
      </LinearGradient>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalText}>
              Take a photo everday of your fitness progress, this is a good way to see your progress over time!
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

const FitnessCard = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('FitnessTracker');
  };

  return (
    <View style={styles.fitnesscard}>
      <Text style={styles.fitnessTitle}>Fitness Tracker</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go </Text>
      </TouchableOpacity>
    </View>
  );
};

const DietCard = ({ navigation }) => {
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

const BMICard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    // Validate height and weight inputs
    if (!height || !weight) {
      alert('Please enter both height and weight.');
      return;
    }

    // Convert height to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    // Show modal
    setModalVisible(true);
  };

  const handleViewMorePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setHeight(''); // Reset height input
    setWeight(''); // Reset weight input
    setBMI(null); // Reset BMI value
    setModalVisible(false); // Close the modal
  };

  return (
    <LinearGradient
      colors={['#92A3FD', '#9DCEFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.BMICard}
    >
      <View style={styles.cardContent}>
        <Text style={styles.BMIText}>Calculate your BMI - body mass index</Text>
        <TouchableOpacity style={styles.learnMoreButton} onPress={handleViewMorePress}>
          <Text style={styles.learnMoreText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Calculate BMI</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter height (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={text => setHeight(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={text => setWeight(text)}
            />
            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Calculate BMI</Text>
            </TouchableOpacity>
            {bmi && <Text style={styles.bmiText}>Your BMI: {bmi}</Text>}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image source={BannerPie} style={styles.BannerPie} />
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Set default background color to white
    paddingBottom:40,
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Set default background color to white
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    padding: 5,
  },

  profileButton: {
    width: 51.508,
    height: 51.508,
    flexShrink: 0,
    borderRadius: 51.508,
    backgroundColor: '#9DCEFF',
    marginRight: 15,
  },

  welcomeStyles: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 40,
    textAlign: 'left',
  },

  targetTitle: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 21, // React Native does not require units for lineHeight
  },

  waterTitle: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginLeft: 20,
  },

  measurement: {
    color: 'black',
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
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: 'center',
    marginLeft: 20,
  },

  stepCount: {
    color: 'black',
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
    height: 146,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    marginVertical: 5, // Reduced margin
    padding: 15, // Reduced padding
  },

  cardContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Evenly distribute items along the main axis
    width: 348, // Set width to match the target card's width
  },

  notificationButton: {
    width: 348,
    height: 47.735,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust spacing as needed
  },
  notificationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  progressCard: {
    width: 348,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  learnMoreButton: {
    backgroundColor: '#1986EC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: 150,
    marginLeft: -5,
    marginTop: 10,
  },
  learnMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  fitnesscard: {
    width: 162, // Adjusted width to fit next to fitness card
    height: 140,
    flexShrink: 0,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    padding: 20, // Reduced padding
  },

  dietcard: {
    width: 162, // Adjusted width to fit next to fitness card
    height: 140,
    flexShrink: 0,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    padding: 20, // Reduced padding
  },

  fitnessTitle: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21, // React Native does not require units for lineHeight
    textAlign: "center",
  },

  dietTitle: {
    color: 'black',
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

  BMICard: {
    width: 348,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically in the middle
    padding: 20,
    marginBottom: 40,
  },

  BMICardText: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },

  BMIText: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },

  BannerPie: {
    width: 120, // Increase the width
    height: 120, // Increase the height
    marginLeft: 'auto', // Push the image to the right
    resizeMode: 'contain',
  },

  button: {
    width: 91,
    height: 57,
    borderRadius: 99,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
    // Add box-shadow style
    shadowColor: 'rgba(149, 173, 254, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    shadowOpacity: 1,
    elevation: 5, // Android elevation for shadow effect
    marginTop: 15,
    marginLeft: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  learnMoreButton: {
    backgroundColor: '#1986EC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: 150,
    marginLeft: -5,
    marginTop: 10,
  },
  learnMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  calculateButton: {
    backgroundColor: '#1986EC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bmiText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Tracking;
