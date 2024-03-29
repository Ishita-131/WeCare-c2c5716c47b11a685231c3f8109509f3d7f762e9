import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
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
    const [accept, setAccept]  = useState(false)

    const data = [
        { key: '1', text: 'Samson' }, 
        { key: '2', text: 'Bruno Mars' }, 
        { key: '3', text: 'James Bruv' }];

    function AskAppointment()  {

        return (<>
            <View>
                <Button
                    title="Hello"
                    onPress={()=> {
                        setAccept(true)
                        Alert.alert("Appointment is Made")
                    }}
                />
            </View>
        </>)
    }

    const renderItem = ({ item }) => ( <>
        <Text>{item.text}</Text>
        <AskAppointment />
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

