import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  isAdmin: false,
  authed: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      const { name, email, isAdmin, authed } = action.payload;
      state.name = name;
      state.email = email;
      state.isAdmin = isAdmin;
      state.authed = authed;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthedUser } = authSlice.actions;

export default authSlice.reducer;
