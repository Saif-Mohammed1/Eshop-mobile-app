import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const HomeItems = ({ item }) => {
  const { title, shop, route, imageUrl, imageFile } = item;
  const navigation = useNavigation();
  const splitRoute = route.toLowerCase().split("shop/").pop();
  const navigate = () => {
    navigation.navigate("Category", { title: splitRoute });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={imageFile ? { uri: imageFile } : { uri: imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.overlayContainer}>
          <TouchableOpacity style={styles.overlay} onPress={navigate}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.shop}>{shop}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add any container styles you need
    marginTop: 20,
  },
  imageBackground: {
    width: "100%",
    height: 200, // Set the height as needed
    // Add other imageBackground styles
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
    padding: 16,
    alignSelf: "center", // Center the overlay horizontally
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  shop: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default HomeItems;
