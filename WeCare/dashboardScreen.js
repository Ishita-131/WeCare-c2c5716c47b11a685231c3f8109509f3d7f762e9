import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const maxCalories = 1000;
const currentCalories = 760;
const caloriesLeft = maxCalories - currentCalories;


const DashboardScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome to WeCare</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                    <Image
                        source={require('./assets/images/Profile Button.png')} // Make sure the path is correct
                        style={styles.profileIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.quoteContainer}>

                <Text style={styles.quote}>
                    "Take care of your body. It's the only place you have to live." - Jim Rohn
                </Text>
                <Image
                    //  source={require('./assets/images/Layer 1.png')}
                    style={styles.quoteImage}
                />

            </View>

            <TouchableOpacity
                style={styles.targetButton}
                onPress={() => navigation.navigate('Tracking')} >
                <Text style={styles.targetButtonText}>Today's Target</Text>
            </TouchableOpacity>

            <View style={styles.moodSelectionContainer}>
                <Image
                    source={require('./assets/images/person.png')}
                    style={styles.profileIcon2}
                />
                <View>
                    <Text style={styles.moodSelectionTitle}>User Profile</Text>
                    <Text style={styles.moodSelectionText}>Fdm Employee</Text>
                </View>
                <TouchableOpacity
                style={styles.targetButton}
                onPress={() => navigation.navigate('Profile')} >
                <Text style={styles.targetButtonText}>Edit</Text>
            </TouchableOpacity>
            </View>



            <Text style={styles.activityStatusLabel}>Activity Status</Text>

            <View style={styles.activityStatusContainer}>
                <View style={styles.activityCard}>
                    <View style={styles.activityCardTitleContainer}>
                        <Text style={styles.activityCardTitle}>Calories</Text>
                        <Text style={styles.currentCalories}>{currentCalories} KCal</Text>
                    </View>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={(currentCalories / maxCalories) * 100}
                        tintColor="#C58BF2"
                        backgroundColor="#F7F8F8"
                    >
                        {() => (
                            <View style={styles.circularProgressInner}>
                                <Text style={styles.caloriesLeft}>
                                    {caloriesLeft} KCal left
                                </Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>
                </View>

                {/* <Text style={styles.activityStatusLabel}>Activity Status</Text> */}

                {/* Sleep Card */}
                <View style={styles.activityCard}>
                    <View style={styles.activityCardTitleContainer2}>
                        <Text style={styles.activityCardTitle}>Sleep</Text>
                        <Text style={styles.currentCalories}>8h 20m</Text>
                    </View>

                    {/* You'll need to implement a graph or similar component */}
                    <Image
                        source={require('./assets/images/Sleep-Graph.png')}
                        style={styles.graphImage}
                        resizeMode="contain" // Adjust the resizeMode as needed
                    />
                </View>
            </View>




            <View style={styles.sessionsContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.sessionsTitle}>1 on 1 Sessions</Text>
                    <Text style={styles.sessionsSubtitle} numberOfLines={2}>
                        Create an appointment with an ambassador
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Book an Appointment')}>
                        <Text style={styles.bookNowText}>
                            Book Now
                            <Image
                                source={require('./assets/images/dateIcon1.png')}
                                style={styles.dateIcon}
                            />
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('./assets/images/Sessionimage1.png')}
                    style={styles.sessionImage}
                />
            </View>





        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row', // Align children in a row
        justifyContent: 'space-between', // Distribute space between the children
        alignItems: 'center', // Align children vertically
        marginTop: 20,
        paddingHorizontal: 20, // Add some padding on the sides
    },



    profileIcon: {
        width: 40, // Adjust the size as needed
        height: 40, // Adjust the size as needed
        // Remove position: 'absolute' and other positioning styles
        // Add any additional styles for the image if needed
    },


    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    quoteContainer: {
        flexDirection: 'row', // Set the direction of children to horizontal
        justifyContent: 'space-between', // Distribute space between the children
        alignItems: 'center', // Center children vertically
        marginHorizontal: 20, // Adjust horizontal margin to make the container smaller
        marginTop: 20, // Adjust as needed
        marginBottom: 20, // Adjust as needed
        height: 150,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    quote: {
        flex: 1, // Take up the remaining space in the flex container
        fontStyle: 'italic',
        fontSize: 14, // Adjust font size as needed
        textAlign: 'left', // Align to the left if text is short
        marginRight: 20, // Add right margin to make space for the image sticking out
    },

    quoteImage: {
        width: 80,   // Reduce the width of your image if necessary
        height: 160,  // Adjust the height of your image
        position: 'absolute', // Position absolutely to allow it to overlap the container
        right: -40, // Half of the width to make it stick out
        top: 0, // Adjust as needed
    },


    checkButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    checkButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    targetButton: {
        backgroundColor: '#007bff', // Use the color from your Figma design
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // More rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 7, // Adjust as needed for spacing from the quote container
        shadowColor: 'rgba(0, 123, 255, 0.4)', // Adjust shadow color to match Figma
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8, // Adjust shadow opacity to match Figma
        shadowRadius: 15,
        elevation: 10, // Adjust elevation for Android to match Figma
    },

    targetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600', // Adjust the font weight if necessary
    },
    spaceBetweenButtonAndStatus: {
        height: 20, // Add space between button and activity cards
    },

    activityStatusLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, // Adjust as per your design
        textAlign: 'center', // This ensures that your text is centered
    },



    // activityStatusContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 20,
    //     marginBottom: 20,
    //     marginTop: 100,
    //     flexDirection: 'row',
    //     alignItems: 'center', // Align items vertically
    // },

    activityStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20, // You can reduce this if needed
        // Removed duplicate flexDirection property
        alignItems: 'center',
        marginTop: 7,
    },

    activityCard: {
        backgroundColor: '#E0E4EA',
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: 150, // Set a fixed width or adjust as needed
        height: 200, // Set a fixed height or adjust as needed
    },
    activityCardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        top: 20, // Position at the top of the box
        alignSelf: 'center', // Center horizontally
    },

    activityCardTitleContainer: {
        alignSelf: 'center', // Align the title container to center horizontally

    },

    activityCardTitleContainer2: {
        alignSelf: 'center', // Align the title container to center horizontally
        marginTop: 50, // Move the title container up above the sleep diagram

    },

    circularProgressInner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92A3FD', // Light purple background color for the inner circle
        borderRadius: 60, // Half the diameter to make it a circle
        width: 120, // The diameter of the outer circle
        height: 120, // The diameter of the outer circle
    },

    graphImage: {
        width: '100%', // Take up all available horizontal space
        height: 200, // Set the height of the image
        marginTop: -40,
    },


    caloriesLeft: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',

    },

    activityCardValue: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#333',
        marginTop: 50,
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
    },

    activityCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        alignSelf: 'center',
        bottom: '55%', // Adjust as needed
    },

    currentCalories: {
        fontSize: 13, // Make font size smaller
        fontWeight: 'normal',
        color: '#92A3FD',
        marginTop: 13,
    },



    moodSelectionContainer: {
        paddingHorizontal: 20,
        marginTop: 20, // Adjust this as needed
        alignItems: 'center', // This ensures that your container's items are centered
        marginBottom: 20,
        flexDirection: 'row',
    },

    moodSelectionTitle: {
        color: 'black',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 21,
        width: 107,
        height: 31,
        fontWeight: '600',
    },

    moodSelectionText: {
        color: '#7B6F72',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 21,
        width: 129,
        height: 27,
    },

    moodIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // This will prevent the tops of images from being cropped
        marginVertical: 10, // This adds space above and below your container
    },

    moodIcon: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // for Android shadow
        opacity: 0.9, // Example opacity
    },

    sessionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF3E0', // Adjust the color as needed
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 25,
        marginTop: 20,
        marginBottom: 60,
        // To add the shadow as per your Figma design, adjust the values below
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    sessionsTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    sessionsSubtitle: {
        fontSize: 14,
        color: '#333',
        marginVertical: 4,
        marginBottom: 4,
    },
    bookNowText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FE8235', // Color as per Figma design for clickable text
        marginBottom: 10,

    },
    dateIcon: {
        width: 10,
        height: 8,
        marginLeft: 5,
    },
    sessionImage: {
        width: 120, // Adjust the size as per your design requirement
        height: 120, // Adjust the size to maintain the aspect ratio
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },

    editButton: {
        backgroundColor: '#007bff', // Use the color from your Figma design
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20, // Add left margin to create space between the texts and button
        elevation: 10, // Adjust elevation for Android to match Figma
        color: 'white',
    },

    editButtonContainer:{
        borderRadius:22,
    },
    

    profileIcon2:{
        width:100,
        height:100,
        marginRight:10,
    },
    



    // ... add any other styles you need here
});

export default DashboardScreen;