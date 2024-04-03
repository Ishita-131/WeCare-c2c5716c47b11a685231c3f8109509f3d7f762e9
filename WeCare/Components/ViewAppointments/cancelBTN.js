import { supabase } from "../../supabase";
import { Button } from "react-native";
import { Alert } from "react-native";

export default function CancelAppointment({item}) {
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