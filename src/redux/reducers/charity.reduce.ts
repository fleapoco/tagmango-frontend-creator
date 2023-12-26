import { CharitiesType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { charities: [] };

const charitySlice = createSlice({
  name: "charities",
  initialState,

  reducers: {
    setCharities(
      state: { charities: CharitiesType[] },
      action: PayloadAction<CharitiesType[]>
    ) {
      state.charities = action.payload;
    },
  },
});

export const { setCharities } = charitySlice.actions;
export const getCategoriesStored = (state: RootState) =>
  state.charities.charities;

export default charitySlice.reducer;
