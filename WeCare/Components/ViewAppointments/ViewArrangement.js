import { useState } from "react";
import { Button } from "react-native-elements";
import ViewDatePicker from "./ViewDatePicker";
import AskAppointment from "./AskAppointment";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function ViewArrangement({item}) {
    const [block, setBlock] = useState('show');
    const [title, setTitle] = useState('Arrange Appointment');

    return (
        <>
            {(!block) && (
                <View>
                    <AskAppointment style={styles.container} item={item}/>
                    <ViewDatePicker/>
                </View>
            )}
            <Button
                title={title}
                buttonStyle={styles.arrangeButton} // Apply style directly to the button
                onPress={() => {
                    setBlock(!block)
                    if (!block) {
                        setTitle('Arrange Appointment')
                    } else {
                        setTitle("Close")
                    }
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        margin: 'auto',
        width: 90,
    },
    arrangeButton: {
        borderRadius: 22, // Apply border radius directly to the button
    },
});
