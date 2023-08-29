import React from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../utils/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../utils/apiUtils";
import { Fragment } from "react";
import { selectIsAdmin } from "../store/user/userSelector";
import { selectCartItem } from "../store/cart/cartSelector";
import { addProductToCart } from "../store/cart/cartAction/cartAction";
import { setCart } from "../store/cart/cartSlice";
import { memo } from "react";

const ProductCard = memo(({ item, width }) => {
  const { id, imageFile, imageUrl, name, price, rating } = item;

  const isAdmin = useSelector(selectIsAdmin);
  const cartItems = useSelector(selectCartItem);

  const dispatch = useDispatch();
  const deleteItem = async () => {
    try {
      await api.delete(`/products/${id}`);

      fetchProducts(dispatch);
    } catch (error) {
      Alert.alert("failed to delete the product");
    }
  };

  const addItemHandler = () => {
    dispatch(setCart(addProductToCart(cartItems, item)));
  };
  return (
    <View
      style={{
        ...styles.container,
        width: width ? width : "",
        padding: width ? 6 : "",
      }}
    >
      <ImageBackground
        source={imageFile ? { uri: imageFile } : { uri: imageUrl }}
        resizeMode="cover"
        style={styles.Image}
      />
      {isAdmin && (
        <TouchableOpacity style={styles.delete} onPress={deleteItem}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>X</Text>
        </TouchableOpacity>
      )}
      {
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -50 }, { translateY: -50 }],
          }}
        >
          <TouchableOpacity onPress={addItemHandler}>
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "gray",
                opacity: 0.9,
                padding: 8,
                fontWeight: "700",
              }}
            >
              Add Product
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={deleteItem}>
            <Text style={{ fontSize: 20 }}>{">"}</Text>
          </TouchableOpacity> */}
        </View>
      }
      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: 20,
            color: "#777",
            letterSpacing: 0.8,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {name}
        </Text>
        <View>
          <Text style={{ fontSize: 20, textAlign: "right" }}>{price}</Text>
          {rating && (
            <Text
              style={{ textAlign: "right", paddingVertical: 1.5, fontSize: 20 }}
            >
              {Array(rating * 1)
                .fill()
                .map((_, i) => (
                  <Fragment key={Math.random()}>
                    <Text>⭐</Text>
                  </Fragment>
                ))}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    position: "relative",
  },
  Image: {
    width: "100%",
    // flex: 1,
    height: 200,
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#eee",
    padding: 4,
    paddingHorizontal: 8,
  },
  textContainer: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-between",
    padding: 5,
  },
});
export default ProductCard;
