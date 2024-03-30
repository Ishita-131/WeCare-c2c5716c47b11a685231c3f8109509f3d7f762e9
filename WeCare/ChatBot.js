import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { supabase } from './supabase'; // Import the supabase client instance

const ChatBot = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Clear previous user input when selecting a new option
    setUserInput('');
  };

  const handleSendMessage = async () => {
    if (selectedOption === 'report_bug') {
      if (userInput.trim() === '') {
        Alert.alert('Error', 'Please enter a bug description.');
      } else {
        try {
          // Send the bug report message to Supabase
          const { data, error } = await supabase.from('Bugs').insert([{ bug: userInput }]);
          if (error) {
            throw error;
          }
          Alert.alert('Bug Reported', `Your bug report: "${userInput}" has been sent.`);
        } catch (error) {
          console.error('Error reporting bug:', error.message);
          Alert.alert('Error', 'Failed to report the bug. Please try again later.');
        }
      }
    } else {
      Alert.alert('No Option Selected', 'Please select an option before sending your message.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Button title="Mental issue" onPress={() => Alert.alert(
        'Contactable Psychologist',
        'Please contact Dr. James Brown at jamesbrown@help.comr or call 4407831404554 for assistance.'
      )} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button title="Report Bug" onPress={() => handleOptionSelect('report_bug')} />
      </View>
      {selectedOption === 'report_bug' && (
        <View style={{ marginBottom: 20 }}>
          <TextInput
            placeholder="Type your bug report here..."
            value={userInput}
            onChangeText={setUserInput}
            multiline
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          <Button title="Send" onPress={handleSendMessage} />
        </View>
      )}
    </View>
  );
};

export default ChatBot;
