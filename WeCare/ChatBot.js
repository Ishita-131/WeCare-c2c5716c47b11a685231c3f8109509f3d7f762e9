import React, { useState } from 'react';
import { View, Button, TextInput, Alert, StyleSheet, ImageBackground, Text } from 'react-native';
import { supabase } from './supabase'; // Import the supabase client instance

const ChatBot = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [botMessage] = useState('How can I help you?');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setUserInput('');
    if (option === 'mental_issue') {
      setShowContactInfo(true);
      setShowInput(false);
    } else if (option === 'report_bug') {
      setShowInput(true);
      setShowContactInfo(false);
    } else {
      setShowContactInfo(false);
      setShowInput(false);
    }
  };
  
  

  const handleSendMessage = async () => {
    if (selectedOption === 'report_bug') {
      if (bugDescription.trim() === '') {
        Alert.alert('Error', 'Please enter a bug description.');
      } else {
        try {
          // Send the bug report message to Supabase
          const { data, error } = await supabase.from('Bugs').insert([{ bug: bugDescription }]);
          if (error) {
            throw error;
          }
          Alert.alert('Bug Reported', `Your bug report: "${bugDescription}" has been sent.`);
          setBugDescription('');
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
    <ImageBackground source={require('./assets/images/chatbot.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={[styles.botMessageContainer]}>
          <Text style={styles.botMessage}>{botMessage}</Text>
          <View style={styles.optionsContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Mental issue" onPress={() => handleOptionSelect('mental_issue')} color="black" />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Report Bug" onPress={() => handleOptionSelect('report_bug')} color="black" />
            </View>
          </View>
        </View>
      </View>

      {showInput && (
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter bug description"
              onChangeText={text => setBugDescription(text)}
              value={bugDescription}
            />
            </View>
            <Button
              title="Send"
              onPress={handleSendMessage}
              style={styles.sendButton}
              color="black"
            />
        </View>
      )}

      <View style={[showContactInfo && styles.showContactInfo]}>
        {showContactInfo && (
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactInfoText}>Contactable psychologist:</Text>
            <Text style={styles.contactInfo}>Name:Dr. James Brown</Text>
            <Text style={styles.contactInfo}>Phone: 4407831404554</Text>
            <Text style={styles.contactInfo}>Email: jamesbrown@help.com</Text>
          </View>
        )}
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  botMessageContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white', // White background
    borderRadius: 20, // Oval shape
    padding: 10, // Padding inside the oval
  },
  botMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000', // Black text color
  },
  optionsContainer: {
    flexDirection: 'row', // Display buttons horizontally
    marginTop: 10, // Adjust spacing
    justifyContent: 'center', // Center the buttons horizontally
  },
  buttonWrapper: {
    borderRadius: 90,
    overflow: 'hidden',
    backgroundColor: '#ADD8E6',
    marginBottom: 10,
    marginHorizontal: 5, // Add horizontal margin between buttons
  },
  inputContainer: {
    marginBottom: 430,
    padding: 0,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 50,
    margin: 20,
    backgroundColor: '#fff', // white background
    color: '#000', // black text color
    borderRadius: 10, // border radius
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contactInfoContainer: {
    marginTop: 1,
    position: 'absolute',
    top: '50%',
    left: '5%',
    transform: [{ translateY: -590 }],
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  contactInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 14,
    color: 'black',
  },
  showContactInfo: {
    bottom: 20,
  },
  sendButton: {
    marginTop: 10, // Spacing from the text input
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
  }
  

});

export default ChatBot;
