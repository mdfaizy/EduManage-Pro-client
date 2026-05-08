// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AdmissionState {
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: AdmissionState = {
//   loading: false,
//   error: null,
//   success: false,
// };

// const admissionSlice = createSlice({
//   name: "admission",
//   initialState,
//   reducers: {
//     setAdmissionLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setAdmissionSuccess: (state, action: PayloadAction<boolean>) => {
//       state.success = action.payload;
//     },
//     setAdmissionError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//     resetAdmissionState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
// });

// export const {
//   setAdmissionLoading,
//   setAdmissionSuccess,
//   setAdmissionError,
//   resetAdmissionState,
// } = admissionSlice.actions;

// export default admissionSlice.reducer;


import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { StudentFormData } from "@/components/types/studentForm";

import { initialFormState } from "@/utils/formUtils";

// ==============================
// Uploaded File Interface
// ==============================

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  url: string;
}

// ==============================
// State Interface
// ==============================

interface AdmissionState {
  // Form

  form: StudentFormData;

  // Uploaded Files

  uploadedFiles: Record<
    string,
    UploadedFile
  >;

  // Step

  currentStep: number;

  // API States

  loading: boolean;

  error: string | null;

  success: boolean;
}

// ==============================
// Initial State
// ==============================

const initialState: AdmissionState =
  {
    // Form

    form: initialFormState,

    // Files

    uploadedFiles: {},

    // Step

    currentStep: 1,

    // API

    loading: false,

    error: null,

    success: false,
  };

// ==============================
// Slice
// ==============================

const admissionSlice =
  createSlice({
    name: "admission",

    initialState,

    reducers: {
      // ==========================
      // Set Loading
      // ==========================

      setAdmissionLoading: (
        state,
        action: PayloadAction<boolean>
      ) => {
        state.loading =
          action.payload;
      },

      // ==========================
      // Set Success
      // ==========================

      setAdmissionSuccess: (
        state,
        action: PayloadAction<boolean>
      ) => {
        state.success =
          action.payload;
      },

      // ==========================
      // Set Error
      // ==========================

      setAdmissionError: (
        state,
        action: PayloadAction<
          string | null
        >
      ) => {
        state.error =
          action.payload;
      },

      // ==========================
      // Update Form Field
      // ==========================

      updateAdmissionField: (
        state,
        action: PayloadAction<{
          name: keyof StudentFormData;
          value:
            | string
            | boolean;
        }>
      ) => {
        const {
          name,
          value,
        } = action.payload;

        (
          state.form[
            name
          ] as
            | string
            | boolean
        ) = value;
      },

      // ==========================
      // Set Full Form
      // ==========================

      setAdmissionForm: (
        state,
        action: PayloadAction<StudentFormData>
      ) => {
        state.form =
          action.payload;
      },

      // ==========================
      // Upload File
      // ==========================

      uploadAdmissionFile: (
        state,
        action: PayloadAction<{
          documentType: string;

          fileData: UploadedFile;
        }>
      ) => {
        const {
          documentType,
          fileData,
        } = action.payload;

        state.uploadedFiles[
          documentType
        ] = fileData;

        // Auto Checkbox

        const checkboxName = `has${
          documentType.charAt(0).toUpperCase() +
          documentType.slice(1)
        }` as keyof StudentFormData;

        (
          state.form[
            checkboxName
          ] as boolean
        ) = true;
      },

      // ==========================
      // Remove File
      // ==========================

      removeAdmissionFile: (
        state,
        action: PayloadAction<string>
      ) => {
        const documentType =
          action.payload;

        delete state.uploadedFiles[
          documentType
        ];

        // Uncheck Checkbox

        const checkboxName = `has${
          documentType.charAt(0).toUpperCase() +
          documentType.slice(1)
        }` as keyof StudentFormData;

        (
          state.form[
            checkboxName
          ] as boolean
        ) = false;
      },

      // ==========================
      // Step Navigation
      // ==========================

      setCurrentStep: (
        state,
        action: PayloadAction<number>
      ) => {
        state.currentStep =
          action.payload;
      },

      nextStep: (state) => {
        state.currentStep += 1;
      },

      prevStep: (state) => {
        if (
          state.currentStep > 1
        ) {
          state.currentStep -= 1;
        }
      },

      // ==========================
      // Reset
      // ==========================

      resetAdmissionState:
        (state) => {
          state.form =
            initialFormState;

          state.uploadedFiles =
            {};

          state.currentStep = 1;

          state.loading = false;

          state.error = null;

          state.success = false;
        },
    },
  });

// ==============================
// Export Actions
// ==============================

export const {
  setAdmissionLoading,

  setAdmissionSuccess,

  setAdmissionError,

  updateAdmissionField,

  setAdmissionForm,

  uploadAdmissionFile,

  removeAdmissionFile,

  setCurrentStep,

  nextStep,

  prevStep,

  resetAdmissionState,
} = admissionSlice.actions;

// ==============================
// Export Reducer
// ==============================

export default admissionSlice.reducer;