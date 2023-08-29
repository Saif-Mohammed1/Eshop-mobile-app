import React from "react";
import { Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectCartItem, selectTotalPrice } from "../store/cart/cartSelector";
import CartItem from "../cartItem/cartItem";

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(selectCartItem);
  const total = useSelector(selectTotalPrice);
  return (
    <View
      style={{
        flex: 1,
        alignItems: cartItems.length > 0 ? "" : "center",
        justifyContent: cartItems.length > 0 ? "" : "center",
      }}
    >
      {cartItems.length > 0 ? (
        <>
          <View
            style={{
              flex: 1,
              //   marginBottom: 10,
            }}
          >
            <FlatList
              data={cartItems}
              // keyExtractor={() => Math.random()}
              // getItemCount={() => cartItems.length}
              // getItem={(data, index) => data[index]}
              renderItem={({ item }) => (
                <CartItem item={item} cartItems={cartItems} />
              )}
              //   horizontal
              //   pagingEnabled
              //   snapToAlignment="center"
              //   showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text
            style={{
              //   textAlign: "right",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 6,
              paddingHorizontal: 6,
            }}
          >
            Total : {Math.ceil(total)}$
          </Text>
        </>
      ) : (
        <>
          <Ionicons name="cart-outline" size={60} color="gray" />

          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              color: "gray",
              letterSpacing: 1.1,
              fontWeight: "bold",
            }}
          >
            The Cart Is Empty...!
          </Text>
        </>
      )}
    </View>
  );
};

export default CartScreen;
