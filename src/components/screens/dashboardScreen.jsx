import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "../dashboard/home/home";

const DashboardScreen = () => {
  const [page, setPage] = useState("home");

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity
          onPress={() => setPage("home")}
          style={styles.titleContainer}
        >
          <Text
            style={{
              ...styles.title,
              backgroundColor: page === "home" ? "red" : "transparent",
            }}
          >
            Home Items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPage("product")}
          style={styles.titleContainer}
        >
          <Text
            style={{
              ...styles.title,
              backgroundColor: page === "product" ? "red" : "transparent",
            }}
          >
            Product Items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPage("user")}
          style={styles.titleContainer}
        >
          <Text
            style={{
              ...styles.title,
              backgroundColor: page === "user" ? "red" : "transparent",
            }}
          >
            Users
          </Text>
        </TouchableOpacity>
      </View>
      {page === "home" && <Home />}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    marginVertical: 8,
    backgroundColor: "white",
  },
  titleContainer: { flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", padding: 8, textAlign: "center" },
});
