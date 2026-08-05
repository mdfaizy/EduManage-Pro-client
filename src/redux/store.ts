// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roleReducer from "./roleSlice";
import studentReducer from "./studentSlice";
import admissionReducer from "./admissionSlice";
import feeReducer from "./feeSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
     student: studentReducer,
    admission: admissionReducer,
    fees: feeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
