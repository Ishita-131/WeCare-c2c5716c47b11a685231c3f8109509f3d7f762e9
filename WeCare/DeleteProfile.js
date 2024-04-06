// UserProfile.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase client instance

const UserProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    // Fetch user profiles from the database table
    const fetchUserProfiles = async () => {
      try {
        const { data, error } = await supabase.from('user_profiles').select('*');
        if (error) {
          console.error('Error fetching user profiles:', error.message);
        } else {
          console.log('User profiles fetched successfully:', data);
          setUserProfiles(data);
        }
      } catch (error) {
        console.error('Error fetching user profiles:', error.message);
      }
    };

    fetchUserProfiles();

    // Cleanup function
    return () => {
      // Any cleanup code
    };
  }, []);

  const deleteUserProfile = async (id, profile) => {
    try {
      console.log('Deleting profile:', profile);
      // Extract necessary fields for insertion into DeletedUserProfiles table
      const { id: profileId, name, surname, fdm_id } = profile;
      const deletedProfile = { id: profileId, name, surname, fdm_id };

      // Show confirmation dialog
      Alert.alert(
        'Delete User Profile',
        'Are you sure you want to delete this user profile?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                // Insert deleted user profile into the "DeletedUserProfiles" table
                const { error: insertError } = await supabase.from('DeletedUserProfiles').insert([deletedProfile]);
                if (insertError) {
                  console.error('Error inserting deleted user profile:', insertError.message);
                  return;
                }

                // Delete user profile from the database table
                const { error: deleteError } = await supabase.from('user_profiles').delete().eq('id', id);
                if (deleteError) {
                  console.error('Error deleting user profile:', deleteError.message);
                } else {
                  console.log('User profile deleted successfully');
                  // Remove the deleted user profile from the local state
                  setUserProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== id));
                }
              } catch (error) {
                console.error('Error deleting user profile:', error.message);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting user profile:', error.message);
    }
  };

  const renderUserProfile = ({ item, index }) => (
    <View>
      <View style={[styles.profileContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]}>
        <Text style={[styles.column, styles.boldText, { flex: 1 }]}> {item.id}</Text>
        <Text style={[styles.column, styles.boldText, { flex: 2 }]}> {item.name}</Text>
        <Text style={[styles.column, styles.boldText, { flex: 2 }]}> {item.surname}</Text>
        <Text style={[styles.column, styles.boldText, { flex: 2 }]}> {item.fdm_id}</Text>
      </View>
      <TouchableOpacity style={[styles.deleteButtonContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]} onPress={() => deleteUserProfile(item.id, item)}>
        <Text style={[styles.deleteButton, styles.boldText, { width: 70, marginLeft: 10 }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={[styles.columnHeader, styles.boldText, { flex: 1 }]}>ID</Text>
        <Text style={[styles.columnHeader, styles.boldText, { flex: 2 }]}>Name</Text>
        <Text style={[styles.columnHeader, styles.boldText, { flex: 3 }]}>Surname</Text>
        <Text style={[styles.columnHeader, styles.boldText, { flex: 4 }]}>FDM ID</Text>
      </View>
      <FlatList
        data={userProfiles}
        renderItem={renderUserProfile}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items in the center vertically
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10, // Increase vertical padding for better spacing
    paddingHorizontal: 5, // Add horizontal padding for better spacing
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: '#1986EC',
    color: '#fff',
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
  column: {
    paddingHorizontal: 2,
  },
  
  boldText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 7,
    borderRadius: 15,
    textAlign: 'center',
    color: 'red',
    overflow: 'hidden', // Ensure button text doesn't overflow
    minWidth: 200, // Set a minimum width to prevent shrinking
    justifyContent: 'center', // Vertically center the text
    fontSize: 16,
  },

  deleteButtonContainer: {
    marginBottom: 10, // Decrease marginBottom for better spacing
    alignItems: 'center',
    width: '100%', // Adjust the width to fill the container
  },

  lightBlueRow: {
    backgroundColor: '#EAF2FE',
  },
  darkBlueRow: {
    backgroundColor: '#C3D6F4',
  },
});

export default UserProfile;
