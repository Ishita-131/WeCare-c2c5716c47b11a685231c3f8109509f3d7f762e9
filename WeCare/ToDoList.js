import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const ToDoList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Function to handle adding a new task
    const handleAddTask = () => {
        if (task.trim() === '') {
            return; // Prevent adding empty tasks
        }
        setTasks([...tasks, task]); // Add new task to the list
        setTask(''); // Clear input field after adding task
    };

    // Function to handle removing a task
    const handleRemoveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1); // Remove task at specified index
        setTasks(updatedTasks); // Update tasks list
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter task"
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.taskItem}
                        onPress={() => handleRemoveTask(index)}
                    >
                        <Text style={styles.taskText}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
    },
});

export default ToDoList;
