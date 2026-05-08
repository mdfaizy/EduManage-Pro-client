// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { toast } from "react-hot-toast";

// import { useSyllabusForm } from "@/hooks/useSyllabusForm";
// import { SyllabusService } from "@/services/syllabus.service";

// export default function CreateSyllabusPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const {
//     form,
//     setForm,
//     subjects,
//     classes,
//     grades,
//     loading,
//     setLoading
//   } = useSyllabusForm(
//     searchParams.get("classId"),
//     searchParams.get("gradeId")
//   );

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.subjectId)
//       return toast.error("Subject required");

//     if (!form.classId && !form.gradeId)
//       return toast.error("Select Class or Grade");

//     try {
//       setLoading(true);

//       await SyllabusService.createSyllabus({
//         subjectId: Number(form.subjectId),
//         classId: form.classId ? Number(form.classId) : undefined,
//         gradeId: form.gradeId ? Number(form.gradeId) : undefined,
//         type: form.type,
//         chapters: form.chapters
//           .split("\n")
//           .map(t => t.trim())
//           .filter(Boolean)
//           .map(title => ({ title, topics: [] })),
//         maxMarks: form.maxMarks ? Number(form.maxMarks) : undefined,
//         passMarks: form.passMarks ? Number(form.passMarks) : undefined
//       });

//       toast.success("Syllabus created 🎉");
//       router.back();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Create failed");
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
//           <select
//             value={form.subjectId}
//             onChange={e =>
//               setForm({ ...form, subjectId: e.target.value })
//             }
//             className="w-full border rounded-lg px-3 py-2"
//           >
//             <option value="">Select Subject</option>
//             {subjects.map(s => (
//               <option key={s.id} value={s.id}>{s.name}</option>
//             ))}
//           </select>

//           {/* Class */}
//           <select
//             value={form.classId}
//             onChange={e =>
//               setForm({ ...form, classId: e.target.value, gradeId: "" })
//             }
//             className="w-full border rounded-lg px-3 py-2"
//           >
//             <option value="">Select Class</option>
//             {classes.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>

//           {/* Grade */}
//           <select
//             value={form.gradeId}
//             onChange={e =>
//               setForm({ ...form, gradeId: e.target.value, classId: "" })
//             }
//             className="w-full border rounded-lg px-3 py-2"
//           >
//             <option value="">Select Grade</option>
//             {grades.map(g => (
//               <option key={g.id} value={g.id}>{g.name}</option>
//             ))}
//           </select>

//           <textarea
//             rows={6}
//             placeholder="One chapter per line"
//             value={form.chapters}
//             onChange={e =>
//               setForm({ ...form, chapters: e.target.value })
//             }
//             className="w-full border rounded-lg px-3 py-2"
//           />

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
//             className="w-full h-11 bg-brand-600 text-white rounded-lg flex justify-center items-center"
//           >
//             {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  BookOpen,
} from "lucide-react";
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
    setLoading,
  } = useSyllabusForm(
    searchParams.get("classId"),
    searchParams.get("gradeId")
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.subjectId) {
      return toast.error("Subject required");
    }

    if (!form.classId && !form.gradeId) {
      return toast.error("Select Class or Grade");
    }

    try {
      setLoading(true);

      await SyllabusService.createSyllabus({
        subjectId: Number(form.subjectId),
        classId: form.classId
          ? Number(form.classId)
          : undefined,
        gradeId: form.gradeId
          ? Number(form.gradeId)
          : undefined,
        type: form.type,
        chapters: form.chapters
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean)
          .map((title) => ({
            title,
            topics: [],
          })),
        maxMarks: form.maxMarks
          ? Number(form.maxMarks)
          : undefined,
        passMarks: form.passMarks
          ? Number(form.passMarks)
          : undefined,
      });

      toast.success("Syllabus created successfully 🎉");
      router.back();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Create failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-6 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Header */}
          <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={22} />
              <div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Create Syllabus
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Add class/grade wise syllabus and chapters
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="p-8 space-y-6"
          >

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Subject
              </label>
              <select
                value={form.subjectId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subjectId: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class / Grade */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Class
                </label>
                <select
                  value={form.classId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      classId: e.target.value,
                      gradeId: "",
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Grade
                </label>
                <select
                  value={form.gradeId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      gradeId: e.target.value,
                      classId: "",
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white"
                >
                  <option value="">Select Grade</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Chapters */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Chapters
              </label>
              <textarea
                rows={6}
                placeholder="One chapter per line"
                value={form.chapters}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chapters: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white"
              />
            </div>

           

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2 transition disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="animate-spin h-4 w-4" />
              )}
              {loading ? "Creating..." : "Create Syllabus"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}