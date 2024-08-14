import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    ThemeSlice,
    AuthSlice,
  },
});

export default store;
