import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
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
    const [state, setState] = useState('')

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
    }

    const handleButtonPress = (path) => {
        setPress(path);
        setDisplay(!display);
        fetchNHS();
    };

    const ViewState = () => {
        if (state === 'self-help/guides-tools-and-activities') {
            return (<>
                <Button
                    title="5 steps to mental wellbeing"
                    onPress={() => handleButtonPress('five-steps-to-mental-wellbeing')}
                />

                <Button
                    title="Exercise For Depression"
                    onPress={() => handleButtonPress('exercise-for-depression')}
                />

                <Button
                    title="breathing-exercises-for-stress"
                    onPress={() => handleButtonPress('breathing-exercises-for-stress')}
                />

                <Button
                    title="tips-to-reduce-stress"
                    onPress={() => handleButtonPress('tips-to-reduce-stress')}
                />
            </>)
            }

            else if (state === 'advice-for-life-situations-and-events') {
                return (
                    <Text> HI </Text>
                )
            }
    }

    useEffect(() => {
        fetchNHS();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchNHS} />
                }
            >
                
                    <View>
                        <Button title="Advices For Life and situations " onPress={() => {
                            setState('advice-for-life-situations-and-events')
                        }} />

                        <Button title="Self Help" onPress={() => {
                            setState('self-help/guides-tools-and-activities')
                        }} />
                    </View>
                    
                <View>
                    <ViewState />
                </View>
                

                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={{ display: display }}>
                        {rData.map((item, index) => (
                            <View key={index}>
                                {item.hasPart && item.hasPart.map((part, idx) => (
                                    <React.Fragment key={idx}>
                                        <Text>{part.headline}</Text>
                                        <HTML source={{ html: part.text }} />
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
    // Your styles here
});
