import React from "react";
import {
  selectHomeIsLoading,
  selectHomeItems,
} from "../store/home/homeSelector";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import HomeItems from "../home-items/homeItems";
import ImageSlide from "../ImageSlide/ImageSlide";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const items = useSelector(selectHomeItems);
  const isLoading = useSelector(selectHomeIsLoading);
  const image = [
    require("../../assets/Image/fashion-store-732263_1920.jpg"),
    require("../../assets/Image/jeans-2597210_1920.jpg"),
    require("../../assets/Image/store-4027251_1920.jpg"),
    require("../../assets/Image/store-906722_1920.jpg"),
    require("../../assets/Image/hats.jpg"),
    require("../../assets/Image/kids.jpg"),
    require("../../assets/Image/pants.jpg"),
    require("../../assets/Image/shose.jpg"),
    require("../../assets/Image/sofa.jpg"),
    require("../../assets/Image/suit.jpg"),
    require("../../assets/Image/tshirt.jpg"),
  ];
  return (
    <>
      {isLoading ? (
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 8 }}>
          {/* <ImageBackground
              source={require("../../assets/Image/fashion-store-732263_1920.jpg")}
              resizeMode="cover"
              style={{
                padding: 8,
                height: Dimensions.get("window").height,
              }}
            > */}
          <View style={{ marginVertical: 8 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                opacity: 0.8,
                color: "gray",
              }}
            >
              Hello And Welcome!
            </Text>
            <Text
              style={{
                marginTop: 8,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "rgba(15, 164, 250, 0.699)",
              }}
            >
              Find The Most Luxurious Clothes
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              backgroundColor: "rgba(92, 49, 194, 0.7)",
              // borderRadius: 13,
              paddingHorizontal: 8,
            }}
          >
            <TextInput
              placeholder="What Are You Looking for...?"
              style={{
                flex: 1,
                paddingVertical: 8,
                // color: "white", // Text color
                fontWeight: "bold",
              }}
              placeholderTextColor="rgba(255, 255, 255, 0.7)" // Slightly tinted white
              onPressIn={() => navigation.navigate("Search")}
            />
            <FontAwesome5
              name="search"
              size={24}
              color="white"
              style={{ position: "absolute", right: 8 }}
            />
          </View>

          <ImageSlide image={image} />
          {/* </ImageBackground> */}

          <FlatList
            data={items}
            renderItem={({ item }) => {
              return <HomeItems item={item} />;
            }}
          />
        </View>
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
