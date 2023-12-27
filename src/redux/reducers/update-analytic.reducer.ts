import { initialDataAnalyticsState } from "@/empty-state-objects/empty";
import { DataAnalyticsTypes } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { updateAnalytic: initialDataAnalyticsState };

const taskSlice = createSlice({
  name: "update-analytic",
  initialState,

  reducers: {
    setUpdateDataAnalytic(
      state: { updateAnalytic: DataAnalyticsTypes },
      action: PayloadAction<DataAnalyticsTypes>
    ) {
      state.updateAnalytic = action.payload;
    },
  },
});

export const { setUpdateDataAnalytic } = taskSlice.actions;
export const getUpdateDataAnalyticState = (state: RootState) =>
  state.updateDataAnalytic.updateAnalytic;

export default taskSlice.reducer;
