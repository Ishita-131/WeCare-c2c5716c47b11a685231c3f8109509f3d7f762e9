import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase configuration

const Chatbot = () => {
  const [fdmId, setFdmId] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello, how can I help you? You can type in 'report bug' to report a technical issue.", sender: "bot" }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [bugModalVisible, setBugModalVisible] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (userMessage.trim().toLowerCase() !== 'report bug') {
      Alert.alert('Invalid Option', 'Please type in "report bug" to report a technical issue.');
      return;
    }

    setBugModalVisible(true);
  };

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
        setBugModalVisible(false);
      }
    } catch (error) {
      console.error('Error reporting technical issue:', error.message);
      Alert.alert('Error', 'Failed to report the technical issue. Please try again later.');
    }
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
            multiline
            placeholder="Enter here"
            placeholderTextColor="#888"
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
              <Text style={styles.label}>FDM ID</Text>
              <TextInput
                style={styles.input2}
                value={fdmId}
                onChangeText={setFdmId}
                placeholder="Enter FDM ID"
              />

              <Text style={styles.label}>Issue Title</Text>
              <TextInput
                style={styles.input2}
                value={issueTitle}
                onChangeText={setIssueTitle}
                placeholder="Enter Issue Title"
              />

              <Text style={styles.label}>Issue Description</Text>
              <TextInput
                style={[styles.input2, { height: 100 }]}
                value={issueDescription}
                onChangeText={setIssueDescription}
                multiline
                placeholder="Describe Issue here"
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setBugModalVisible(false)} />
                <Button title="Send" onPress={handleSubmit} />
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
    backgroundColor: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatBox: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  botMessageContainer: {
    marginRight: 100,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  botMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#aed581',
    color: 'black',
    padding: 10,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 100,
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    height: 100,
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
    padding: 20,
    width: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default Chatbot;
