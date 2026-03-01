// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   setAdmissionLoading,
//   setAdmissionSuccess,
//   setAdmissionError,
// } from "@/redux/admissionSlice";
// import { createAdmissionAPI } from "@/services/admissionService";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface FormState {
//   studentId: string;
//   classId: string;
//   sectionId: string;
//   admissionNo: string;
//   academicYearId: string;
// }

// export default function CreateAdmissionPage() {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((s) => s.admission);

//   const [students, setStudents] = useState<any[]>([]);
//   const [classes, setClasses] = useState<any[]>([]);
//   const [sections, setSections] = useState<any[]>([]);
//   const [years, setYears] = useState<any[]>([]);

//   const [form, setForm] = useState<FormState>({
//     studentId: "",
//     classId: "",
//     sectionId: "",
//     admissionNo: "",
//     academicYearId: "",
//   });

//   /* ================= LOAD MASTER DATA ================= */

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [sRes, cRes, secRes, yRes] = await Promise.all([
//           apiConnector("GET", "/students"),
//           apiConnector("GET", "/classes"),
//           apiConnector("GET", "/sections"),
//           apiConnector("GET", "/academic-year"),
//         ]);

//         setStudents(sRes.data.data || []);
//         setClasses(cRes.data || []);
//         setSections(secRes.data.data || []);
//         setYears(yRes.data.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       }
//     };

//     load();
//   }, []);

//   /* ================= FILTER SECTIONS ================= */

//   const filteredSections = sections.filter(
//     (s) => String(s.classId) === form.classId
//   );

//   /* ================= CHANGE ================= */

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.studentId || !form.classId || !form.academicYearId) {
//       toast.error("Please fill required fields");
//       return;
//     }

//     dispatch(setAdmissionLoading(true));
//     dispatch(setAdmissionError(null));

//     try {
//       await createAdmissionAPI({
//         studentId: Number(form.studentId),
//         classId: Number(form.classId),
//         sectionId: form.sectionId
//           ? Number(form.sectionId)
//           : null,
//         admissionNo: form.admissionNo || null,
//         academicYearId: Number(form.academicYearId),
//       });

//       dispatch(setAdmissionSuccess(true));
//       toast.success("Admission successful");

//       setForm({
//         studentId: "",
//         classId: "",
//         sectionId: "",
//         admissionNo: "",
//         academicYearId: "",
//       });
//     } catch (err: any) {
//       dispatch(
//         setAdmissionError(
//           err?.response?.data?.message || "Admission failed"
//         )
//       );
//       toast.error(
//         err?.response?.data?.message || "Admission failed"
//       );
//     } finally {
//       dispatch(setAdmissionLoading(false));
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl border">
//       <h2 className="text-lg font-semibold mb-4">
//         Student Admission
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Academic Year */}
//         <select
//           name="academicYearId"
//           value={form.academicYearId}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Academic Year</option>
//           {years.map((y) => (
//             <option key={y.id} value={y.id}>
//               {y.name}
//             </option>
//           ))}
//         </select>

//         {/* Student */}
//         <select
//           name="studentId"
//           value={form.studentId}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Student</option>
//           {students.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         {/* Class */}
//         <select
//           name="classId"
//           value={form.classId}
//           onChange={(e) =>
//             setForm((prev) => ({
//               ...prev,
//               classId: e.target.value,
//               sectionId: "",
//             }))
//           }
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Class</option>
//           {classes.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* Section */}
//         <select
//           name="sectionId"
//           value={form.sectionId}
//           onChange={handleChange}
//           disabled={!form.classId}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Section</option>
//           {filteredSections.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <input
//           name="admissionNo"
//           value={form.admissionNo}
//           onChange={handleChange}
//           placeholder="Admission No (optional)"
//           className="w-full border p-2 rounded"
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           {loading ? "Processing..." : "Take Admission"}
//         </button>
//       </form>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   setAdmissionLoading,
//   setAdmissionSuccess,
//   setAdmissionError,
// } from "@/redux/admissionSlice";
// import { createAdmissionAPI } from "@/services/admissionService";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// /* ================= TYPES ================= */

// interface FormState {
//   studentName: string;
//   dob: string;
//   gender: string;
//   address: string;
//   classId: string;
//   sectionId: string;
//   academicYearId: string;
// }

// export default function CreateAdmissionPage() {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((s) => s.admission);

//   const [classes, setClasses] = useState<any[]>([]);
//   const [sections, setSections] = useState<any[]>([]);
//   const [years, setYears] = useState<any[]>([]);

//   const [form, setForm] = useState<FormState>({
//     studentName: "",
//     dob: "",
//     gender: "MALE",
//     address: "",
//     classId: "",
//     sectionId: "",
//     academicYearId: "",
//   });

//   /* ================= LOAD MASTER DATA ================= */

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [cRes, secRes, yRes] = await Promise.all([
//           apiConnector("GET", "/classes"),
//           apiConnector("GET", "/sections"),
//           apiConnector("GET", "/academic-year"),
//         ]);

//         setClasses(cRes.data || []);
//         setSections(secRes.data.data || []);
//         setYears(yRes.data.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       }
//     };

//     load();
//   }, []);

//   /* ================= FILTER SECTIONS ================= */

//   const filteredSections = sections.filter(
//     (s) => String(s.classId) === form.classId
//   );

//   /* ================= CHANGE ================= */

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.studentName || !form.classId || !form.academicYearId) {
//       toast.error("Please fill required fields");
//       return;
//     }

//     dispatch(setAdmissionLoading(true));
//     dispatch(setAdmissionError(null));

//     try {
//       await createAdmissionAPI({
//         studentName: form.studentName,
//         dob: form.dob || null,
//         gender: form.gender,
//         address: form.address,
//         classId: Number(form.classId),
//         sectionId: form.sectionId
//           ? Number(form.sectionId)
//           : null,
//         academicYearId: Number(form.academicYearId),
//       });

//       dispatch(setAdmissionSuccess(true));
//       toast.success("Admission applied successfully");

//       setForm({
//         studentName: "",
//         dob: "",
//         gender: "MALE",
//         address: "",
//         classId: "",
//         sectionId: "",
//         academicYearId: "",
//       });
//     } catch (err: any) {
//       const msg =
//         err?.response?.data?.message || "Admission failed";

//       dispatch(setAdmissionError(msg));
//       toast.error(msg);
//     } finally {
//       dispatch(setAdmissionLoading(false));
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl border">
//       <h2 className="text-lg font-semibold mb-4">
//         Apply Admission
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Student Name */}
//         <input
//           name="studentName"
//           value={form.studentName}
//           onChange={handleChange}
//           placeholder="Student Name"
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* DOB */}
//         <input
//           type="date"
//           name="dob"
//           value={form.dob}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Gender */}
//         <select
//           name="gender"
//           value={form.gender}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//           <option value="OTHER">Other</option>
//         </select>

//         {/* Address */}
//         <input
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="w-full border p-2 rounded"
//         />

//         {/* Academic Year */}
//         <select
//           name="academicYearId"
//           value={form.academicYearId}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Select Academic Year</option>
//           {years.map((y) => (
//             <option key={y.id} value={y.id}>
//               {y.name}
//             </option>
//           ))}
//         </select>

//         {/* Class */}
//         <select
//           name="classId"
//           value={form.classId}
//           onChange={(e) =>
//             setForm((prev) => ({
//               ...prev,
//               classId: e.target.value,
//               sectionId: "",
//             }))
//           }
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Select Class</option>
//           {classes.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* Section */}
//         <select
//           name="sectionId"
//           value={form.sectionId}
//           onChange={handleChange}
//           disabled={!form.classId}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Section</option>
//           {filteredSections.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <button
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           {loading ? "Processing..." : "Apply Admission"}
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { createAdmissionAPI } from "@/services/admissionService";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setAdmissionError,
  setAdmissionLoading,
  setAdmissionSuccess,
} from "@/redux/admissionSlice";

