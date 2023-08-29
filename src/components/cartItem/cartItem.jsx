import React from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../store/cart/cartSlice";
import {
  addProductToCart,
  clearCartItem,
  removeProductFromCart,
} from "../store/cart/cartAction/cartAction";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const CartItem = ({ item, cartItems }) => {
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    // Implement your logic to increase the quantity of the item in the cart
    dispatch(setCart(addProductToCart(cartItems, item)));
  };

  const decreaseQuantity = (item) => {
    dispatch(setCart(removeProductFromCart(cartItems, item)));
  };
  const clearItems = (item) => {
    dispatch(setCart(clearCartItem(cartItems, item)));
  };
  const { id, imageFile, imageUrl, name, price, quantity } = item;

  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 8 }}>
      {/* <View style={{ flex: 1 }}> */}
      <Image
        source={imageFile ? { uri: imageFile } : { uri: imageUrl }}
        style={{ height: 200, flex: 1 }}
      />
      {/* </View> */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
        <Text style={styles.price}>Price: {price}$</Text>
        <View
          style={{
            ...styles.quantityContainer,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => decreaseQuantity(item)}>
            <Text style={{ fontSize: 20, color: "red", marginRight: 10 }}>
              -
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>{quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item)}>
            <Text
              style={{
                fontSize: 20,
                color: "green",
                marginLeft: 10,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => clearItems(item)}
        style={{
          width: "fit-content",
          // alignItems: "center",
          // justifyContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text style={{ fontSize: 20 }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  price: {
    marginTop: 10,
  },
  quantityContainer: { marginTop: 10 },
});
