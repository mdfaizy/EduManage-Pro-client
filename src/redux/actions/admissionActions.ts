import { AppDispatch } from "@/redux/store";

import {
  setAdmissionLoading,
  setAdmissionSuccess,
  setAdmissionError,
  resetAdmissionState,
} from "../admissionSlice";

import { createAdmissionAPI } from "@/services/admissionService";

import { StudentFormData } from "@/components/types/studentForm";

import toast from "react-hot-toast";

// =====================================
// Create Admission Action
// =====================================

export const createAdmission =
  (
    formData: StudentFormData
  ) =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      // Loading

      dispatch(
        setAdmissionLoading(
          true
        )
      );

      // Reset Error

      dispatch(
        setAdmissionError(
          null
        )
      );

      // API Call

      const response =
        await createAdmissionAPI(
          formData
        );

      // Success

      if (
        response?.data?.success
      ) {
        dispatch(
          setAdmissionSuccess(
            true
          )
        );

        toast.success(
          "Admission submitted successfully"
        );

        // Optional Reset

        setTimeout(() => {
          dispatch(
            resetAdmissionState()
          );
        }, 1000);
      }
    } catch (error: any) {
      console.error(error);

      dispatch(
        setAdmissionError(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        )
      );

      toast.error(
        error?.response?.data
          ?.message ||
          "Admission failed"
      );
    } finally {
      dispatch(
        setAdmissionLoading(
          false
        )
      );
    }
  };