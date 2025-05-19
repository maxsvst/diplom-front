import { configureStore } from "@reduxjs/toolkit";

import rpdReducer from "../app/slices/rpdSlice";

export const store = configureStore({
  reducer: {
    rpd: rpdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
