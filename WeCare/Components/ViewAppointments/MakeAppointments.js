import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AcceptProvider, UseAccept } from "./accept";
import { StyleSheet } from "react-native";
import { getAmbassadors } from "./getAmbassadors";
import CancelAppointment from "./cancelBTN";
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
    date,
    setDate,
    refreshing,
    setRefresh,
    setAmbassadors,
    accept,
    setAccept,
  } = UseAccept();
  const [startIndex, setStartIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.userName}>{item.user_name}</Text>
      <Text style={styles.description}>{item.Description}</Text>
      <ViewArrangement
        item={item.user_name}
        user={users}
        date={date}
        setDate={setDate}
        setAccept={setAccept}
        accept={accept}
      />
      <View style={styles.cancelButtonContainer}>
        <CancelAppointment item={item.user_name} user={users} />
      </View>
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

  useEffect(() => {
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
        <Button title="Prev" onPress={prevPage} disabled={startIndex === 0} />
        <Button
          title="Next"
          onPress={nextPage}
          disabled={startIndex === 10 || startIndex === 11}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF', // Set default background color to white
    marginTop:-20,
  },
  itemContainer: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  cancelButtonContainer: {
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
