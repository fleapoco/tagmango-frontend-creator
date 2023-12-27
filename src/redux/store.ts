import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import dataAnalyticReducer from "./reducers/analytics.reducer";
import charityReducer from "./reducers/charity.reducer";
import taskCountsReducer from "./reducers/task-counts.reducer";
import taskReducer from "./reducers/task.reducer";
import updateAnalyticReduce from "./reducers/update-analytic.reducer";
import userReducer from "./reducers/user.reducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskCounts: taskCountsReducer,
    dataAnalytics: dataAnalyticReducer,
    charity: charityReducer,
    updateDataAnalytic: updateAnalyticReduce,

    user: userReducer,
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
