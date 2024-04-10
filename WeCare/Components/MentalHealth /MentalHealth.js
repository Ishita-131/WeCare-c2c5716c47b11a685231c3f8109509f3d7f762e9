import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MentalHealth = () => {
  const navigation = useNavigation();

  const goToBreathing = () => {
    navigation.navigate('BreathingScreen');
  };

  const moodTracking = () => {
    navigation.navigate('MoodTracking');
  };
  


  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.titleContainer}>
          </View>
      <View style={styles.widgetsContainer}>
        {/* Breathing */}
        <TouchableOpacity style={styles.widgetButton} onPress={goToBreathing}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Deep Breathing</Text>
          </View>
        </TouchableOpacity>
        
        {/* Resource */}
        <TouchableOpacity style={styles.widgetButton} onPress={() => navigation.navigate('MentalResource')}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Mental Health Resource</Text>
          </View>
        </TouchableOpacity>

        <QuoteCard />

        <Image
        source={require('./yoga.png')}
        style={styles.image}
        />

        {/* Mood Tracking */}
        <TouchableOpacity style={styles.widgetButton2} onPress={moodTracking}>
          <View style={styles.widgetInner2}>
            <Text style={styles.widgetText2}>Mood Tracking</Text>
          </View>
        </TouchableOpacity>


        {/* Add more widgets here 
        <TouchableOpacity style={styles.widgetButton} onPress={() => navigation.navigate('Support')}>
          <View style={styles.widgetInner}>
            <Text style={styles.widgetText}>Support</Text>
          </View>
        </TouchableOpacity>*/}
      </View>
    </ScrollView>
  );
}

const QuoteCard = () => {
  return (
    <View style={styles.quoteContainer}>

      <Text style={styles.quote}>
      "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
      </Text>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10, // Add top padding to push content below the title
  },
  titleContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Distribute children along the row
    width: '100%', // Ensure full width
    marginBottom:30,
  },

  welcomeStyles: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 18,
    lineHeight: 40,
    textAlign: 'left',
    marginBottom:5,
  },

  widgetsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  widgetButton: {
    width: '48%', // Adjust width to fit two widgets with spacing
    aspectRatio: 1,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1986EC', // Border color
    borderWidth: 2, // Border width
    height:100,
  },
  widgetInner: {
    width: '65%',
    aspectRatio: 1,
    borderRadius: 80,
    backgroundColor: '#1986EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  widgetButton2: {
    width: '100%', // Adjust width to fit two widgets with spacing
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add margin to create spacing between widgets
    height:120,
    backgroundColor:'#1986EC',
    textAlign:'left',
  },

  widgetText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:20,
  },

  moodSmallText:{
    color:'#371B34',
    fontFamily: 'Alegreya Sans',
  },

  quoteContainer: {
    justifyContent: 'space-between', // Distribute space between the children
    alignItems: 'center', // Center children vertically
    marginHorizontal: 10, // Adjust horizontal margin to make the container smaller
    marginTop: 20, // Adjust as needed
    marginBottom: 20, // Adjust as needed
    height: 150,
    width:'95%',
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
    textAlign: 'center', // Align to the left if text is short
    fontWeight: '600',
    marginTop:25
  },

  image:{
    width:150,
    height:150,
    marginLeft:105,
    marginBottom:20,
    marginTop:10,
  },
});

export default MentalHealth;
