import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData, UserState } from "../utils/interface";

const initialState: UserState = {
  userInfo: [],
  loading: false,
  error: false,
  hasLoadedFakeData: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadFakeData: (state, action) => {
      if (!state.hasLoadedFakeData) {
        // Ne charge que si les fake-data ne sont pas encore chargées
        state.userInfo = [...state.userInfo, ...action.payload.users];
        state.hasLoadedFakeData = true; // Marquer comme chargé
      }
    },
    setNewUser: (state, action: PayloadAction<FormData>) => {
      state.userInfo.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNewUser, setLoading, setError } = userSlice.actions;
export default userSlice;