/* ================= TYPES ================= */

interface FormState {
  studentName: string;
  dob: string;
  gender: string;
  address: string;
  academicYearId: string;
  classId: string;
  sectionId: string;
}

export default function AdmissionFormPro() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.admission);

  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);

  const [form, setForm] = useState<FormState>({
    studentName: "",
    dob: "",
    gender: "MALE",
    address: "",
    academicYearId: "",
    classId: "",
    sectionId: "",
  });

  /* ================= LOAD MASTER ================= */

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, sRes, yRes] = await Promise.all([
          apiConnector("GET", "/classes"),
          apiConnector("GET", "/sections"),
          apiConnector("GET", "/academic-year"),
        ]);

        setClasses(cRes?.data?.data || []);
        setSections(sRes?.data?.data || []);
        setYears(yRes?.data?.data || []);
      } catch {
        toast.error("Failed to load master data");
      }
    };

    load();
  }, []);

  /* ================= ACTIVE YEARS ================= */

  const activeYears = useMemo(() => {
    return years.filter((y) => y.isActive);
  }, [years]);

  /* ================= FILTERED SECTIONS ================= */

  const filteredSections = useMemo(() => {
    return sections
      .filter((s) => String(s.classId) === form.classId)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [sections, form.classId]);

  /* ================= CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ================= VALIDATION ================= */

  const isFormValid =
    form.studentName &&
    form.classId &&
    form.academicYearId;

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill required fields");
      return;
    }

    dispatch(setAdmissionLoading(true));
    dispatch(setAdmissionError(null));

    try {
      await createAdmissionAPI({
        studentName: form.studentName,
        dob: form.dob ? form.dob : null,
        gender: form.gender,
        address: form.address,
        classId: Number(form.classId),
        sectionId: form.sectionId
          ? Number(form.sectionId)
          : null,
        academicYearId: Number(form.academicYearId),
      });

      dispatch(setAdmissionSuccess(true));
      toast.success("Admission applied successfully ✅");

      setForm({
        studentName: "",
        dob: "",
        gender: "MALE",
        address: "",
        academicYearId: "",
        classId: "",
        sectionId: "",
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Admission failed";
      dispatch(setAdmissionError(msg));
      toast.error(msg);
    } finally {
      dispatch(setAdmissionLoading(false));
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white border rounded-2xl shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Apply Student Admission
          </h2>
          <p className="text-sm text-gray-500">
            Fill student details to create admission request
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name *
            </label>
            <input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter student name"
              required
            />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* DOB */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter address"
            />
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Academic Year *
            </label>
            <select
              name="academicYearId"
              value={form.academicYearId}
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5"
              required
            >
              <option value="">Select Academic Year</option>
              {activeYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Class *
            </label>
            <select
              name="classId"
              value={form.classId}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  classId: e.target.value,
                  sectionId: "",
                }))
              }
              className="w-full border rounded-lg p-2.5"
              required
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Section
            </label>
            <select
              name="sectionId"
              value={form.sectionId}
              onChange={handleChange}
              disabled={!form.classId}
              className="w-full border rounded-lg p-2.5"
            >
              <option value="">Select Section</option>
              {filteredSections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.capacity ?? "-"})
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            disabled={loading || !isFormValid}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Apply Admission"}
          </button>
        </form>
      </div>
    </div>
  );
}