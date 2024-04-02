import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity and Text
import { Input } from 'react-native-elements';
import { supabase } from './supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      navigation.navigate('SelectRole');

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
      <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
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
});
