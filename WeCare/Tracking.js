import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tracking = () => {
  return (
    <View style={styles.container}>
      <Text>Tracking Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tracking;
