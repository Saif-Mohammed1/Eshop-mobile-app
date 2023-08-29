import { createSelector } from "@reduxjs/toolkit";

const selectHome = (state) => state.home;

export const selectHomeItems = createSelector(
  [selectHome],
  (home) => home.items
);
export const selectHomeIsLoading = createSelector(
  [selectHome],
  (home) => home.isLoading
);
