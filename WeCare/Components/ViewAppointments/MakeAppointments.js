import React, { useEffect, useState , setState} from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseAccept } from "./accept";
import { StyleSheet } from "react-native";
import { supabase } from "../../supabase";
import ViewArrangement from "./ViewArrangement"
import { RefreshControl } from "react-native-gesture-handler";

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
    const [StartIndex, setIndex] = useState(0);
    const [refreshing , setRefresh] = useState(false)

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text>{item.user_name}</Text>
            <Text>{item.Description}</Text>
            <ViewArrangement setAccept={setAccept} accept={accept} item={item.user_name} user={user} date={date} setDate={setDate}/>
            <CancelAppointment item={item.user_name} user={user} />
        </View>
    );

    const getAmbassadors = async () => {
        try {
            setRefresh(true)
            let {data } = await supabase.from('ambassadors').select('*')
            if (data) {
                setAmbassadors(data) 
            }
        } catch (error) {
            console.log(error)
        } finally {
            setRefresh(false)
        }
        
    }

    const Next = () => {
        if (StartIndex < 11) {
            setIndex(StartIndex => StartIndex + 10)
        }
    }

    const prev = () => {
        if (StartIndex > 0) {
            setIndex(StartIndex - 10)
        } 
    }

    useEffect(() => {
        getAmbassadors();
    }, [ambassadors])

    return (
        <View>
            <FlatList
               data={ambassadors ? (ambassadors.slice(StartIndex,StartIndex+10)) : ({ambassadors})} // Render only the first 10 items
               keyExtractor={(item) => parseInt(item.id)}
               renderItem={renderItem}
               refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getAmbassadors} />
               }
            />
            <View style={styles.btn}>
                <Button title="Prev" onPress={prev} />
                <Button title="Next" onPress={Next} />
            </View>
        </View>
    );
}

function CancelAppointment({item}) {
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
    btn: {
        position: "relative",
        flexDirection: 'row', // Arrange items horizontally
    }
});