import { DataAnalyticsTypes } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { dataAnalytics: [] };

const taskSlice = createSlice({
  name: "data-analytics",
  initialState,

  reducers: {
    setDataAnalytics(
      state: { dataAnalytics: DataAnalyticsTypes[] },
      action: PayloadAction<DataAnalyticsTypes[]>
    ) {
      state.dataAnalytics = action.payload;
    },
  },
});

export const { setDataAnalytics } = taskSlice.actions;
export const getDataAnalyticsStored = (state: RootState) =>
  state.dataAnalytics.dataAnalytics;

export default taskSlice.reducer;
