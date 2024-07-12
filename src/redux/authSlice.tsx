import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginUserSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.error = null;
      state.loading = false;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginUserSuccess, logoutUser, setLoading, setError } =
  authSlice.actions;

export default authSlice;
