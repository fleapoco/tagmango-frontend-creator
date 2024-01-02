import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false };

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export const currentLoaderState = (state: { loader: { loading: boolean } }) =>
  state.loader?.loading;
export default loaderSlice.reducer;
