import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: true,
    admin: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      const { payload } = action;
      state.currentUser = payload;
      state.isLoading = false;
    },
    setUserAdmin: (state, action) => {
      const { payload } = action;
      let value;
      if (payload == 0) {
        value = false;
      } else if (payload == 1) {
        value = true;
      }
      state.admin = value;
    },
  },
});
export const { setCurrentUser, setUserAdmin } = userSlice.actions;
export default userSlice.reducer;
