import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
