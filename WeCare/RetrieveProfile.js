// RetrieveProfile.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase client instance

const RetrieveProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    // Fetch user profiles from the database table
    const fetchUserProfiles = async () => {
      try {
        const { data, error } = await supabase.from('DeletedUserProfiles').select('*');
        if (error) {
          console.error('Error fetching deleted user profiles:', error.message);
        } else {
          console.log('Deleted user profiles fetched successfully:', data);
          setUserProfiles(data);
        }
      } catch (error) {
        console.error('Error fetching deleted user profiles:', error.message);
      }
    };

    fetchUserProfiles();

    // Cleanup function
    return () => {
      // Any cleanup code
    };
  }, []);

  const retrieveUserProfile = async (id, profile) => {
    try {
      console.log('Retrieving profile:', profile);
      
      // Delete user profile from the "DeletedUserProfiles" table
      const { error: deleteError } = await supabase.from('DeletedUserProfiles').delete().eq('id', id);
      if (deleteError) {
        console.error('Error deleting deleted user profile:', deleteError.message);
      } else {
        console.log('Deleted user profile deleted successfully');
        // Remove the retrieved user profile from the local state
        setUserProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== id));

        // Insert retrieved user profile into the "user_profiles" table
        const { error: insertError } = await supabase.from('user_profiles').insert([profile]);
        if (insertError) {
          console.error('Error inserting retrieved user profile:', insertError.message);
        } else {
          console.log('User profile retrieved successfully');
          // Show success message
          Alert.alert('Retrieve User Profile', 'This User Profile has been retrieved');
        }
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error.message);
    }
  };

  const renderUserProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <Text style={styles.column}>{item.id}</Text>
      <Text style={styles.column}>{item.name}</Text>
      <Text style={styles.column}>{item.surname}</Text>
      <Text style={styles.column}>{item.fdm_id}</Text>
      <TouchableOpacity onPress={() => retrieveUserProfile(item.id, item)}>
        <Text style={styles.retrieveButton}>Retrieve</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={[styles.columnHeader, { flex: 10 }]}>ID</Text>
          <Text style={[styles.columnHeader, { flex: 10 }]}>  Name</Text>
          <Text style={[styles.columnHeader, { flex: 10 }]}>  Surname</Text>
          <Text style={[styles.columnHeader, { flex: 10 }]}>  FDM ID</Text>
          <Text style={[styles.columnHeader, { flex: 10 }]}>  Actions</Text>
        </View>
        <FlatList
          data={userProfiles}
          renderItem={renderUserProfile}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  column: {
    flex: 1,
  },
  retrieveButton: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default RetrieveProfile;
