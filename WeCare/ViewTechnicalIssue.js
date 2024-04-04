import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, Button } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase client instance
import { Picker } from '@react-native-picker/picker'; // Import Picker from '@react-native-picker/picker'

const ViewTechnicalIssue = () => {
  const [technicalIssues, setTechnicalIssues] = useState([]);

  useEffect(() => {
    // Fetch technical issues from the database table
    const fetchTechnicalIssues = async () => {
      try {
        const { data, error } = await supabase.from('TechnicalIssue').select('*');
        if (error) {
          console.error('Error fetching technical issues:', error.message);
        } else {
          console.log('Technical issues fetched successfully:', data);
          setTechnicalIssues(data);
        }
      } catch (error) {
        console.error('Error fetching technical issues:', error.message);
      }
    };

    fetchTechnicalIssues();

    // Cleanup function
    return () => {
      // Any cleanup code
    };
  }, []);

  const updateTechnicalIssue = async (id, status) => {
    try {
      // Update the status of the technical issue in the database
      const { error } = await supabase.from('TechnicalIssue').update({ Status: status }).eq('id', id);
      if (error) {
        console.error('Error updating technical issue:', error.message);
      } else {
        console.log('Technical issue updated successfully');
      }
    } catch (error) {
      console.error('Error updating technical issue:', error.message);
    }
  };

  const renderTechnicalIssue = ({ item, index }) => (
    <View style={[styles.profileContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]}>
      <Text style={[styles.column, { width: 60 }]}>{item.id}</Text>
      <Text style={[styles.column, { width: 60 }]}>{item.fdm_id}</Text>
      <Text style={[styles.column, styles.issueTitle, { width: 100 }]}>{item["Issue Title"]}</Text>
      <Text style={[styles.column, styles.issueDescription, { width: 250 }]}>{item["Issue Description"]}</Text>
      <Picker
        selectedValue={item.Status}
        style={[styles.statusPicker, { width: 80 }]}
        onValueChange={(itemValue) => updateTechnicalIssue(item.id, itemValue)}>
        <Picker.Item label="Unsolved" value="Unsolved" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Solved" value="Solved" />
      </Picker>
    </View>
  );

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={[styles.columnHeader, { width: 60  }]}>ID</Text>
          <Text style={[styles.columnHeader, { width: 60  }]}>FDM ID</Text>
          <Text style={[styles.columnHeader, { width: 100 }]}>Issue Title</Text>
          <Text style={[styles.columnHeader, { width: 250 }]}>Issue Description</Text>
          <Text style={[styles.columnHeader, { width: 80  }]}>Status</Text>
        </View>
        <FlatList
          data={technicalIssues}
          renderItem={renderTechnicalIssue}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button title="Update Changes" onPress={() => Alert.alert('Update Changes', 'Changes updated successfully')} />
      </View>
    </ScrollView>
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
      alignItems: 'flex-start', // Align items to flex-start
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 7,
    },
    columnHeader: {
      fontWeight: 'bold',
      textAlign: 'left', // Align text to start from the left
      backgroundColor: '#1986EC', // Heading background color
      color: '#fff', // Heading text color
      textTransform: 'uppercase', // Convert text to uppercase
      paddingHorizontal: 5, // Add padding for better spacing
    },
    column: {
      flex: 5,
      paddingHorizontal: 10, // Add some padding to columns for better spacing
    },
    issueTitle: {
      flex: 2, // Adjusted width for Issue Title
      textAlign: 'left', // Align text to start from the left
    },
    issueDescription: {
      flex: 2, // Adjusted width for Issue Description
      textAlign: 'left', // Align text to start from the left
    },
    statusPicker: {
      height: 50, // Add height to Picker component to avoid warnings
    },
    lightBlueRow: {
      backgroundColor: '#EAF2FE', // Light blue background for rows
    },
    darkBlueRow: {
      backgroundColor: '#C3D6F4', // Dark blue background for rows
    },
  });
  
  
  

export default ViewTechnicalIssue;
