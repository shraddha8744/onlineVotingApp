// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from "../slice/userSlice"

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
