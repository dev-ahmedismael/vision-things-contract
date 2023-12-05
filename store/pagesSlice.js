import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: [],
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },
  },
});

export const { setPages } = pagesSlice.actions;

export default pagesSlice.reducer;
