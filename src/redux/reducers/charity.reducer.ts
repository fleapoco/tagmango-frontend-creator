import { initialCharitiesState } from "@/empty-state-objects/empty";
import { CharitiesType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { charity: initialCharitiesState };

const charitySlice = createSlice({
  name: "charity",
  initialState,

  reducers: {
    setCharity(
      state: { charity: CharitiesType },
      action: PayloadAction<CharitiesType>
    ) {
      state.charity = action.payload;
    },
  },
});

export const { setCharity } = charitySlice.actions;
export const getCharityStored = (state: RootState) => state.charity.charity;

export default charitySlice.reducer;
