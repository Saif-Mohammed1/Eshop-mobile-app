import React from "react";
import { StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSelector } from "react-redux";
import { selectProductsMap } from "../store/categories/categoriesSelector";
import ProductCard from "../productCard/productCard";

const Category = ({ route }) => {
  const { title } = route.params;
  const product = useSelector(selectProductsMap);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title.toUpperCase()}</Text>
      {product[title] ? (
        <VirtualizedList
          data={product[title]}
          keyExtractor={() => Math.random()}
          getItemCount={() => product[title].length}
          getItem={(data, index) => data[index]}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "gray",
              textAlign: "center",
            }}
          >
            There are no Products related to {title.toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginVertical: 12, flex: 1 },
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

export default Category;
