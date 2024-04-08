// MoodFactors.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const MoodFactors = ({ onSelectFactors }) => {
  const [selectedFactors, setSelectedFactors] = useState([]);

  const factors = [
    'Family',
    'Work',
    'Education',
    'Finances',
    'Relationship',
    'Work Colleagues',
    'Deadlines',
    // Add more factors as needed
  ];

  const toggleFactor = (factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((item) => item !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>What's affecting your mood</Text>
      <View style={styles.factorContainer}>
        {factors.map((factor, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.factor,
              selectedFactors.includes(factor) && styles.selectedFactor,
            ]}
            onPress={() => toggleFactor(factor)}
          >
            <Text style={styles.factorText}>{factor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit" onPress={() => onSelectFactors(selectedFactors)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  factorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  factor: {
    backgroundColor: '#b3d9ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedFactor: {
    backgroundColor: '#80b3ff',
  },
  factorText: {
    fontSize: 16,
  },
});

export default MoodFactors;
