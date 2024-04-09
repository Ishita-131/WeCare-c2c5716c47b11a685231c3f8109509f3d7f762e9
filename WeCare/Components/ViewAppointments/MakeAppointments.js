import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AcceptProvider, UseAccept } from "./accept";
import { StyleSheet } from "react-native";
import { getAmbassadors } from "./getAmbassadors";
import ViewArrangement from "./ViewArrangement";

export default function MakeAppointments() {
  return (
    <AcceptProvider>
      <SafeAreaView style={styles.container}>
        <ListAmbassadors />
      </SafeAreaView>
    </AcceptProvider>
  );
}

function ListAmbassadors() {
  const {
    ambassadors,
    users,
    refreshing,
    setRefresh,
    setAmbassadors,
    setAccept,
  } = UseAccept();
  const [startIndex, setStartIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.userName}>{item.user_name}</Text>
      <Text style={styles.description}>{item.Description}</Text>
      <ViewArrangement
        item={item.user_name}
      />
    </View>
  );

  const nextPage = () => {
    if (startIndex < 11) {
      setStartIndex(startIndex + 10);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  const fetchAmbassadors = async () => {
    try {
      setRefresh(true);
      const ambassadorsData = await getAmbassadors();
      setAmbassadors(ambassadorsData);
      setAccept(true);
    } catch (error) {
      console.error("Error fetching ambassadors:", error);
    } finally {
      setRefresh(false);
    }
  };

  const fetchUser = async() => {
    try {
        const data = await getUser();
        setUser(data)
    }catch (error) {

    }
  }

  useEffect(() => {
    fetchUser();
    fetchAmbassadors();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ambassadors ? ambassadors.slice(startIndex, startIndex + 10) : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAmbassadors}
          />
        }
      />
      <View style={styles.pagination}>
        <Button title="Prev" onPress={prevPage} disabled={startIndex===0}/>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={startIndex===20}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#FFF', // Set default background color to white
    marginTop:-30,
  },

  itemContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom:30,
    backgroundColor:'#DFF3FF',
    borderRadius:22,
    margin:10,
    padding:20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom:5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    paddingBottom:10,
  },
  cancelButtonContainer: {
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom:-40,
  },
});
