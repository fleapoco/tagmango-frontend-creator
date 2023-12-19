import { GetTask } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { tasks: [] };

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    setTasks(state: { tasks: GetTask[] }, action: PayloadAction<GetTask[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export const getTaskStored = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
