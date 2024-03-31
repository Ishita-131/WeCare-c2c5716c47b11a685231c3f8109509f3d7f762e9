import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase'; // Import supabase object

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [fdmID, setFdmID] = useState('');
  const [userType, setUserType] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [genderModalVisible, setGenderModalVisible] = useState(false); // State to control gender modal visibility
  const [userTypeModalVisible, setUserTypeModalVisible] = useState(false); // State to control user type modal visibility

  const genders = ['Male', 'Female', 'Other'];
  const userTypes = ['User', 'Ambassador', 'Admin'];

  const submitForm = async () => {
    // Insert user data to Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        { name, surname, gender, age, fdm_id: fdmID, user_type: userType  }
      ]);

    if (error) {
      console.error('Error inserting user data:', error.message);
    } else {
      console.log('User data inserted successfully:', data);
    }

      // Navigate based on user type
    if (userType === 'User' || userType === 'Ambassador') {
      navigation.navigate('Dashboard');
    } else if (userType === 'Admin') {
      navigation.navigate('AdminDashboard');
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.greyBackground}>
        <TouchableOpacity style={styles.iconContainer}>
        </TouchableOpacity>
      </View>
      <View style={styles.profilePicContainer}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
        <TouchableOpacity style={styles.profilePicWrapper} onPress={displayProfilePic}>
          <View style={styles.profilePicBorder}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <Text style={styles.profilePicPlaceholder}>+</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
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

          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSurname}
            value={surname}
            placeholder="Enter your last name"
            keyboardType="words"
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF', // Set default background color to white
  },
  profilePicContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    fontSize: 40,
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  column: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderColor: '#A9A9A9',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#171F1D',
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  greyBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '79%', // Adjust height to make it 1/4 of the page
    backgroundColor: '#6A7382',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default ProfileForm;
