import { useState } from "react";
import { Button } from "react-native-elements";
import ViewDatePicker from "./ViewDatePicker";
import AskAppointment from "./AskAppointment";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function ViewArrangement({setAccept, accept , item , users, date, setDate}) {
    const [block, setBlock] = useState('show');
    const [title, setTitle] = useState('Arrange Appointment');

    return (<>
        {(!block) && (
            <View>
                <AskAppointment style={styles.container} accept={accept} item={item} user={users} date={date} setAccept={setAccept}/>
                <ViewDatePicker date={date} setDate={setDate} />
            </View>
        )}
        <Button title={title}  buttonStyle={styles.arrangeButton} onPress={() => {
            setBlock(!block)
            if (!block) {
                setTitle('Arrange Appointment')
            } else {
                setTitle("Close")
            }
        }}/>
    </>)

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        margin: 'auto',
        width: 90,
    },
    arrangeButton: {
        borderRadius: 22, // Add border radius
    },
})