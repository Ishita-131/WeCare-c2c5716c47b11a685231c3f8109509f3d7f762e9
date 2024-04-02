import React, { useEffect, useState , setState} from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { createClient } from "@supabase/supabase-js";
import DateTimePicker from '@react-native-community/datetimepicker'
import { StyleSheet } from "react-native";

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
    const { setAccept, accept , ambassadors , setAmbassadors, user , date, setDate} = UseAccept();
    
    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user_name}</Text>
            <ViewArrangement setAccept={setAccept} accept={accept} item={item.user_name} user={user} date={date} setDate={setDate}/>
            <CancelAppointment item={item.user_name} user={user} />
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

function ViewArrangement({setAccept , accept , item , user, date, setDate}) {
    const [block, setBlock] = useState('show');
    return (<>
        <Button title="Arrange Appointment" onPress={() => setBlock(!block)}/>
        {(!block) && (
            <View>
                <AskAppointment setAccept={setAccept} accept={accept} item={item.user_name} user={user} date={date}/>
                <ViewDatePicker date={date} setDate={setDate} />
            </View>
        )}
    </>)

}

{/** Views Date Picker */}
function ViewDatePicker({date, setDate}) {

    const selectedDate = (event , selectedDate) => {
        if (selectedDate !== undefined) {
            setDate(selectedDate);
        }
    } 
    
    return (<>
    <View>
        <DateTimePicker 
        value={date}
        minimumDate={new Date()}
        mode="datetime"
        display="spinner"
        onChange={selectedDate} />
        <Text>
            {date.toString()}
        </Text>
    </View> 
    </>)
}

{/** Asking for Appointments */}
function AskAppointment({ setAccept , accept , item , user, date}) {

    async function makeAppointment() {
        try {
            setAccept(true)
            {/** User is not done yet need to find a solution to fetch username */}
            const {error} = await supabase
            .from('Appointments')
            .insert([
                {ambassador_name: item, makeAppointment: Boolean({accept}), user: {user} }
            ])
            .select();
            Alert.alert("Appointment is Made");
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (<>
        <Button
            title="Make Appointment"
            onPress={() => {
                makeAppointment();
            }}
        />
        </>
    );
}

function CancelAppointment({item,user}) {
    async function cancel() {
        try {
            const {error} = await supabase.from('Appointments').delete().eq('ambassador_name', String(item))
            Alert.alert('Appointment Cancelled');
        } catch (error) {
            Alert.alert(error);
        }
    }

    return (
        <Button
            title="Cancel Appointment"
            onPress={() => {
                cancel();
            }}
        />
    )
}

const styles = StyleSheet.create({
    show: {
        display: 'hidden',
    }
});