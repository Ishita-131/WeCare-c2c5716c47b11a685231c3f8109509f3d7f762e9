import { View, Text, Alert} from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios'
import { useEffect, useState } from "react";

export default function ResourceMental() {
    const [rData, setData] = useState();

    const fetchNHS = async () => {
        try{
            const data = await axios.get('https://api.nhs.uk/mental-health', {
                headers: {
                    'subscription-key': '905f94250d4e4d2ca049ca4a30591351'
                }
                })
            setData(data.data)
            console.log(rData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchNHS();
    }, [])

    return (
        <SafeAreaView>
            <Text>{rData && rData.map(({ index, item }) => (
                <View key={index}>
                    <Text>{item.description}</Text>
                </View>
            ))}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn: {
        top: 0,
        left: 0,
        display: 'block',
    },
})