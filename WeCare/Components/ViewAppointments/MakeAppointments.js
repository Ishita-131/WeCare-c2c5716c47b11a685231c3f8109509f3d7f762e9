import React, { useEffect, useState , setState} from "react";
import { View, Text, Alert, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AcceptProvider, UseAccept } from "./accept";
import { StyleSheet } from "react-native";
import { supabase } from "../../supabase";
import ViewArrangement from "./ViewArrangement"
import { RefreshControl } from "react-native-gesture-handler";
import { getAmbassadors } from "./getAmbassadors";
import CancelAppointment from "./cancelBTN";

{/** Main Function */}
export default function MakeAppointments() {
    return (<>
    <AcceptProvider>
        <SafeAreaView>
            <ListAmbassadors />
        </SafeAreaView>
    </AcceptProvider>
    </>
        
    );
}

{/** gets ambassadors info */}
function ListAmbassadors() {
    const {ambassadors ,  users , date, setDate, refreshing, setRefresh, setAmbassadors, accept , setAccept} = UseAccept();
    const [StartIndex, setIndex] = useState(0);

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text>{item.user_name}</Text>
            <Text>{item.Description}</Text>
            <ViewArrangement item={item.user_name} user={users} date={date} setDate={setDate} setAccept={setAccept} accept={accept}/>
            <CancelAppointment item={item.user_name} user={users} />
        </View>
    );

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
    
    const fetchAmbassadors = async () => {
        try {
            setRefresh(true)
            const ambassadorsData = await getAmbassadors();
            setAmbassadors(ambassadorsData);
            setAccept(true)
        } catch (error) {
            // Handle error
        } finally {
            setRefresh(false)
        }
    };

    const fetchUser = async() => {
        try {
            const data = await getUser();
            setUser(data)
        }catch (error) {

        }
    }
    useEffect(() => {
        fetchUser();
        fetchAmbassadors();
    }, []);

    return (
        <View>
            <FlatList
               data={ambassadors ? (ambassadors.slice(StartIndex,StartIndex+10)) : ('')} // Render only the first 10 items
               keyExtractor={(item) => parseInt(item.id)}
               renderItem={renderItem}
               refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {fetchAmbassadors()}} />
               }
            />
            <View style={styles.btn}>
                <Button title="Prev" onPress={prev} />
                <Button title="Next" onPress={Next} />
            </View>
        </View>
    );
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