import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FullBody from './assets/images/FullBody.png';
import UpperBody from './assets/images/UpperBody.png';
import LegWorkout from './assets/images/LegWorkout.png';
import Cardio from './assets/images/Cardio.png';
import CoreWorkout from './assets/images/CoreWorkout.png';
import Arm from './assets/images/Arm.png';
import HIITWorkout from './assets/images/HIIT.png';
import Yoga from './assets/images/Yoga.png';
import Pilates from './assets/images/Pilates.png';

const UpcomingWorkouts = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.upcomingWorkouts}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Text style={styles.backButton}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.upcomingWorkoutsTitle}>Upcoming Workouts</Text>
                    </View>
                    <WorkoutCard name="Full Body" image={FullBody} />
                    <WorkoutCard name="Upper Body" image={UpperBody} />
                    <WorkoutCard name="Leg Day" image={LegWorkout} />
                    <WorkoutCard name="Cardio Blast" image={Cardio} />
                    <WorkoutCard name="Core Strength" image={CoreWorkout} />
                    <WorkoutCard name="Arm Day" image={Arm} />
                    <WorkoutCard name="HIIT Workout" image={HIITWorkout} />
                    <WorkoutCard name="Yoga Session" image={Yoga} />
                    <WorkoutCard name="Pilates Class" image={Pilates} />
                    {/* Add more WorkoutCard components for additional workouts */}
                </View>
            </View>
        </ScrollView>
    );
};

const WorkoutCard = ({ name, image }) => {
    return (
        <View style={styles.workoutCard}>
            <Image source={image} style={styles.workoutImage} />
            <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{name}</Text>
                {/* Add more details about the workout if needed */}
            </View>
            <TouchableOpacity style={styles.plusButtonContainer} onPress={() => { /* Add onPress functionality */ }}>
                <Text style={styles.plusButton}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 60,
    },
    backButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1986EC',
        marginLeft: 10,
    },
    upcomingWorkouts: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 85,
        marginBottom: 20,
    },
    upcomingWorkoutsTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    workoutCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workoutImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    workoutInfo: {
        flex: 1,
    },
    workoutName: {
        fontSize: 16,
        fontWeight: '600',
    },
    plusButton: {
        fontSize: 20,
        color: 'white',
        padding: 10,
    },
    plusButtonContainer: {
        backgroundColor: '#1986EC',
        borderRadius: 30,
        padding: 3,
    },
});

export default UpcomingWorkouts;
