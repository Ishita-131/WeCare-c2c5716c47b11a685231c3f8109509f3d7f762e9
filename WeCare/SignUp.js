import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input, Button } from 'react-native-elements'; // Import Button from react-native-elements for consistency
import { supabase } from './supabase';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUp() {
    if (password !== repeatPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Please check your inbox for email verification!');
      navigation.navigate('Login');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Name"
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Your Name"
          autoCapitalize={'none'}
        />
      </View>
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
      <View style={styles.verticallySpaced}>
        <Input
          label="Repeat Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setRepeatPassword(text)}
          value={repeatPassword}
          secureTextEntry={true}
          placeholder="Repeat Password"
          autoCapitalize={'none'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  button: {
    backgroundColor: '#1986EC',
    paddingHorizontal: 120,
    height: 50,
    paddingVertical: 15,
    borderRadius: 32,
    marginBottom: 15,
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
