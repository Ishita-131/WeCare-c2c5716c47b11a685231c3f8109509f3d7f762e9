import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const BreathingScreen = () => {
    const navigation = useNavigation();
  
    const goBreathing = () => {
      navigation.navigate('Breathing');
    };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Frame-2.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Guiding Your Journey to Inner Peace</Text>
      <Text style={styles.description}>Embark on a Meditative Breathing Session for Stress Relief and Clarity of Mind</Text>
      <TouchableOpacity style={styles.button}onPress={goBreathing}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Text style={styles.buttonArrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 70,
    marginHorizontal: 20,
    width: 335,
    height: 396,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    color: '#666',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1986EC',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonArrow: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});


export default BreathingScreen;
