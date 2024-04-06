import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from './supabase'; // Import Supabase client

const NotesPage = () => {
    const [currentNote, setCurrentNote] = useState('');
    const [patientName, setPatientName] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data: notesData, error } = await supabase.from('notes').select('*');
            if (error) {
                console.error('Error fetching notes:', error.message);
            } else {
                setNotes(notesData);
            }
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };

    const saveNote = async () => {
        if (currentNote.trim() !== '' && patientName.trim() !== '') {
            try {
                const { data: newNote, error } = await supabase.from('notes').insert([
                    { note_text: currentNote, patient_name: patientName, note_date: new Date().toLocaleString() }
                ]);
                if (error) {
                    console.error('Error saving note:', error.message);
                } else {
                    if (newNote && newNote.length > 0) {
                        console.log('New note added:', newNote);
                        setNotes([...notes, newNote[0]]);
                        setCurrentNote('');
                        setPatientName('');
                    } else {
                        console.error('Error saving note: New note is null or empty.');
                    }
                }
            } catch (error) {
                console.error('Error saving note:', error.message);
            }
        }
    };

    const deleteNote = async (id) => {
        try {
            const { error } = await supabase.from('notes').delete().eq('id', id);
            if (error) {
                throw new Error('Error deleting note:', error.message);
            } else {
                setNotes(notes.filter(note => note.id !== id));
            }
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    };
    
    const confirmDeleteNote = (id) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Delete', onPress: () => deleteNote(id) }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Patient Name"
                    value={patientName}
                    onChangeText={setPatientName}
                />
                <TextInput
                    style={styles.input2}
                    placeholder="Write your note here..."
                    value={currentNote}
                    onChangeText={setCurrentNote}
                    multiline
                />
                <TouchableOpacity style={styles.addButton} onPress={saveNote}>
                    <Text style={styles.buttonText}>Add Note</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.notesContainer}>
                <Text style={styles.sectionTitle}>Notes History</Text>
                {notes.map((note, index) => (
                    <View key={index} style={styles.note}>
                        <Text style={styles.noteText}>{note.note_text}</Text>
                        <Text style={styles.noteInfo}>Patient: {note.patient_name}</Text>
                        <Text style={styles.noteInfo}>Date: {note.note_date}</Text>
                        <TouchableOpacity onPress={() => confirmDeleteNote(note.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        minHeight: 50,
    },

    input2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },

    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    notesContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    note: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    noteText: {
        fontSize: 16,
        marginBottom: 5,
    },
    noteInfo: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        color: 'red',
        textAlign: 'right',
        marginTop: 5,
    },
});

export default NotesPage;
