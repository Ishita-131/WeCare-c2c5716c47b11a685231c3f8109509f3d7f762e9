import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MentalHealth = () => {
  const navigation = useNavigation();

  const goToBreathing = () => {
    navigation.navigate('BreathingScreen');
  };

  return (<>
  <View style={styles.containermain}>
    {/* Breathing */}
      <View style={styles.container}>
        
        <View style={styles.widgetContainer}>
          <TouchableOpacity style={styles.widgetButton} onPress={goToBreathing}>
            <Text style={styles.widgetText}>Deep Breathing</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Resource */}
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <TouchableOpacity style={styles.widgetButton} onPress={() => navigation.navigate('MentalResource')}>
            <Text style={styles.widgetText}>Mental Health Resource</Text>
          </TouchableOpacity>
        </View>
      </View>
  </View>

    </>
  );
}

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '60%',
  },
  widgetContainer: {
    position: 'absolute',
    marginTop: 20 ,
    marginLeft: 20,
    padding: 10,
    width: 'auto',
    height: '30%',
    borderRadius: 30,
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
