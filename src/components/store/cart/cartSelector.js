import { createSelector } from "@reduxjs/toolkit";

const selectCart = (state) => state.cart;

export const selectCartItem = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
export const selectCartLoading = createSelector(
  [selectCart],
  (cart) => cart.isLoading
);
export const selectTotalPrice = createSelector([selectCart], (cart) =>
  cart.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
export const selectCartCount = createSelector([selectCart], (cart) =>
  cart.cartItems.reduce((total, item) => total + item.quantity, 0)
);
