import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    products: [],
    isLoading: true,
  },
  reducers: {
    setProducts: (state, action) => {
      const { payload } = action;

      state.products = payload;
      state.isLoading = false;
    },
  },
});
export const { setProducts } = categorySlice.actions;
export default categorySlice.reducer;
