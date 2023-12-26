import { UserDetails } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    roles: [],
    profilePicUrl: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state: { user: UserDetails }, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUserStored = (state: RootState) => state.user.user;

export default userSlice.reducer;
