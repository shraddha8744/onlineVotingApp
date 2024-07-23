// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    role:"voter"
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    changeRole: (state,action) => {
      state.role=action.payload;
    },
  },
});

export const { login, logout,changeRole } = loginSlice.actions;

export default loginSlice.reducer;
