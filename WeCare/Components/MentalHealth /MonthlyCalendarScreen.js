// MonthlyCalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

export default function MonthlyCalendarScreen () {
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();

  // Example mood entry data - replace this with data fetched from the backend
  const initialMoodEntries = [
    { date: '2024-04-01', mood: 'happy' },
    { date: '2024-04-05', mood: 'sad' },
    // Add more mood entries as needed
  ];

  useEffect(() => {
    // Convert mood entry data to format required by react-native-calendars
    const formattedMarkedDates = initialMoodEntries.reduce((acc, entry) => {
      const { date, mood } = entry;
      acc[date] = { selected: true, selectedColor: getColorForMood(mood) };
      return acc;
    }, {});

    setMarkedDates(formattedMarkedDates);
  }, []);

  const getColorForMood = (mood) => {
    // Define colors for different moods
    switch (mood) {
      case 'happy':
        return '#66b3ff'; // Light Blue
      case 'sad':
        return '#0073e6'; // Royal Blue
      case 'angry':
        return '#0059b3'; // Navy Blue
      case 'anxious':
        return '#b3d9ff'; // Sky Blue
      default:
        return '#000000'; // Black
    }
  };

  const handleDayPress = (day) => {
    // Handle day press event here
    console.log('Selected date:', day);
    // Navigate to mood entry details screen or perform other actions
    navigation.navigate('MoodEntryDetails', { date: day.dateString });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Mood Calendar</Text>
      {/** */}
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          textDayFontFamily: 'Roboto-Regular',
          textMonthFontFamily: 'Roboto-Medium',
          textDayHeaderFontFamily: 'Roboto-Bold',
          textTodayFontFamily: 'Roboto-Bold',
          todayTextColor: '#0059b3', // Navy Blue
          arrowColor: '#0059b3', // Navy Blue
          textMonthFontWeight: 'bold',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

