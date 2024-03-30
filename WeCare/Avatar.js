import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Avatar = ({ imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.profilePicWrapper} onPress={onPress}>
      <View style={styles.profilePicBorder}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profilePic} />
        ) : (
          <Image source={require('./user.png')} style={styles.profilePicPlaceholder} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profilePicWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePicBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profilePicPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
});

export default Avatar;
