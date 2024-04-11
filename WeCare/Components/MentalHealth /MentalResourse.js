import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import axios from 'axios';
import HTML from 'react-native-render-html';
import { Button } from "react-native";
import { RefreshControl } from "react-native";

export default function ResourceMental() {
    const [rData, setData] = useState([]);
    const [press, setPress] = useState('');
    const [display, setDisplay] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState('');

    const fetchNHS = async () => {
        try {
            setRefreshing(true);
            setLoading(true);
            const response = await axios.get(`https://api.nhs.uk/mental-health/${state}/${press}`, {
                headers: {
                    'subscription-key': '0a9115489aa94a62a3c502222a2977f3'
                }
            });
            setData(response.data.mainEntityOfPage);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const handleButtonPress = (path) => {
        setPress(path);
        setDisplay(!display);
        fetchNHS();
    };

    const ViewState = () => {
        if (state === 'self-help/guides-tools-and-activities') {
            return (
                <>
                    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('five-steps-to-mental-wellbeing')}>
                        <Text style={styles.buttonText}>5 Steps to Mental Wellbeing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('exercise-for-depression')}>
                        <Text style={styles.buttonText}>Exercise For Depression</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('breathing-exercises-for-stress')}>
                        <Text style={styles.buttonText}>Breathing Exercises For Stress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('tips-to-reduce-stress')}>
                        <Text style={styles.buttonText}>Tips to Reduce Stress</Text>
                    </TouchableOpacity>
                </>
            );
        } else if (state === 'advice-for-life-situations-and-events') {
            return (
                <Text style={styles.text}>HI</Text>
            );
        }
    };

    useEffect(() => {
        fetchNHS();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchNHS} />
                }
            >
                <View style={styles.section}>
                    <Text style={styles.heading}>NHS Advice</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setState('self-help/guides-tools-and-activities')}>
                        <Text style={styles.buttonText}>Self Help</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <ViewState />
                </View>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <View style={{ display: display }}>
                        {rData.map((item, index) => (
                            <View key={index} style={styles.contentContainer}>
                                {item.hasPart && item.hasPart.map((part, idx) => (
                                    <React.Fragment key={idx}>
                                        <Text style={styles.subheading}>{part.headline}</Text>
                                        <View style={styles.contentPadding}>
                                            <HTML source={{ html: part.text }} contentWidth={Dimensions.get('window').width} />
                                        </View>
                                    </React.Fragment>
                                ))}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    section: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign:"center",
    },
    subheading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    contentPadding: {
        paddingVertical: 10,
    },
});
