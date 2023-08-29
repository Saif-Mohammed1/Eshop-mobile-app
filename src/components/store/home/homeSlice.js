import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    items: [],
    isLoading: true,
  },
  reducers: {
    setHomeItems: (state, action) => {
      const { payload } = action;

      state.items = payload;
      state.isLoading = false;
    },
  },
});
export const { setHomeItems } = homeSlice.actions;
export default homeSlice.reducer;
