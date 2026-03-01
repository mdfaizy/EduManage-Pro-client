import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: StudentState = {
  loading: false,
  error: null,
  success: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetStudentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  resetStudentState,
} = studentSlice.actions;

export default studentSlice.reducer;