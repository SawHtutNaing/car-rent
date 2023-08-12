import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAuthModal: false,
  isCarFormVisible: false,
  showLogoutModal: false,
};

export const dialogSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    toggleAuthModal: (state, action) => {
      state.showAuthModal = action.payload.show;
    },
    toggleLogoutModal: (state, action) => {
      state.showLogoutModal = action.payload.show;
    },
    toggleCarFormVisible: (state, action) => {
      state.isCarFormVisible = action.payload.show;
    },
  },
});

export const { toggleAuthModal, toggleLogoutModal, toggleCarFormVisible } =
  dialogSlice.actions;

export default dialogSlice.reducer;
