import { supabase } from "../../supabase";
import { Button } from "react-native-elements";
import { Alert } from "react-native";

export default function AskAppointment({item,  date, accept, setAccept , users}) {

    async function makeAppointment() {
        try {
            setAccept(true)
            const {error} = await supabase
                .from('Appointments')
                .insert([
                    { ambassador_name: String(item), makeAppointment: Boolean({accept}), user:{users} , Date_Suggested: {date}}
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
