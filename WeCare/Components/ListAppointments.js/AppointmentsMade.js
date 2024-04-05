import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import CancelAppointment from "../ViewAppointments/cancelBTN";
import { RefreshControl } from "react-native-gesture-handler";

export default function AppointmentsMade() {
    const [Appointment , setAppointment] = useState();
    const [refreshing , setRefresh] = useState(false)
    
    const getData = async () => {
        try {
            setRefresh(true)
            const {data} = await supabase.from('Appointments').select('*');
            setAppointment(data)
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(false)
        }
    }
    useEffect(()=> {
        getData();
    }, [])

    const renderItem = ({item}) => {
        return (<>
            <View  style={styles.container}>
                <Text>{item.ambassador_name}</Text>
                <Text>{item.Date_Suggested}</Text>
                <CancelAppointment item={item.ambassador_name} />
            </View>
        </>)
    }

    return (<>
        <View>
            <FlatList
            data={Appointment}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {getData()}} />
               }
            />
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'space-between', // Distribute items evenly along the main axis
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    test : {
        height: 100,
    }
});