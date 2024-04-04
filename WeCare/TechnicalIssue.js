import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { supabase } from './supabase'; // Import your Supabase client instance

const TechnicalIssue = () => {
  const [fdmId, setFdmId] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = async () => {
    if (!fdmId || !issueTitle || !issueDescription) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      // Insert the technical issue into the database
      const { data, error } = await supabase.from('TechnicalIssue').insert([
        {
          fdm_id: fdmId,
          "Issue Title": issueTitle,
          "Issue Description": issueDescription,
          "Date of Issue": new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error reporting technical issue:', error.message);
        Alert.alert('Error', 'Failed to report the technical issue. Please try again later.');
      } else {
        console.log('Technical issue reported successfully:', data);
        Alert.alert('Success', 'Technical issue reported successfully.');
        // Clear the form fields after successful submission
        setFdmId('');
        setIssueTitle('');
        setIssueDescription('');
      }
    } catch (error) {
      console.error('Error reporting technical issue:', error.message);
      Alert.alert('Error', 'Failed to report the technical issue. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>FDM ID</Text>
      <TextInput
        style={styles.input}
        value={fdmId}
        onChangeText={setFdmId}
        placeholder="Enter FDM ID"
      />

      <Text style={styles.label}>Issue Title</Text>
      <TextInput
        style={styles.input}
        value={issueTitle}
        onChangeText={setIssueTitle}
        placeholder="Enter Issue Title"
      />

      <Text style={styles.label}>Issue Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={issueDescription}
        onChangeText={setIssueDescription}
        multiline
        placeholder="Describe Issue here"
      />

      {/* Replace default Button component with TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
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

});

export default TechnicalIssue;
