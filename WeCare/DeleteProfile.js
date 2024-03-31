// UserProfile.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
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

  const renderUserProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <Text style={[styles.column, { flex: 2 }]}> {item.id}</Text>
      <Text style={[styles.column, { flex: 2 }]}> {item.name}</Text>
      <Text style={[styles.column, { flex: 2 }]}> {item.surname}</Text>
      <Text style={[styles.column, { flex: 2 }]}> {item.fdm_id}</Text>
      <TouchableOpacity onPress={() => deleteUserProfile(item.id, item)}>
        <Text style={[styles.deleteButton, { flex: 1 }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
        <Text style={[styles.columnHeader, { flex: 1 }]}>ID</Text>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Name</Text>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Surname</Text>
        <Text style={[styles.columnHeader, { flex: 2 }]}>FDM ID</Text>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Actions</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 1
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  column: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default UserProfile;
