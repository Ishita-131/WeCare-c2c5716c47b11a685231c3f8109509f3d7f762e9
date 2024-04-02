import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SelectRole = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNext = () => {
    // Determine the dashboard based on the selected role
    const dashboardScreen = selectedRole === 'admin' ? 'AdminDashboard' : 
    selectedRole === 'ambassador' ? 'AmbassadorDashboard' : 'Dashboard';
    // Navigate to the respective dashboard
    navigation.navigate(dashboardScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
<<<<<<< HEAD
        <ImageBackground
          source={require('./Image.png')}
=======
        {/* <ImageBackground
          source={require('/Users/ishitakaramchandani/WeCare-c2c5716c47b11a685231c3f8109509f3d7f762e9-5/WeCare/Group 10303.png')}
>>>>>>> d2a83e4 (Diet tracker)
          style={styles.backgroundImage}
        /> */}
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Select Your Role</Text>
        <Text style={styles.text}>It will help us know more about you.</Text>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'admin' && styles.selectedRole]}
          onPress={() => setSelectedRole('admin')}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'ambassador' && styles.selectedRole]}
          onPress={() => setSelectedRole('ambassador')}
        >
          <Text style={styles.roleText}>Ambassador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'user' && styles.selectedRole]}
          onPress={() => setSelectedRole('user')}
        >
          <Text style={styles.roleText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Default white background
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    marginBottom: 80,
    width: '100%',
    height: '99%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7B6F72',
    marginBottom: 10,
  },
  roleButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: 315,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#7FFF00',
  },
  roleText: {
    fontSize: 18,
  },
  nextButton: {
    marginTop: 20, // Adjust spacing as needed
    backgroundColor: '#7FFF00',
    padding: 20,
    width: 315,
    height: 60,
    borderRadius: 99,
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SelectRole;
