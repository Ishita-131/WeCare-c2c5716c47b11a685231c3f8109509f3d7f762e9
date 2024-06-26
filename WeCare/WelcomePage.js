import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/images/Logo2.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Let's get started!</Text>
          <Text style={styles.secondaryText}>Login or Sign Up below</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: -40,
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
    backgroundColor: '#1986EC',
    paddingHorizontal: 120,
    height: 50,
    paddingVertical: 15,
    borderRadius: 32,
    marginBottom: 15,
  },

  button2: {
    backgroundColor: '#1986EC',
    paddingHorizontal: 110,
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
