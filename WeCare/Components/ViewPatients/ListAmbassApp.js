import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import CancelAppointment from "../ViewAppointments/cancelBTN";
import { RefreshControl } from "react-native-gesture-handler";

export default function ViewPatients() {
    const [Appointment, setAppointment] = useState();
    const [refreshing, setRefresh] = useState(false)

    const getData = async () => {
        try {
            setRefresh(true)
            const { data } = await supabase.from('Appointments').select('*');
            setAppointment(data)
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(false)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderItem = ({ item }) => {
        return (<>
            <View style={styles.container}>
                <Text style={styles.title}>Patient: {item.user}</Text>
                <Text style={styles.text2}>Ambassador: {item.ambassador_name}</Text>
                <Text style={styles.text}>Date: {formatDate(item.Date_Suggested)}</Text>
                <View style={styles.cancelContainer}>
                    <CancelAppointment item={item.user} />
                </View>
            </View>
        </>)
    }

    return (<>
        <View style={styles.mainContainer}>
            <FlatList
                data={Appointment}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => { getData() }} />
                }
            />
        </View>
    </>)
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 1,
        backgroundColor: '#FFF', // Set default background color to white
    },
    container: {
        flexDirection: "column",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 30,
        backgroundColor: '#DFF3FF',
        borderRadius: 22,
        margin: 10,
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5,
    },

    text: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
        paddingBottom: 10,
    },

    text2: {
        fontSize: 15,
        fontWeight: '600',
        color: "#666",
        marginTop: 5,
        paddingBottom: 5,
    },

    cancelContainer: {
        backgroundColor: '#1986EC',
        borderRadius: 22,
        color: 'white',
    },
}); 
