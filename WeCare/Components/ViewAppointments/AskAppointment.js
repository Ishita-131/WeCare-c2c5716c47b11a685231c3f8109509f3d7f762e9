import { supabase } from "../../supabase";
import { Button } from "react-native-elements";
import { Alert } from "react-native";

{/** Asking for Appointments */}
export default function AskAppointment({item,  date, accept, setAccept , users}) {

    async function makeAppointment() {
        
        try {
            setAccept(true)
            {/** User is not done yet need to find a solution to fetch username */}
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

    return (<>
        <Button
            title="Make Appointment"
            onPress={() => {
                makeAppointment();
            }}
        />
        </>
    );
}