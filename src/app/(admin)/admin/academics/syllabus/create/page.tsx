// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, ArrowLeft } from "lucide-react";

// export default function CreateSyllabusPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const classId = searchParams.get("classId");
//   const gradeId = searchParams.get("gradeId");

//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     subjectId: "",
//     type: "CORE",
//     chapters: "",
//     maxMarks: "",
//     passMarks: ""
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     apiConnector("GET", "/subjects/all").then(res =>
//       setSubjects(res.data.data || [])
//     );
//   }, []);

//   const submit = async (e: any) => {
//     e.preventDefault();

//     if (!form.subjectId) {
//       return toast.error("Select subject");
//     }

//     try {
//       setLoading(true);

//       await apiConnector("POST", "/syllabus", {
//         subjectId: Number(form.subjectId),
//         classId: classId ? Number(classId) : undefined,
//         gradeId: gradeId ? Number(gradeId) : undefined,
//         type: form.type,
//         chapters: form.chapters.split("\n"),
//         maxMarks: form.maxMarks ? Number(form.maxMarks) : undefined,
//         passMarks: form.passMarks ? Number(form.passMarks) : undefined
//       });

//       toast.success("Syllabus created 🎉");
//       router.back();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Error creating syllabus");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen max-w-2xl mx-auto">

//       <button
//         onClick={() => router.back()}
//         className="flex items-center mb-6 text-sm text-slate-600"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back
//       </button>

//       <div className="bg-white p-8 rounded-xl shadow border">
//         <h2 className="text-xl font-semibold mb-6">
//           Create Syllabus
//         </h2>

//         <form onSubmit={submit} className="space-y-5">

//           {/* Subject */}
//           <div>
//             <label className="text-sm font-medium">Subject *</label>
//             <select
//               value={form.subjectId}
//               onChange={e =>
//                 setForm({ ...form, subjectId: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(s => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Type */}
//           <div>
//             <label className="text-sm font-medium">Type</label>
//             <select
//               value={form.type}
//               onChange={e =>
//                 setForm({ ...form, type: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="CORE">Core</option>
//               <option value="EXTRA">Extra</option>
//             </select>
//           </div>

//           {/* Chapters */}
//           <div>
//             <label className="text-sm font-medium">
//               Chapters (one per line)
//             </label>
//             <textarea
//               rows={6}
//               value={form.chapters}
//               onChange={e =>
//                 setForm({ ...form, chapters: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder={`Introduction to Computer
// Parts of Computer
// Advanced Practice`}
//             />
//           </div>

//           {/* Marks */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               placeholder="Max Marks"
//               type="number"
//               value={form.maxMarks}
//               onChange={e =>
//                 setForm({ ...form, maxMarks: e.target.value })
//               }
//               className="border rounded-lg px-3 py-2"
//             />
//             <input
//               placeholder="Pass Marks"
//               type="number"
//               value={form.passMarks}
//               onChange={e =>
//                 setForm({ ...form, passMarks: e.target.value })
//               }
//               className="border rounded-lg px-3 py-2"
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center gap-2"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin h-4 w-4" />
//             ) : (
//               "Create Syllabus"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, ArrowLeft } from "lucide-react";

// interface Option {
//   id: number;
//   name: string;
// }

// export default function CreateSyllabusPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const paramClassId = searchParams.get("classId");
//   const paramGradeId = searchParams.get("gradeId");

//   const [subjects, setSubjects] = useState<Option[]>([]);
//   const [classes, setClasses] = useState<Option[]>([]);
//   const [grades, setGrades] = useState<Option[]>([]);

//   const [form, setForm] = useState({
//     subjectId: "",
//     classId: "",
//     gradeId: "",
//     type: "CORE",
//     chapters: "",
//     maxMarks: "",
//     passMarks: ""
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔹 Load dropdown data
//   useEffect(() => {
//     apiConnector("GET", "/subjects/all").then(res =>
//       setSubjects(res.data.data || [])
//     );
//     // apiConnector("GET", "/classes").then(res =>
        
//     //   setClasses(res.data.data?.data || res.data.data || [])
    
//     // );
//     // console.log(res.data);
//     apiConnector("GET", "/grades").then(res =>
//       setGrades(res.data.data || [])
//     );
//   }, []);
//   useEffect(() => {
//   const load = async () => {
//     try {
//       const classRes = await apiConnector("GET", "/classes");
//       console.log("CLASSES 👉", classRes.data);

//       setClasses(classRes.data || classRes.data.data || []);
//     } catch (err) {
//       console.error("Classes fetch error", err);
//     }
//   };

//   load();
// }, []);

// //   console.log("class",res)
//   // 🔹 Prefill from URL
//   useEffect(() => {
//     if (paramClassId) {
//       setForm(f => ({ ...f, classId: paramClassId }));
//     }
//     if (paramGradeId) {
//       setForm(f => ({ ...f, gradeId: paramGradeId }));
//     }
//   }, [paramClassId, paramGradeId]);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.subjectId) {
//       return toast.error("Subject required");
//     }

//     if (!form.classId && !form.gradeId) {
//       return toast.error("Please select Class or Grade");
//     }

//     try {
//       setLoading(true);

//       await apiConnector("POST", "/syllabus", {
//         subjectId: Number(form.subjectId),
//         classId: form.classId ? Number(form.classId) : undefined,
//         gradeId: form.gradeId ? Number(form.gradeId) : undefined,
//         type: form.type,
//         chapters: form.chapters
//           .split("\n")
//           .map(c => c.trim())
//           .filter(Boolean)
//           .map(title => ({
//             title,
//             topics: []
//           })),
//         maxMarks: form.maxMarks ? Number(form.maxMarks) : undefined,
//         passMarks: form.passMarks ? Number(form.passMarks) : undefined
//       });

//       toast.success("Syllabus created 🎉");
//       router.back();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to create syllabus");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen max-w-2xl mx-auto">

//       <button
//         onClick={() => router.back()}
//         className="flex items-center mb-6 text-sm text-slate-600"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back
//       </button>

//       <div className="bg-white p-8 rounded-xl shadow border">
//         <h2 className="text-xl font-semibold mb-6">
//           Create Syllabus
//         </h2>

//         <form onSubmit={submit} className="space-y-5">

//           {/* SUBJECT */}
//           <div>
//             <label className="text-sm font-medium">Subject *</label>
//             <select
//               value={form.subjectId}
//               onChange={e =>
//                 setForm({ ...form, subjectId: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(s => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* CLASS */}
//           <div>
//             <label className="text-sm font-medium">
//               Class (optional)
//             </label>
//             <select
//               value={form.classId}
//               onChange={e =>
//                 setForm({
//                   ...form,
//                   classId: e.target.value,
//                   gradeId: "" // reset grade if class selected
//                 })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="">Select Class</option>
//               {classes.map(c => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* GRADE */}
//           <div>
//             <label className="text-sm font-medium">
//               Grade (optional)
//             </label>
//             <select
//               value={form.gradeId}
//               onChange={e =>
//                 setForm({
//                   ...form,
//                   gradeId: e.target.value,
//                   classId: "" // reset class if grade selected
//                 })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="">Select Grade</option>
//               {grades.map(g => (
//                 <option key={g.id} value={g.id}>
//                   {g.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* TYPE */}
//           <div>
//             <label className="text-sm font-medium">Type</label>
//             <select
//               value={form.type}
//               onChange={e =>
//                 setForm({ ...form, type: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="CORE">Core</option>
//               <option value="EXTRA">Extra</option>
//             </select>
//           </div>

//           {/* CHAPTERS */}
//           <div>
//             <label className="text-sm font-medium">
//               Chapters (one per line)
//             </label>
//             <textarea
//               rows={6}
//               value={form.chapters}
//               onChange={e =>
//                 setForm({ ...form, chapters: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder={`Introduction to Computer
// Parts of Computer
// Advanced Practice`}
//             />
//           </div>

//           {/* MARKS */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               placeholder="Max Marks"
//               value={form.maxMarks}
//               onChange={e =>
//                 setForm({ ...form, maxMarks: e.target.value })
//               }
//               className="border rounded-lg px-3 py-2"
//             />
//             <input
//               type="number"
//               placeholder="Pass Marks"
//               value={form.passMarks}
//               onChange={e =>
//                 setForm({ ...form, passMarks: e.target.value })
//               }
//               className="border rounded-lg px-3 py-2"
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center gap-2"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin h-4 w-4" />
//             ) : (
//               "Create Syllabus"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { useSyllabusForm } from "@/hooks/useSyllabusForm";
import { SyllabusService } from "@/services/syllabus.service";

export default function CreateSyllabusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    form,
    setForm,
    subjects,
    classes,
    grades,
    loading,
    setLoading
  } = useSyllabusForm(
    searchParams.get("classId"),
    searchParams.get("gradeId")
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.subjectId)
      return toast.error("Subject required");

    if (!form.classId && !form.gradeId)
      return toast.error("Select Class or Grade");

    try {
      setLoading(true);

      await SyllabusService.createSyllabus({
        subjectId: Number(form.subjectId),
        classId: form.classId ? Number(form.classId) : undefined,
        gradeId: form.gradeId ? Number(form.gradeId) : undefined,
        type: form.type,
        chapters: form.chapters
          .split("\n")
          .map(t => t.trim())
          .filter(Boolean)
          .map(title => ({ title, topics: [] })),
        maxMarks: form.maxMarks ? Number(form.maxMarks) : undefined,
        passMarks: form.passMarks ? Number(form.passMarks) : undefined
      });

      toast.success("Syllabus created 🎉");
      router.back();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center mb-6 text-sm text-slate-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>

      <div className="bg-white p-8 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-6">
          Create Syllabus
        </h2>

        <form onSubmit={submit} className="space-y-5">
          {/* Subject */}
          <select
            value={form.subjectId}
            onChange={e =>
              setForm({ ...form, subjectId: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Subject</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Class */}
          <select
            value={form.classId}
            onChange={e =>
              setForm({ ...form, classId: e.target.value, gradeId: "" })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Grade */}
          <select
            value={form.gradeId}
            onChange={e =>
              setForm({ ...form, gradeId: e.target.value, classId: "" })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Grade</option>
            {grades.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <textarea
            rows={6}
            placeholder="One chapter per line"
            value={form.chapters}
            onChange={e =>
              setForm({ ...form, chapters: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Max Marks"
              value={form.maxMarks}
              onChange={e =>
                setForm({ ...form, maxMarks: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Pass Marks"
              value={form.passMarks}
              onChange={e =>
                setForm({ ...form, passMarks: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            disabled={loading}
            className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

