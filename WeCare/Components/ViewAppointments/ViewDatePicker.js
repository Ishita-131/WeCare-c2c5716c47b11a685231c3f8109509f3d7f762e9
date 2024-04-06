import DateTimePicker from "@react-native-community/datetimepicker"
import { View, Text } from "react-native";

{/** Views Date Picker */}
export default function ViewDatePicker({date, setDate}) {

    const selectedDate = (event , selectedDate) => {
        if (selectedDate !== undefined) {
            setDate(selectedDate);
        }
    } 
    
    return (<>
    <View>
        <DateTimePicker 
        value={date}
        timeZoneName="GB"
        minimumDate={new Date()}
        mode="datetime"
        display="spinner"
        onChange={selectedDate} />
    </View> 
    </>)
}