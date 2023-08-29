import api from "../../../utils/axios/axios";

export const addProductToCart = (currentItems, newItem) => {
  const existingItem = currentItems.find((item) => item.id === newItem.id);

  if (existingItem) {
    // Item already exists in the cart, you might want to update its quantity or something.
    // For example:

    return currentItems.map((cartItem) =>
      cartItem.id === newItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...currentItems, { ...newItem, quantity: 1 }];
};

export const removeProductFromCart = (currentItems, product) => {
  const existingItem = currentItems.find((item) => item.id === product.id);

  if (existingItem) {
    if (existingItem.quantity === 1) {
      // Remove the item from the cart when its quantity reaches 0
      return currentItems.filter((item) => item.id !== product.id);
    } else {
      // Decrease the quantity of the item
      return currentItems.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }
};

export const clearCartItem = (currentItems, product) => {
  return currentItems.filter((item) => item.id !== product.id);
};
