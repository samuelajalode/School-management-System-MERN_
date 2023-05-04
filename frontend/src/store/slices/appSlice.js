import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebarShow: "responsive",
    showLoading: false,
  },
  reducers: {
    set: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setLoading: (state, action) => {
      console.log(action.payload);
      state.showLoading = action.payload;
    },
  },
});

export const { set, setLoading } = appSlice.actions;
export const selectSidebarShow = (state) => state.app.sidebarShow;
export const selectShowLoading = (state) => state.app.showLoading;

export default appSlice.reducer;
