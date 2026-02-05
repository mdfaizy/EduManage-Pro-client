// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";

// export default function EditClassPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchClass = async () => {
//       try {
//         const res = await apiConnector("GET", `/classes/${id}`);
//         setName(res.data.name);
//       } catch {
//         toast.error("Failed to load class");
//       }
//     };
//     fetchClass();
//   }, [id]);

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await apiConnector("PATCH", `/classes/${id}`, { name });
//       toast.success("Class updated");
//       router.push("/admin/classes");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//  return (
//   <div className="min-h-screen bg-slate-50 p-8">

//     {/* Page Header */}
//     <div className="mb-8 flex items-start justify-between">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">Edit Class</h1>
//         <p className="text-slate-500 mt-1 text-sm">
//           Update class information and structure
//         </p>
//       </div>

//       <button
//         onClick={() => router.push("/admin/classes")}
//         className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-100"
//       >
//         Back to Classes
//       </button>
//     </div>

//     {/* Form Card */}
//     <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm">

//       <div className="p-8 border-b">
//         <h2 className="text-lg font-semibold text-slate-800">
//           Class Details
//         </h2>
//         <p className="text-sm text-slate-500 mt-1">
//           Modify the class name used across the system
//         </p>
//       </div>

//       <div className="p-8 space-y-6">

//         <div>
//           <label className="text-sm font-medium text-slate-700">
//             Class Name
//           </label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter class name"
//             className="w-full mt-2 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//           />
//         </div>

//       </div>

//       {/* Footer Actions */}
//       <div className="px-8 py-6 border-t flex justify-between items-center bg-slate-50 rounded-b-2xl">
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-100"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//     </div>
//   </div>
// );

// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, ArrowLeft, Save } from "lucide-react";

// export default function EditClassPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [originalName, setOriginalName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [bootLoading, setBootLoading] = useState(true);

//   useEffect(() => {
//     const fetchClass = async () => {
//       try {
//         const res = await apiConnector("GET", `/classes/${id}`);
//         setName(res.data.name);
//         setOriginalName(res.data.name);
//       } catch {
//         toast.error("Failed to load class");
//       } finally {
//         setBootLoading(false);
//       }
//     };
//     fetchClass();
//   }, [id]);

//   const handleSave = async () => {
//     if (!name.trim()) return toast.error("Class name required");
//     if (name.trim() === originalName) return toast("No changes made");

//     try {
//       setLoading(true);
//       await apiConnector("PATCH", `/classes/${id}`, { name: name.trim() });
//       toast.success("Class updated successfully");
//       router.push("/admin/classes");
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading) {
//     return (
//       <div className="flex items-center justify-center h-[300px]">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-8">

//       {/* Header */}
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Edit Class</h1>
//           <p className="text-slate-500 text-sm mt-1">
//             Update class name used across system
//           </p>
//         </div>

//         <button
//           onClick={() => router.back()}
//           className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-slate-100"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </button>
//       </div>

//       {/* Card */}
//       <div className="max-w-xl bg-white border rounded-2xl shadow-sm">

//         <div className="p-8 border-b">
//           <h2 className="text-lg font-semibold text-slate-800">
//             Class Information
//           </h2>
//           <p className="text-sm text-slate-500 mt-1">
//             Changing name will reflect everywhere
//           </p>
//         </div>

//         <div className="p-8 space-y-6">
//           <div>
//             <label className="text-sm font-medium text-slate-700">
//               Class Name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter class name"
//               className="w-full mt-2 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-6 border-t flex justify-between items-center bg-slate-50 rounded-b-2xl">
//           <button
//             onClick={() => router.back()}
//             className="px-4 py-2 bg-white border rounded-lg hover:bg-slate-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={16} />}
//             Save Changes
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";

export default function EditClassPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", maxStudents: "", gradeId: "" });
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const cls = await apiConnector("GET", `/classes/${id}`);
        setForm({
          name: cls.data.name,
          maxStudents: cls.data.maxStudents || "",
          gradeId: cls.data.gradeId,
        });

        const g = await apiConnector("GET", "/grades");
        setGrades(g.data.data);
      } catch {
        toast.error("Load failed");
      } finally {
        setBootLoading(false);
      }
    };
    init();
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiConnector("PATCH", `/classes/${id}`, {
        name: form.name.trim(),
        maxStudents: Number(form.maxStudents),
        gradeId: Number(form.gradeId),
      });

      toast.success("Class updated");
      router.push("/admin/academics/class/class-table");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (bootLoading)
    return <Loader2 className="animate-spin m-auto mt-20 text-indigo-600" />;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Class</h1>
        <button onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border max-w-xl space-y-6">

        <div>
          <label>Class Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label>Max Students</label>
          <input
            type="number"
            value={form.maxStudents}
            onChange={(e) => setForm({ ...form, maxStudents: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label>Grade</label>
          <select
            value={form.gradeId}
            onChange={(e) => setForm({ ...form, gradeId: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          >
            {grades.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>

      </div>
    </div>
  );
}
