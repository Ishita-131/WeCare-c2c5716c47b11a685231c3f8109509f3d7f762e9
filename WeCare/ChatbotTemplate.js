import { View, Text, StyleSheet } from "react-native";

const ChatbotTemplate = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Chatbot</Text>
        </View>
    );
};

export default ChatbotTemplate;

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