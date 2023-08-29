// apiUtils.js

import { Alert } from "react-native";
import { setHomeItems } from "../store/home/homeSlice";
import api from "./axios/axios";
import { setProducts } from "../store/categories/categoriesSlice";

export const fetchHomeItem = async (dispatch) => {
  try {
    const { data } = await api.get(`/home`);

    dispatch(setHomeItems(data));
  } catch (error) {
    Alert.alert("Error", "Oops! Something went wrong. Please try again later.");
  }
};
export const fetchProducts = async (dispatch) => {
  try {
    const { data } = await api.get("/products");
    dispatch(setProducts(data));
  } catch (error) {
    Alert.alert("Oops! Something went wrong. Please try again later.");
  }
};
