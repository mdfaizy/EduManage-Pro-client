import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdmissionState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdmissionState = {
  loading: false,
  error: null,
  success: false,
};

const admissionSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    setAdmissionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAdmissionSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setAdmissionError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetAdmissionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setAdmissionLoading,
  setAdmissionSuccess,
  setAdmissionError,
  resetAdmissionState,
} = admissionSlice.actions;

export default admissionSlice.reducer;