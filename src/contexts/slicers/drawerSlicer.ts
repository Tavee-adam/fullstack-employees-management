import { createSlice } from "@reduxjs/toolkit";
import { DrawerState } from "../types/drawer";

const initialState: DrawerState = {
  isDrawerOpen: false,
};

const drawerSlice = createSlice({
  name: "drawerSlicer",
  initialState,
  reducers: {
    setDrawerOpen: (state: any) => {
      state.isDrawerOpen = true;
    },
    setDrawerClose: (state: any) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { setDrawerOpen, setDrawerClose } = drawerSlice.actions;
export const selectIsDrawerOpen = (state: any) =>
  state.drawerSlicer.isDrawerOpen;

export default drawerSlice.reducer;
