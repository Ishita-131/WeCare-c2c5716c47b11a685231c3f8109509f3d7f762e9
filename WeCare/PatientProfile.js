// Import necessary dependencies and components

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image,StyleSheet } from 'react-native';
import { supabase } from './supabase';

// Import profile placeholder image
import profilePlaceholder from './assets/images/Profile Button.png';

const PatientProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    // Fetch user profiles from Supabase when the component mounts
    const fetchUserProfiles = async () => {
      try {
        const { data, error } = await supabase.from('user_profiles').select('fdm_id, name, gender, age');
        if (error) {
          throw error;
        }
        setUserProfiles(data);
      } catch (error) {
        console.error('Error fetching user profiles:', error.message);
      }
    };

    fetchUserProfiles();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>User Profiles</Text>
        {userProfiles.map((profile, index) => (
          <View key={index} style={[styles.profileContainer, index !== 0 && styles.profileSeparator]}>
            <Image source={profilePlaceholder} style={styles.profilePic} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}><Text style={styles.boldText}>Name:</Text> {profile.name}</Text>
              <Text style={styles.profileText}><Text style={styles.boldText}>Gender:</Text> {profile.gender}</Text>
              <Text style={styles.profileText}><Text style={styles.boldText}>Age:</Text> {profile.age}</Text>
              <Text style={styles.profileText}><Text style={styles.boldText}>FDM ID:</Text> {profile.fdm_id}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Define styles
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF', // Set background color of the scrollView to white
  },
  container: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Set text color to dark
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F5F5F5', // Add background color for each profile
    padding: 15, // Add padding for each profile
    borderRadius: 10, // Add border radius to make profiles rounded
  },
  profileSeparator: {
    marginTop: 10, // Add top margin to separate profiles
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666', // Set text color to a slightly darker shade
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default PatientProfile;
