import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase'; // Import your Supabase configuration

const Chatbot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello, You can report bugs here. Please type in 'Report bug'", sender: "bot" }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [bugModalVisible, setBugModalVisible] = useState(false);
  const [bugDescription, setBugDescription] = useState('');

  const scrollViewRef = useRef();

  useEffect(() => {
    // Scroll to bottom when new message is added
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    const userNewMessage = { id: messages.length + 1, content: userMessage, sender: "user" };
    setMessages([...messages, userNewMessage]);

    setTimeout(() => {
      let newMessage;
       if (userMessage.toLowerCase() === 'report bug') {
        setBugModalVisible(true);
        setUserMessage('');
        return;
      } else {
        newMessage = { id: messages.length + 2, content: "Sorry, please type in 'report bug'", sender: "bot" };
      }

      setMessages([...messages, userNewMessage, newMessage]);
      setUserMessage('');

      // Close bug report modal and clear bug description
      setBugModalVisible(false);
      setBugDescription('');
    }, 100);
  };



  const sendBugReport = async () => {
    if (bugDescription.trim() === '') {
      Alert.alert('Error', 'Please enter a bug description.');
      return;
    }

    try {
      // Send bug report to Supabase
      const { data, error } = await supabase.from('Bugs').insert([{ bug: bugDescription }]);
      if (error) {
        throw error;
      }
      Alert.alert('Bug Reported', `Your bug report: "${bugDescription}" has been sent.`);
      setBugDescription('');
      setBugModalVisible(false); // Close bug report modal
    } catch (error) {
      console.error('Error reporting bug:', error.message);
      Alert.alert('Error', 'Failed to report the bug. Please try again later.');
    }
  };

  const openBugReportModal = () => {
    // Open bug report modal
    setBugModalVisible(true);
    setBugDescription(''); // Clear bug description when opening modal
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatBox}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(message => (
            <View key={message.id} style={message.sender === 'bot' ? styles.botMessageContainer : styles.userMessageContainer}>
              <Text style={message.sender === 'bot' ? styles.botMessage : styles.userMessage}>
                {message.content}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter here"
            placeholderTextColor="black"
            value={userMessage}
            onChangeText={text => setUserMessage(text)}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={bugModalVisible}
          onRequestClose={() => {
            setBugModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Report Bug</Text>
              <TextInput
                style={[styles.input, { color: 'black' }]}
                placeholder="Enter bug description..."
                value={bugDescription}
                onChangeText={text => setBugDescription(text)}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setBugModalVisible(false)} />
                <Button title="Send" onPress={sendBugReport} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  chatContainer: {
    flex: 1,
  },
  chatBox: {
    paddingTop: 10,
    paddingBottom: 100, // Add padding bottom to ensure the last message is visible above the input area
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  botMessage: {
    backgroundColor: '#724ae8',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#aed581',
    color: 'black',
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add justifyContent to center the input horizontally
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center', // Align the input horizontally to the center
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    color:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Chatbot;
