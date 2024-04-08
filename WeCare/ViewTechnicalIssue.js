import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, Button, Modal, RefreshControl } from 'react-native';
import { supabase } from './supabase'; // Import your Supabase client instance
import { Picker } from '@react-native-picker/picker'; // Import Picker from '@react-native-picker/picker'

const ViewTechnicalIssue = () => {
  const [technicalIssues, setTechnicalIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTechnicalIssues();
  }, []);

  const fetchTechnicalIssues = async () => {
    setRefreshing(true);
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
    setRefreshing(false);
  };

  const updateTechnicalIssue = async () => {
    try {
      // Update the status of the technical issue in the database
      const { error } = await supabase.from('TechnicalIssue').update({ Status: selectedStatus }).eq('id', selectedIssue.id);
      if (error) {
        console.error('Error updating technical issue:', error.message);
      } else {
        console.log('Technical issue updated successfully');
        setModalVisible(false); // Close the modal after updating
        // Update the selected issue with the new status
        setSelectedIssue({ ...selectedIssue, Status: selectedStatus });
      }
    } catch (error) {
      console.error('Error updating technical issue:', error.message);
    }
  };

  const handleStatusPress = (issue) => {
    setSelectedIssue(issue);
    setSelectedStatus(issue.Status); // Set the initial status value
    setModalVisible(true);
  };

  const renderTechnicalIssue = ({ item, index }) => (
    <View style={[index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]}>
      <View style={[styles.profileContainer, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]}>
        <Text style={[styles.column, { width: 80 }]}>{item.fdm_id}</Text>
        <Text style={[styles.column, styles.issueTitle, { width: 105 }]}>{item["Issue Title"]}</Text>
        <Text style={[styles.column, styles.issueDescription, { width: 195 }]}>{item["Issue Description"]}</Text>
      </View>
      <TouchableOpacity style={[styles.statusButton, index % 2 === 0 ? styles.lightBlueRow : styles.darkBlueRow]} onPress={() => handleStatusPress(item)}>
        <Text style={styles.statusText}>{selectedIssue && selectedIssue.id === item.id ? selectedStatus : item.Status}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchTechnicalIssues} />}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={[styles.columnHeader, { width: 80 }]}>FDM ID</Text>
          <Text style={[styles.columnHeader, { width: 105 }]}>Title</Text>
          <Text style={[styles.columnHeader, { width: 195 }]}>Issue Description</Text>
        </View>
        <FlatList
          data={technicalIssues}
          renderItem={renderTechnicalIssue}
          keyExtractor={(item) => item.id.toString()}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select Status</Text>
              <Picker
                selectedValue={selectedStatus}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
              >
                <Picker.Item label="Unsolved" value="Unsolved" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Solved" value="Solved" />
              </Picker>
              <View style={[styles.updateContainer]}>
                <Button title="Update Status" onPress={updateTechnicalIssue} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5, // Increase padding for better spacing
    marginLeft:5,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to flex-start
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10, // Increase padding for better spacing
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
  issueTitle: {
    flex: 2,
    textAlign: 'left',
  },
  issueDescription: {
    flex: 2,
    textAlign: 'left',
  },
  statusButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    color: 'blue',
  },
  lightBlueRow: {
    backgroundColor: '#EAF2FE',
    marginBottom: 5, // Add margin between rows for separation
  },
  darkBlueRow: {
    backgroundColor: '#C3D6F4',
    marginBottom: 5, // Add margin between rows for separation
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  statusText: {
    color: 'blue',
    fontWeight:'700',
    paddingBottom:15,
  },
  updateContainer:{
    marginTop:120,
  },
});

export default ViewTechnicalIssue;
