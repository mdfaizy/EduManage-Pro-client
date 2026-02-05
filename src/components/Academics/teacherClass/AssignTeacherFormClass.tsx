// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface Teacher {
//   id: number;
//   name: string;
// }

// interface ClassType {
//   id: number;
//   name: string;
// }

// const AssignTeacherForm = () => {
//   const [formData, setFormData] = useState({
//     teacherId: "",
//     classId: "",
//     schoolName: "",
//     schoolId: "",
//     isClassTeacher: false,
//   });

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Load school info + data
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         const { schoolId, schoolName } = me?.data?.data;

//         setFormData((prev) => ({
//           ...prev,
//           schoolId,
//           schoolName,
//         }));

//         const teacherRes = await apiConnector("GET", `/teachers?schoolId=${schoolId}`);
//         setTeachers(teacherRes?.data?.data || []);

//         const classRes = await apiConnector("GET", `/classes?schoolId=${schoolId}`);
//         setClasses(classRes?.data?.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       }
//     };

//     init();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.teacherId || !formData.classId) {
//       toast.error("All fields required");
//       return;
//     }

//     try {
//       setLoading(true);

//       await apiConnector("POST", "/teacher/assign-class", {
//         teacherId: Number(formData.teacherId),
//         classId: Number(formData.classId),
//         isClassTeacher: formData.isClassTeacher,
//       });

//       toast.success("Teacher assigned successfully 🎉");

//       setFormData((prev) => ({
//         ...prev,
//         teacherId: "",
//         classId: "",
//         isClassTeacher: false,
//       }));
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Error assigning teacher");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center py-10 px-4">
//       <div className="w-full max-w-lg bg-white border rounded-2xl shadow-sm">

//         <div className="px-6 pt-6 pb-4 border-b">
//           <h2 className="text-xl font-semibold">Assign Teacher to Class</h2>
//           <p className="text-sm text-gray-500">
//             Manage class teacher assignments
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">

//           {/* School */}
//           <div>
//             <Label>School</Label>
//             <Input value={formData.schoolName} disabled />
//           </div>

//           {/* Teacher Dropdown */}
//           <div>
//             <Label>Select Teacher</Label>
//             <select
//               value={formData.teacherId}
//               onChange={(e) =>
//                 setFormData({ ...formData, teacherId: e.target.value })
//               }
//               className="w-full h-11 border rounded-lg px-3 text-sm"
//             >
//               <option value="">Choose Teacher</option>
//               {teachers.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Class Dropdown */}
//           <div>
//             <Label>Select Class</Label>
//             <select
//               value={formData.classId}
//               onChange={(e) =>
//                 setFormData({ ...formData, classId: e.target.value })
//               }
//               className="w-full h-11 border rounded-lg px-3 text-sm"
//             >
//               <option value="">Choose Class</option>
//               {classes.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Toggle */}
//           <div className="flex items-center justify-between">
//             <Label>Make Class Teacher</Label>
//             <input
//               type="checkbox"
//               checked={formData.isClassTeacher}
//               onChange={(e) =>
//                 setFormData({ ...formData, isClassTeacher: e.target.checked })
//               }
//               className="w-5 h-5"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full h-11 bg-brand-500 hover:bg-brand-600 text-white rounded-lg"
//           >
//             {loading ? "Assigning..." : "Assign Teacher"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AssignTeacherForm;



// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// interface Teacher {
//   id: number;
//   user: { name: string };
// }

// interface ClassType {
//   id: number;
//   name: string;
// }

// export default function AssignTeacherForm() {
//   const [form, setForm] = useState({
//     teacherId: "",
//     classId: "",
//     schoolName: "",
//     isClassTeacher: false,
//   });

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [bootLoading, setBootLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         setForm((p) => ({ ...p, schoolName: me.data.data.schoolName }));

//         // 🔒 schoolId backend se auto use hoga
//         const [teacherRes, classRes] = await Promise.all([
//           apiConnector("GET", "/teachers"),
//           apiConnector("GET", "/classes"),
//         ]);

//         setTeachers(teacherRes.data || []);
//         setClasses(classRes.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       } finally {
//         setBootLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.teacherId || !form.classId) {
//       return toast.error("Select teacher and class");
//     }

//     try {
//       setLoading(true);
//       await apiConnector("POST", "/assign-teacher", {
//         teacherId: Number(form.teacherId),
//         classId: Number(form.classId),
//         isClassTeacher: form.isClassTeacher,
//       });
//       toast.success("Teacher assigned");
//       setForm((p) => ({ ...p, teacherId: "", classId: "", isClassTeacher: false }));
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading) return <p className="p-6 text-center">Loading...</p>;

