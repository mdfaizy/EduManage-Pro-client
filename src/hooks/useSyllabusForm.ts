import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SyllabusService } from "@/services/syllabus.service";
// import { Option } from "@/types/common";

export interface Option {
  id: number;
  name: string;
}

export const useSyllabusForm = (
  paramClassId?: string | null,
  paramGradeId?: string | null
) => {
  const [subjects, setSubjects] = useState<Option[]>([]);
  const [classes, setClasses] = useState<Option[]>([]);
  const [grades, setGrades] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subjectId: "",
    classId: "",
    gradeId: "",
    type: "CORE",
    chapters: "",
    maxMarks: "",
    passMarks: ""
  });

  // Prefill from URL
  useEffect(() => {
    setForm(f => ({
      ...f,
      classId: paramClassId || "",
      gradeId: paramGradeId || ""
    }));
  }, [paramClassId, paramGradeId]);

  // Load dropdowns
  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const [subRes, classRes, gradeRes] = await Promise.all([
          SyllabusService.getSubjects(),
          SyllabusService.getClasses(),
          SyllabusService.getGrades()
        ]);

        setSubjects(subRes.data?.data || []);
        setClasses(classRes.data?.data || classRes.data || []);
        setGrades(gradeRes.data?.data || []);
      } catch {
        toast.error("Failed to load dropdown data");
      }
    };

    loadMasterData();
  }, []);

  return {
    form,
    setForm,
    subjects,
    classes,
    grades,
    loading,
    setLoading
  };
};
