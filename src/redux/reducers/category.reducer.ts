import { CategoryType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { categories: [] };

const categorySlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setCategories(
      state: { categories: CategoryType[] },
      action: PayloadAction<CategoryType[]>
    ) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const getCategoriesStored = (state: RootState) =>
  state.categories.categories;

export default categorySlice.reducer;
