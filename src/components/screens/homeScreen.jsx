import React from "react";
import {
  selectHomeIsLoading,
  selectHomeItems,
} from "../store/home/homeSelector";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeItems from "../home-items/homeItems";

// AsyncStorage.clear();

const HomeScreen = () => {
  const items = useSelector(selectHomeItems);
  const isLoading = useSelector(selectHomeIsLoading);

  return (
    <>
      {isLoading ? (
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return <HomeItems item={item} />;
          }}
        />
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
