import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('./Logo.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Let's get started!</Text>
          <Text style={styles.secondaryText}>Login or Sign Up below</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#221f1f',
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  secondaryText: {
    color: 'rgba(34,31,31,0.60)',
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A7382',
    paddingHorizontal: 120,
    height: 50,
    paddingVertical: 15,
    borderRadius: 32,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WelcomePage;
