import { View, Text, StyleSheet } from "react-native";

const MakeAppointments = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Make Appointments</Text>
        </View>
    );
};

export default MakeAppointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24, 
        fontWeight: "bold",
        marginBottom: 16,
    },
});