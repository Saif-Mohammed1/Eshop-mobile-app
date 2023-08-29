import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectHomeItems } from "../../store/home/homeSelector";

const Home = () => {
  const homeItems = useSelector(selectHomeItems);
  const renderItem = ({ item }) => {
    const { id, title, shop, route, imageUrl, imageFile } = item;
    const splitRoute = route.toLowerCase().split("shop/").pop();

    return (
      <View style={{ flexDirection: "row", gap: 3 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{id}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{shop}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{splitRoute}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {imageUrl ? imageUrl : "Empty"}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {imageFile ? imageFile : "Empty"}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>X</Text>
        </View>
      </View>
    );
  };
  return (
    // <ScrollView
    <View
      //   horizontal
      style={{ flex: 1 }}
      //   contentContainerStyle={styles.contentContainer}
      //   contentContainerStyle={{ flex: 1, paddingHorizontal: 4, gap: 3 }}
    >
      <ScrollView
        // style={{
        contentContainerStyle={{
          //   flex: 1,
          //   flexDirection: "row",
          //   height: 40,
          gap: 3,
          backgroundColor: "blue",
        }}
        horizontal
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Id</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Category</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shop</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Route</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ImageUrl</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ImageFile</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Actions</Text>
        </View>
      </ScrollView>
      <FlatList data={homeItems} renderItem={renderItem} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flexGrow: 1 }, // Added contentContainer style
  titleContainer: { flex: 1, overflow: "scroll" },
  title: {
    backgroundColor: "red",
    padding: 6,
    textAlign: "center",
  },
});
