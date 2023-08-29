import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";

import homeSlice from "./home/homeSlice";
import categoriesSlice from "./categories/categoriesSlice";
import userSlice from "./user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./cart/cartSlice";

//  const rootReducer = configureStore({
//   reducer: { home: homeSlice, category: categoriesSlice, user: userSlice },
// });
const rootReducer = combineReducers({
  home: homeSlice,
  category: categoriesSlice,
  user: userSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart", "user"],
};

const persistReducerHandler = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistReducerHandler });

export const persistor = persistStore(store);
