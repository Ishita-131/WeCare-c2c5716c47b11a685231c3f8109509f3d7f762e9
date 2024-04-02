import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Onboarding1 = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to Onboarding2
    navigation.navigate('Onboarding2');
  };

  return (
    <LinearGradient
    colors={['#92A3FD', '#9DCEFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>WeCare</Text>
        <Text style={styles.subtitle}>Enhancing the wellbeing of FDM employees</Text>
      </View>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Add some horizontal padding for better spacing
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36, // Increase font size for better emphasis
    color:  '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 2, // Add letter spacing for a more stylish look
  },
  subtitle: {
    fontSize: 20, // Increase font size for better readability
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 24, // Add line height for better spacing between lines
  },
  getStartedButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20, // Reduce the bottom margin for better spacing
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase the button text for consistency
  },
});


export default Onboarding1;