//   return (
//     <div className="flex justify-center py-10 px-4">
//       <div className="w-full max-w-lg bg-white border rounded-2xl shadow-sm">
//         <div className="px-6 pt-6 pb-4 border-b">
//           <h2 className="text-xl font-semibold">Assign Teacher to Class</h2>
//           <p className="text-sm text-gray-500">Manage class teacher roles</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">

//           <div>
//             <Label>School</Label>
//             <Input value={form.schoolName} disabled />
//           </div>

//           <div>
//             <Label>Select Teacher</Label>
//             <select
//               value={form.teacherId}
//               onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
//               className="w-full h-11 border rounded-lg px-3 text-sm"
//             >
//               <option value="">Choose Teacher</option>
//               {teachers.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.user.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <Label>Select Class</Label>
//             <select
//               value={form.classId}
//               onChange={(e) => setForm({ ...form, classId: e.target.value })}
//               className="w-full h-11 border rounded-lg px-3 text-sm"
//             >
//               <option value="">Choose Class</option>
//               {classes.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center justify-between">
//             <Label>Make Class Teacher</Label>
//             <input
//               type="checkbox"
//               checked={form.isClassTeacher}
//               onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
//               className="w-5 h-5"
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="w-full h-11 bg-brand-500 hover:bg-brand-600 text-white rounded-lg"
//           >
//             {loading ? "Assigning..." : "Assign Teacher"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Loader2,
  School,
  Users,
  BookOpen,
  ShieldCheck,
  UserCheck,
  Layers,
} from "lucide-react";

interface Teacher {
  id: number;
  user: { name: string };
}

interface ClassType {
  id: number;
  name: string;
}

export default function AssignTeacherForm() {
  const [form, setForm] = useState({
    teacherId: "",
    classId: "",
    schoolName: "",
    isClassTeacher: false,
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await apiConnector("GET", "/auth/me");
        setForm((p) => ({ ...p, schoolName: me.data.data.schoolName }));

        const [teacherRes, classRes] = await Promise.all([
          apiConnector("GET", "/teachers"),
          apiConnector("GET", "/classes"),
        ]);

        setTeachers(teacherRes.data || []);
        setClasses(classRes.data || []);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setBootLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.teacherId || !form.classId)
      return toast.error("Select teacher and class");

    try {
      setLoading(true);
      await apiConnector("POST", "/assign-teacher", {
        teacherId: Number(form.teacherId),
        classId: Number(form.classId),
        isClassTeacher: form.isClassTeacher,
      });
      toast.success("Teacher assigned successfully");
      setForm((p) => ({ ...p, teacherId: "", classId: "", isClassTeacher: false }));
    } catch {
      toast.error("Assignment failed");
    } finally {
      setLoading(false);
    }
  };

  if (bootLoading)
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin h-10 w-10 text-brand-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8">

      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Assign Teacher</h1>
        <p className="text-gray-500">Manage teacher-class relationships in your school</p>

        {/* INFO CARDS */}
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Teachers</p>
              <h2 className="text-2xl font-bold text-brand-600">{teachers.length}</h2>
            </div>
            <Users className="text-brand-500" />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Classes</p>
              <h2 className="text-2xl font-bold text-brand-600">{classes.length}</h2>
            </div>
            <Layers className="text-brand-500" />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">School</p>
              <h2 className="text-lg font-semibold">{form.schoolName}</h2>
            </div>
            <School className="text-brand-500" />
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border p-10">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <UserCheck className="text-brand-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Assign Teacher to Class
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Select teacher and class, and optionally assign as class teacher
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Teacher */}
          <div>
            <Label>Teacher</Label>
            <select
              value={form.teacherId}
              onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Choose Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <Label>Class</Label>
            <select
              value={form.classId}
              onChange={(e) => setForm({ ...form, classId: e.target.value })}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Choose Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border">
            <div>
              <p className="font-medium text-gray-700">Make Class Teacher</p>
              <p className="text-xs text-gray-400">Gives full class responsibility</p>
            </div>
            <input
              type="checkbox"
              checked={form.isClassTeacher}
              onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
              className="w-5 h-5 accent-brand-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Assign Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
}
