import { View, Text, StyleSheet } from "react-native";

const NotificationTemplate = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Notifications</Text>
        </View>
    );
};

export default NotificationTemplate;

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