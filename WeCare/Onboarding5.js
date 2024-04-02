import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Onboarding5 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./Frame.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Seek for Help</Text>
          <Text style={styles.subtitle}>
            Improve your quality of life with us, by seeking assistance for mental health, our ambassadors are here to provide you any help you need.
          </Text>
        </View>
        <TouchableOpacity style={styles.circularButton} onPress={handleNext}>
          <View style={styles.circularButtonInner}>
            <Text style={styles.arrow}>➔</Text>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7B6F72',
  },
  circularButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Onboarding5;
