import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Image } from 'react-native';
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
  const [genderModalVisible, setGenderModalVisible] = useState(false); // State to control gender modal visibility
  const [userTypeModalVisible, setUserTypeModalVisible] = useState(false); // State to control user type modal visibility

  const genders = ['Male', 'Female', 'Other'];
  const userTypes = ['User', 'Ambassador', 'Admin'];

  const submitForm = async () => {
    // Insert user data to Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        { name, email, gender, age, fdmID, userID, userType }
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
          <TouchableOpacity style={styles.input} onPress={() => setGenderModalVisible(true)}>
            <Text>{gender || 'Select Gender'}</Text>
          </TouchableOpacity>
          {/* Modal for gender selection */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={genderModalVisible}
            onRequestClose={() => {
              setGenderModalVisible(!genderModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {genders.map((item, index) => (
                  <Pressable
                    key={index}
                    style={[styles.option, { backgroundColor: gender === item ? '#ccc' : '#fff' }]}
                    onPress={() => {
                      setGender(item);
                      setGenderModalVisible(!genderModalVisible);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Modal>

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
          <TouchableOpacity style={styles.input} onPress={() => setUserTypeModalVisible(true)}>
            <Text>{userType || 'Select User Type'}</Text>
          </TouchableOpacity>
          {/* Modal for user type selection */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={userTypeModalVisible}
            onRequestClose={() => {
              setUserTypeModalVisible(!userTypeModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {userTypes.map((item, index) => (
                  <Pressable
                    key={index}
                    style={[styles.option, { backgroundColor: userType === item ? '#ccc' : '#fff' }]}
                    onPress={() => {
                      setUserType(item);
                      setUserTypeModalVisible(!userTypeModalVisible);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfileForm;
