import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MentalHealth = () => {
  const navigation = useNavigation();

  const goToBreathing = () => {
    navigation.navigate('Breathing');
  };

  return (
    <View style={styles.container}>
      <View style={styles.widgetContainer}>
        <TouchableOpacity style={styles.widgetButton} onPress={goToBreathing}>
          <Text style={styles.widgetText}>Deep Breathing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  widgetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '66.666%',
    height: '100%',
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetText: {
    color: '#1986EC',
    fontWeight: 'bold',
  },
});

export default MentalHealth;
