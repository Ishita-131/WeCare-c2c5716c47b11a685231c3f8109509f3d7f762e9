// import { View, Text, StyleSheet } from "react-native";

// const dashboardScreen = () => {
//     return (
//         <View style={styles.container}>
//         <Text style={styles.text}>DashboardScreen</Text>
//         </View>
//     );
// };

// export default dashboardScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     text: {
//         fontSize: 24, 
//         fontWeight: "bold",
//         marginBottom: 16,
//     },
// });

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// const dashboardScreen = () => {
//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.greeting}>Hi, Sam</Text>
//             <Text style={styles.quote}>"Take care of your body. It's the only place you have to live." - Jim Rohn</Text>

//             {/* Today's Target Button */}
//             <TouchableOpacity style={styles.targetButton}>
//                 <Text style={styles.targetButtonText}>Check</Text>
//             </TouchableOpacity>

//             {/* Activity Status */}
//             <View style={styles.activityStatus}>
//                 <View style={styles.activityCard}>
//                     <Text style={styles.activityCardTitle}>Calories</Text>
//                     <Text style={styles.activityCardValue}>760 KCal</Text>
//                     {/* You'll need to implement a progress circle or similar component */}
//                 </View>
//                 <View style={styles.activityCard}>
//                     <Text style={styles.activityCardTitle}>Sleep</Text>
//                     <Text style={styles.activityCardValue}>8h 20m</Text>
//                     {/* You'll need to implement a graph or similar component */}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default dashboardScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 20,
//     },
//     greeting: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 20,
//     },
//     quote: {
//         fontStyle: 'italic',
//         marginVertical: 20,
//     },
//     targetButton: {
//         backgroundColor: '#007AFF',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     targetButtonText: {
//         color: '#fff',
//         fontWeight: '600',
//     },
//     activityStatus: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//     },
//     activityCard: {
//         backgroundColor: '#F0F0F0',
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//         flex: 1,
//         marginHorizontal: 5,
//     },
//     activityCardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     activityCardValue: {
//         fontSize: 16,
//     },
//     // Add additional styles for other components as necessary
// });



import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Image } from 'react-native';





const maxCalories = 1000;
const currentCalories = 760;
const caloriesLeft = maxCalories - currentCalories;

const DashboardScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi, User</Text>
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
                 source={require('./assets/images/Layer 1.png')}
                    style={styles.quoteImage}
             />

            </View>

           

            <TouchableOpacity style={styles.targetButton} 
            onPress={() => navigation.navigate('Track Your Progress')} >
                <Text style={styles.targetButtonText}>Today's Target</Text>
            </TouchableOpacity>

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


    // profileIcon: {
    //     width: 40, // Adjust the size as needed
    //     height: 40, // Adjust the size as needed
    //     position: 'absolute', // Use absolute positioning
    //     top: 8, // Adjust the top as needed
    //     right: 10, // Adjust the right as needed
    //     // You may also want to add a border, borderRadius, etc.
    // },


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
        margin: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    quoteImage: {
        width: 100,   // Set the width of your image
        height: 175,  // Set the height of your image
        marginBottom: 20, // Spacing between the image and the quote text
        marginLeft: 20, 
    }, 

    quote: {
        flexShrink: 1,
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 16,
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
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20, // More rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20, // Adjust as needed for spacing from the quote container
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
        paddingHorizontal: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 32, // You can adjust the margin as needed to match your Figma design
        marginBottom: 16, // Space before the activity cards start
    },

    activityStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 100,
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
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
        minHeight: 350,
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
        marginTop: -33, // Move the title container up above the progress circle
        
    },

    activityCardTitleContainer2: {
        alignSelf: 'center', // Align the title container to center horizontally
        marginTop: 60, // Move the title container up above the sleep diagram
        
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
        marginTop: 10, // Space between the title and the image
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

    // ... add any other styles you need here
});

export default DashboardScreen;

