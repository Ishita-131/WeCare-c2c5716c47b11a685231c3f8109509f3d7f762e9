// Auth.js
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { supabase } from './supabase';
import MoodTracking from './MoodTracking.js'; // Import MoodTracking component

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userID

  useEffect(() => {
    const initializeAuth = async () => {
      const user = supabase.auth.user();
      if (user) {
        const userId = user.id;
        console.log('UID of the logged-in user:', userId);
        setUserId(userId); // Set the userID state
      }
    };

    initializeAuth();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      navigation.navigate('SelectRole');
    } else {
      setUserId(user.id); // Set the userID state upon successful login
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Login" disabled={loading} onPress={signInWithEmail} />
      </View>
      {/* Pass userId to MoodTracking component */}
      {userId && <MoodTracking userId={userId} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
