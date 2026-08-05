// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FeeState, StudentFee } from "@/components/types/feeTypes";

// const initialState: FeeState = {
//   fees: [],
//   loading: false,
//   error: null,
// };

// const feeSlice = createSlice({
//   name: "fee",

//   initialState,

//   reducers: {
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },

//     setFees(state, action: PayloadAction<StudentFee[]>) {
//       state.fees = action.payload;
//       state.loading = false;
//       state.error = null;
//     },

//     addFee(state, action: PayloadAction<StudentFee>) {
//       state.fees.unshift(action.payload);
//     },

//     updateFee(state, action: PayloadAction<StudentFee>) {
//       const index = state.fees.findIndex(
//         (fee) => fee.id === action.payload.id
//       );

//       if (index !== -1) {
//         state.fees[index] = action.payload;
//       }
//     },

//     removeFee(state, action: PayloadAction<number>) {
//       state.fees = state.fees.filter(
//         (fee) => fee.id !== action.payload
//       );
//     },

//     setError(state, action: PayloadAction<string | null>) {
//       state.error = action.payload;
//       state.loading = false;
//     },

//     clearFees(state) {
//       state.fees = [];
//     },
//   },
// });

// export const {
//   setLoading,
//   setFees,
//   addFee,
//   updateFee,
//   removeFee,
//   setError,
//   clearFees,
// } = feeSlice.actions;

// export default feeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FeeState,
  StudentFee,
  PaymentHistory,
  StudentConcession,
  StudentFine,
} from "@/components/types/feeTypes";

const initialState: FeeState = {
  fees: [],

  selectedFee: null,

  paymentHistory: [],

  concessions: [],

  fines: [],

  loading: false,

  error: null,
};

const feeSlice = createSlice({
  name: "fee",

  initialState,

  reducers: {
    /* -------------------------------------------------------------------------- */
    /* Loading */
    /* -------------------------------------------------------------------------- */

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    /* -------------------------------------------------------------------------- */
    /* Fees */
    /* -------------------------------------------------------------------------- */

    setFees(state, action: PayloadAction<StudentFee[]>) {
      state.fees = action.payload;
      state.loading = false;
      state.error = null;
    },

    addFee(state, action: PayloadAction<StudentFee>) {
      state.fees.unshift(action.payload);
    },

    updateFee(state, action: PayloadAction<StudentFee>) {
      const index = state.fees.findIndex(
        (fee) => fee.id === action.payload.id
      );

      if (index !== -1) {
        state.fees[index] = action.payload;
      }

      if (
        state.selectedFee &&
        state.selectedFee.id === action.payload.id
      ) {
        state.selectedFee = action.payload;
      }
    },

    removeFee(state, action: PayloadAction<number>) {
      state.fees = state.fees.filter(
        (fee) => fee.id !== action.payload
      );

      if (state.selectedFee?.id === action.payload) {
        state.selectedFee = null;
      }
    },

    /* -------------------------------------------------------------------------- */
    /* Selected Fee */
    /* -------------------------------------------------------------------------- */

    setSelectedFee(
      state,
      action: PayloadAction<StudentFee | null>
    ) {
      state.selectedFee = action.payload;
    },

    clearSelectedFee(state) {
      state.selectedFee = null;
    },

    /* -------------------------------------------------------------------------- */
    /* Payment History */
    /* -------------------------------------------------------------------------- */

    setPaymentHistory(
      state,
      action: PayloadAction<PaymentHistory[]>
    ) {
      state.paymentHistory = action.payload;
    },

    clearPaymentHistory(state) {
      state.paymentHistory = [];
    },

    /* -------------------------------------------------------------------------- */
    /* Concessions */
    /* -------------------------------------------------------------------------- */

    setConcessions(
      state,
      action: PayloadAction<StudentConcession[]>
    ) {
      state.concessions = action.payload;
    },

    clearConcessions(state) {
      state.concessions = [];
    },

    /* -------------------------------------------------------------------------- */
    /* Fine */
    /* -------------------------------------------------------------------------- */

    setFines(
      state,
      action: PayloadAction<StudentFine[]>
    ) {
      state.fines = action.payload;
    },

    clearFines(state) {
      state.fines = [];
    },

    /* -------------------------------------------------------------------------- */
    /* Error */
    /* -------------------------------------------------------------------------- */

    setError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
      state.loading = false;
    },

    /* -------------------------------------------------------------------------- */
    /* Reset */
    /* -------------------------------------------------------------------------- */

    clearFees(state) {
      state.fees = [];
      state.selectedFee = null;
      state.paymentHistory = [];
      state.concessions = [];
      state.fines = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,

  setFees,
  addFee,
  updateFee,
  removeFee,

  setSelectedFee,
  clearSelectedFee,

  setPaymentHistory,
  clearPaymentHistory,

  setConcessions,
  clearConcessions,

  setFines,
  clearFines,

  setError,

  clearFees,
} = feeSlice.actions;

export default feeSlice.reducer;