import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb3Vnd3ptdWhybXd5YnloZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMjMzNzQsImV4cCI6MjAyNjU5OTM3NH0.eB-l3dCXqe14uqcniDj8ByMOj9djZN5quE4H3RMHq-o'
const supabase = createClient('https://jfougwzmuhrmwybyhepi.supabase.co', supabaseAnonKey)

{/** Main Function */}
export default function MakeAppointments() {
    return (
        <SafeAreaView>
            <ListAmbassadors />
        </SafeAreaView>
    );
}



{/** gets ambassadors info */}
function ListAmbassadors() {
    const { setAccept, ambassadors , setAmbassadors } = UseAccept();
    
    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user_name}</Text>
            <AskAppointment setAccept={setAccept} item={item.user_name}/>
        </View>
    );

    const getAmbassadors = async () => {
        let {data , error } = await supabase.from('ambassadors').select('*')
        setAmbassadors(data) 
    }
    useEffect(() => {
        getAmbassadors();
    }, [])

    return (
        <View>
            <FlatList
                data={ambassadors}
                keyExtractor={(item) => parseInt(item.id)}
                renderItem={renderItem}
            />
        </View>
    );
}

{/** Asking for Appointments */}
function AskAppointment({ setAccept , item}) {
    const {accept, ambassadors} = UseAccept();

    const userEmail = async () => await supabase.auth 

    async function makeAppointment() {
        try {
            setAccept(true)
            const {error} = await supabase
            .from('Appointments')
            .insert([
                {ambassador_name: item, makeAppointment: Boolean({accept}), user: userEmail.email},
            ])
            .select();
            Alert.alert("Appointment is Made");
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (
        <Button
            title="Make Appointment"
            onPress={() => {
                makeAppointment();
            }}
        />
    );
}