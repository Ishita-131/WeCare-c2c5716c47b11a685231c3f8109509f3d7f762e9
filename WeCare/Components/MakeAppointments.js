import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb3Vnd3ptdWhybXd5YnloZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMjMzNzQsImV4cCI6MjAyNjU5OTM3NH0.eB-l3dCXqe14uqcniDj8ByMOj9djZN5quE4H3RMHq-o'
const supabase = createClient('https://jfougwzmuhrmwybyhepi.supabase.co', supabaseAnonKey)

function AskAppointment({ setAccept }) {
    const {accept} = UseAccept();

    async function getUser() {
        const {data: {user}} = (await supabase.auth.getUser())
    }

    async function makeAppointment() {
        const {error} = await supabase
        .from('ambassadors')
        .insert([
            {id:5 , makeAppointment: Boolean({accept}), user_name: JSON.stringify(getUser())},
        ])
        Alert.alert("Appointment is Made");
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

{/** gets ambassadors info */}
function ListAmbassadors() {
    const { setAccept } = UseAccept();
    const [ambassadors , setAmbassadors] = useState();

    const getAmbassadors = async () => {
        let {data , error } = await supabase.from('ambassadors').select('*')
        setAmbassadors(data)
    }
    
    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user_name}</Text>
            <AskAppointment setAccept={setAccept} />
        </View>
    );

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
