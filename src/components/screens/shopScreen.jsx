import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductLoading,
  selectProductsMap,
} from "../store/categories/categoriesSelector";
import CategoriesPreview from "../CategoriesPreviews/categoriesPreview";
import { fetchProducts } from "../utils/apiUtils";

const ShopScreen = ({ navigation }) => {
  const isLoading = useSelector(selectProductLoading);
  const products = useSelector(selectProductsMap);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  const renderItem = ({ item }) => {
    const data = products[item];

    return <CategoriesPreview data={data} title={item} nav={navigation} />;
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={Object.keys(products)} // Assuming `products` is an object map
          renderItem={renderItem}
          keyExtractor={(item) => Math.random()} // Adjust this based on your data structure
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShopScreen;
