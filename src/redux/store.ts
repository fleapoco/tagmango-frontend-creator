import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/task.reducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
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
