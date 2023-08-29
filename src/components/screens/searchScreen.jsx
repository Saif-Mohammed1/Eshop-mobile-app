import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductLoading,
  selectProductsArray,
} from "../store/categories/categoriesSelector";
import { fetchProducts } from "../utils/apiUtils";
import ProductCard from "../productCard/productCard";
import { FontAwesome } from "@expo/vector-icons";

const SearchScreen = () => {
  const [name, setName] = useState("");
  const categoriesArray = useSelector(selectProductsArray);
  const isLoading = useSelector(selectProductLoading);
  const flatRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  const onTextChangeHandler = (text) => {
    setName(text);
  };
  const filteredCategories = categoriesArray.filter((category) =>
    category.name.toLowerCase().startsWith(name.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{ flex: 1, padding: 6 }}>
          <View>
            <TextInput
              value={name}
              onChangeText={onTextChangeHandler}
              placeholder="what you are looking for"
              style={{
                backgroundColor: "white",
                //   filteredCategories.length > 0 && name !== ""
                //     ? "white"
                //     : "#a38354ed",
                color: "#0c070733",
                padding: 8,
                marginTop: 8,
                // fontWeight: "bold",
                fontSize: 18,
                letterSpacing: 1.2,
              }}
            />
          </View>
          {filteredCategories.length > 0 && name !== "" && (
            <View style={{ flex: 1, marginTop: 8 }}>
              <FlatList
                ref={(ref) => (flatRef.current = ref)}
                data={filteredCategories}
                renderItem={({ item }) => <ProductCard item={item} />}
              />
            </View>
          )}
          {filteredCategories.length > 0 && name === "" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "white",
              }}
            >
              <FontAwesome name="search" size={60} color="gray" />

              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  color: "gray",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                What Are You Looking For............?
              </Text>
            </View>
          )}
          {filteredCategories.length === 0 && name !== "" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "white",
              }}
            >
              <FontAwesome name="search" size={60} color="gray" />

              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                There is no product with such name
              </Text>
            </View>
          )}
        </View>
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
export default SearchScreen;
