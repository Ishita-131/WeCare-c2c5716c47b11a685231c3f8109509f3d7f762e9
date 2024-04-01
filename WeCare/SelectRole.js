// SelectRole.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
      <Text style={styles.heading}>Select Your Role</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: 'blue', // Example styling for selected role
  },
  roleText: {
    fontSize: 18,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectRole;
