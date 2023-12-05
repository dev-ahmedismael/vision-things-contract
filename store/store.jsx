import { configureStore } from "@reduxjs/toolkit";
import contractReducer from "./contractSlice";
import pagesReducer from "./pagesSlice.js";

export const store = configureStore({
  reducer: {
    contract: contractReducer,
    pages: pagesReducer,
  },
});
