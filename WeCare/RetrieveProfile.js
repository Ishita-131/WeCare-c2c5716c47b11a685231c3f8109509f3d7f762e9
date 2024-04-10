import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, RefreshControl } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase client instance

const RetrieveProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    setRefreshing(true);
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
    setRefreshing(false);
  };

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

  const renderUserProfile = ({ item, index }) => (
    <View>
      <View style={[styles.profileContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]}>
        <Text style={[styles.column, { width: 50 }]}> {item.id}</Text>
        <Text style={[styles.column, { width: 100 }]}> {item.name}</Text>
        <Text style={[styles.column, { width: 100 }]}> {item.surname}</Text>
        <Text style={[styles.column, { width: 100 }]}> {item.fdm_id}</Text>
      </View>
      <TouchableOpacity style={[styles.retrieveButtonContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]} onPress={() => retrieveUserProfile(item.id, item)}>
        <Text style={[styles.actionButton, styles.boldText, { width: 70 }]}>Retrieve</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.columnHeader, { width: 60}]}>ID</Text>
        <Text style={[styles.columnHeader, { width: 100 }]}>Name</Text>
        <Text style={[styles.columnHeader, { width: 120 }]}>Surname</Text>
        <Text style={[styles.columnHeader, { width: 100}]}>FDM ID</Text>
      </View>
      <FlatList
        data={userProfiles}
        renderItem={renderUserProfile}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchUserProfiles} />} // Add RefreshControl to handle pull-to-refresh
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Align items in the center vertically
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10, // Increase vertical padding for better spacing
    paddingHorizontal: 5, // Add horizontal padding for better spacing
    width: '100%', // Ensure it takes up the whole width
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items in the center vertically
    justifyContent: 'space-between', // Spread items evenly
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
    paddingVertical:10,
  },
  column: {
    paddingHorizontal: 2,
    width:'100%',
  },
  actionButton: {
    padding: 7,
    borderRadius: 15,
    textAlign: 'center',
    color: 'green',
    overflow: 'hidden', // Ensure button text doesn't overflow
    minWidth: 200, // Set a minimum width to prevent shrinking
    justifyContent: 'center', // Vertically center the text
    fontSize: 16,
  },
  lightBlueRow: {
    backgroundColor: '#EAF2FE',
  },
  darkBlueRow: {
    backgroundColor: '#C3D6F4',
  },
  retrieveButtonContainer: {
    marginBottom: 10, // Decrease marginBottom for better spacing
    alignItems: 'center',
    width: '100%', // Adjust the width to fill the container
  },
  boldText: {
    fontWeight: 'bold',
  },
  refreshButton: {
    marginLeft: 'auto', // Push the button to the right
    padding: 10,
  },
  refreshButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default RetrieveProfile;
