import { supabase } from "../../supabase";
import { Button } from "react-native-elements";
import { Alert } from "react-native";
import { UseAccept } from "./accept";
import { getUser } from "./getUser";
import { useEffect, useState } from "react";

export default function AskAppointment({item}) {
    const {
        users,
        setUser,
        date,
        accept,
        setAccept,
      } = UseAccept();

    let fulldate = String(date)

    async function fetchUser() {
        try{
            const data = await getUser();
            setUser(data)
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(()=> {
        fetchUser();
    },[])
    
    async function makeAppointment() {
        try {
            setAccept(true)
            const {error} = await supabase
                .from('Appointments')
                .insert([
                    { ambassador_name: String(item), makeAppointment: Boolean({accept}), user:users , Date_Suggested: fulldate}
                ]).select();
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
            buttonStyle={styles.makeAppointmentButton} // Apply style directly to the button
        />
    );
}

const styles = {
    makeAppointmentButton: {
        borderRadius: 22, // Apply border radius directly to the button
    },
};
