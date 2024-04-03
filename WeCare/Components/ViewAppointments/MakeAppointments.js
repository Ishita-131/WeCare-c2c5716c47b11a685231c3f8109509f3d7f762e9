import React, { useEffect, useState , setState} from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { StyleSheet } from "react-native";
import { supabase } from "../../supabase";
import ViewArrangement from "./ViewArrangement"

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
        <View style={styles.container}>
            <Text>{item.user_name}</Text>
            <Text>{item.Description}</Text>
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

function CancelAppointment({item,user}) {
    async function cancel() {
        try {
            const {error} = await supabase.from('Appointments').delete().eq('ambassador_name', String(item))
            if (error) {
                Alert.alert(error)
            }
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
    },
    container: {
        flex: 1,
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'space-between', // Distribute items evenly along the main axis
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});