import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "./slicers/drawerSlicer";
export const store = configureStore({
  reducer: {
    drawerSlicer: drawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
