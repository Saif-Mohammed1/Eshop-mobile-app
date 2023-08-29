import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: true,
  },
  reducers: {
    setCart: (state, action) => {
      const { payload } = action;

      state.cartItems = payload;
      state.isLoading = false;
    },
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
