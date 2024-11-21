import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./datas/authSlice";
import languageSlice from "./datas/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    language: languageSlice,
  },
});