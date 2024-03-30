import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { supabase } from "../supabase";

function AskAppointment({ setAccept }) {
    const {accept} = UseAccept();

    async function makeAppointment() {
        try {
            await supabase
                .from('ambassadors')
                .insert([
                    { user_name: "adam", makeAppointment: { accept } },
                ]);
            Alert.alert("Appointment is Made");

        } catch (error) {
            console.error("Error making appointment:", error.message);
            Alert.alert("Error making appointment. Please try again later.");
        }
    }

    return (
        <Button
            title="Make Appointment"
            onPress={() => {
                setAccept(true);
                makeAppointment();
            }}
        />
    );
}

export default function MakeAppointments() {
    return (
        <SafeAreaView>
            <ListAmbassadors />
        </SafeAreaView>
    );
}

function ListAmbassadors() {
    const { accept, setAccept } = UseAccept();

    const data = [
        { key: '1', text: 'Samson' },
        { key: '2', text: 'Bruno Mars' },
        { key: '3', text: 'James Bruv' }
    ];

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.text}</Text>
            <AskAppointment setAccept={setAccept} />
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
            />
        </View>
    );
}
