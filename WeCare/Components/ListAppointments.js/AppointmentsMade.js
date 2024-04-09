import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { View } from "react-native";
import { FlatList, Text, StyleSheet } from "react-native";
import CancelAppointment from "../ViewAppointments/cancelBTN";
import { RefreshControl } from "react-native-gesture-handler";

export default function AppointmentsMade() {
    const [Appointment, setAppointment] = useState([]);
    const [refreshing, setRefresh] = useState(false);
    
    const getData = async () => {
        try {
            setRefresh(true);
            const { data } = await supabase.from('Appointments').select('*');
            setAppointment(data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Ambassador: {item.ambassador_name}</Text>
                <Text style={styles.text}>Date: {formatDate(item.Date_Suggested)}</Text>
                <View  style={styles.buttonContainer}>
                <CancelAppointment item={item.user} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={Appointment}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
    },
    container: {
        flexDirection: "column",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom:30,
        backgroundColor:'#E0F2F8',
        borderRadius:22,
        margin:10,
        padding:20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom:5,
    },

    text: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
        paddingBottom:10,
    },
    buttonContainer:{
        backgroundColor:'#1986EC',
        borderRadius:22,
        color:'white',
    },

    button:{
        color:'white',
    }
});
