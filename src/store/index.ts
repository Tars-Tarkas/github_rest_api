import { configureStore } from "@reduxjs/toolkit";
import githubSlice from "./githubSlice";

export const store = configureStore({
  reducer: {
    gs: githubSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
