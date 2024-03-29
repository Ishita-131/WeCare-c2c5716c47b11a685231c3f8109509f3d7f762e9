import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView, Button } from "react-native";

export default function MakeAppointments() {
    return (
        <SafeAreaView>
            <ListAmbassadors />
        </SafeAreaView>
    );
}

function ListAmbassadors() {
    const data = [
        { key: '1', text: 'Samson' }, 
        { key: '2', text: 'Bruno Mars' }, 
        { key: '3', text: 'James Bruv' }];

    const renderItem = ({ item }) => ( <>
        <Text>{item.text}</Text>
        <Press />
    </>
    );

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item , index) => item + index}
                renderItem={renderItem}
            />
        </View>
    );
}

function Press()  {
    return (<>
        <View>
            <Button
                title="Hello"
            />
        </View>
    </>)
}