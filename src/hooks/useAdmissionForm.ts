import { useState, useCallback } from "react";
import { initialFormState } from "../utils/formUtils";
import { toast } from "react-hot-toast";
import { StudentFormData } from "@/components/types/studentForm";

export const useAdmissionForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [uploadedFiles, setUploadedFiles] = useState({});

 const updateForm = useCallback(
  (
    name: keyof StudentFormData,
    value: string | boolean
  ) => {
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      console.log(
        "Updated Form:",
        updatedForm
      );

      return updatedForm;
    });
  },
  []
);

  const uploadFile = useCallback((file, documentType) => {
    const fileSize = (file.size / 1024).toFixed(2);
    const url = URL.createObjectURL(file);
    
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: { file, name: file.name, size: fileSize, url }
    }));

    const checkboxName = `has${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
    setForm(prev => ({ ...prev, [checkboxName]: true }));

    toast.success(`${file.name} uploaded successfully`);
  }, []);

  const removeFile = useCallback((documentType) => {
    if (uploadedFiles[documentType]?.url) {
      URL.revokeObjectURL(uploadedFiles[documentType].url);
    }

    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentType];
      return newFiles;
    });

    const checkboxName = `has${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
    setForm(prev => ({ ...prev, [checkboxName]: false }));
  }, [uploadedFiles]);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setUploadedFiles({});
  }, []);

  return { form, uploadedFiles, updateForm, setForm, uploadFile, removeFile, resetForm };
};