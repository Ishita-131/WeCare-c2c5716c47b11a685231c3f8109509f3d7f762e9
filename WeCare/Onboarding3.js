import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Onboarding3 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('Onboarding4');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./Group.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Get Burn</Text>
          <Text style={styles.subtitle}>
          Let's keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever.
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

export default Onboarding3;
