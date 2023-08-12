import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dialogReducer from "./dialogSlice";
import formReducer from './formSlice';
import { firebaseApi } from "../api/firebaseApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialogs: dialogReducer,
    form: formReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware)
});
setupListeners(store.dispatch)