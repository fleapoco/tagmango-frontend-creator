import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/category.reducer";
import dataAnalyticReducer from "./reducers/data-analytic.reducer";
import taskCountsReducer from "./reducers/task-counts.reducer";
import taskReducer from "./reducers/task.reducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskCounts: taskCountsReducer,
    dataAnalytics: dataAnalyticReducer,
    categories: categoryReducer,
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