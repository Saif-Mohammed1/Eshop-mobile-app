import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import ProductCard from "../productCard/productCard";
// import Carousel from "react-native-snap-carousel";

const CategoriesPreview = ({ data, title, nav }) => {
  const onPress = () => {
    nav.navigate("Category", { title });
  };
  const renderedData = data.filter((_, index) => index < 4);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}> {title.toUpperCase()}</Text>
      </TouchableOpacity>
      <VirtualizedList
        data={renderedData}
        keyExtractor={(item) => Math.random()}
        getItemCount={() => renderedData.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <ProductCard item={item} width={Dimensions.get("window").width} />
        )}
        horizontal
        // ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Add space between items
        pagingEnabled
      />
      {/* <Carousel
        ref={(item) => {
          this.carousel = item;
        }}
        data={renderedData}
        renderItem={({ item }) => <ProductCard item={item} />}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width - 30}
        loop={true}
        layout={"default"}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  title: {
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    backgroundColor: "#7777",
    color: "white",
    padding: 10,
  },
});

export default CategoriesPreview;
