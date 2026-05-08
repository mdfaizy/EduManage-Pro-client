import { useState, useEffect, useMemo } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export const useMasterData = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [years, setYears] = useState([]);
  const [formClassId, setFormClassId] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, secRes, yRes] = await Promise.all([
          apiConnector("GET", "/classes"),
          apiConnector("GET", "/sections"),
          apiConnector("GET", "/academic-year"),
        ]);

        setClasses(cRes.data || []);
        setSections(secRes.data.data || []);
        setYears(yRes.data.data || []);
      } catch {
        toast.error("Failed to load data");
      }
    };

    load();
  }, []);

  const filteredSections = useMemo(() => 
    sections.filter(s => String(s.classId) === formClassId),
    [sections, formClassId]
  );

  return { classes, sections, years, filteredSections, setFormClassId };
};