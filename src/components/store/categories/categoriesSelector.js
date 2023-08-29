import { createSelector } from "@reduxjs/toolkit";

const selectCategory = (state) => state.category;

export const selectProductsArray = createSelector(
  [selectCategory],
  (category) => category.products
);
export const selectProductsMap = createSelector([selectCategory], (category) =>
  category.products.reduce((acc, item) => {
    const key = item.title;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {})
);

export const selectProductLoading = createSelector(
  [selectCategory],
  (category) => category.isLoading
);
