import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase'; // Import supabase object

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [fdmID, setFdmID] = useState('');
  const [userID, setUserID] = useState('');
  const [userType, setUserType] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  // Initialize Supabase (You can remove this initialization as it's already done in supabase.js)
  // const supabaseUrl = 'https://jfougwzmuhrmwybyhepi.supabase.co';
  // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb3Vnd3ptdWhybXd5YnloZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMjMzNzQsImV4cCI6MjAyNjU5OTM3NH0.eB-l3dCXqe14uqcniDj8ByMOj9djZN5quE4H3RMHq-o';
  // const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  const submitForm = async () => {
    // Insert user data to Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        { name, email }
      ]);

    if (error) {
      console.error('Error inserting user data:', error.message);
    } else {
      console.log('User data inserted successfully:', data);
    }
  };

  const displayProfilePic = async () => {
    // Allow user to pick an image from their device
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter your name"
            autoCapitalize="words"
            required
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            required
          />

          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGender}
            value={gender}
            placeholder="Enter your gender"
            required
          />

          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="Enter your age"
            keyboardType="numeric"
            required
          />

          <Text style={styles.label}>FDM Employee ID:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFdmID}
            value={fdmID}
            placeholder="Enter your FDM Employee ID"
            required
          />

          <Text style={styles.label}>User ID:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUserID}
            value={userID}
            placeholder="Enter your User ID"
            required
          />

          <Text style={styles.label}>User Type:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUserType}
            value={userType}
            placeholder="Enter your User Type"
            required
          />

<TouchableOpacity style={styles.button} onPress={submitForm}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Profile Picture:</Text>
          <TouchableOpacity style={styles.input} onPress={displayProfilePic}>
            <Text>Choose Profile Picture</Text>
          </TouchableOpacity>
          {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePic} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profilePic: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default ProfileForm;
