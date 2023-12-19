import { initialTaskCounts } from "@/empty-state-objects/empty";
import { TaskAnalytics } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { taskCounts: initialTaskCounts };

const taskCountsSlice = createSlice({
  name: "task-counts",
  initialState,

  reducers: {
    setTaskCounts(
      state: { taskCounts: Partial<TaskAnalytics> },
      action: PayloadAction<Partial<TaskAnalytics>>
    ) {
      state.taskCounts = action.payload;
    },
  },
});

export const { setTaskCounts } = taskCountsSlice.actions;
export const getTasksCounts = (state: RootState) => state.taskCounts.taskCounts;

export default taskCountsSlice.reducer;
