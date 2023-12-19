import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import taskCountsReducer from "./reducers/task-counts.reducer";
import taskReducer from "./reducers/task.reducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskCounts: taskCountsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
