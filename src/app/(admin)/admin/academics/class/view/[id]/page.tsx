// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";

// export default function ViewClassPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [cls, setCls] = useState<any>(null);

//   useEffect(() => {
//     apiConnector("GET", `/classes/${id}`).then(res => setCls(res.data));
//   }, [id]);

//   if (!cls) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen space-y-6">

//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-800">{cls.name}</h1>
//         <button onClick={() => router.back()} className="px-4 py-2 bg-slate-100 rounded-lg">
//           Back
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         <Card title="Sections" value={cls.sections.length} />
//         <Card title="Subjects" value={cls.subjects.length} />
//         <Card title="Status" value={cls.isActive ? "Active" : "Inactive"} />
//       </div>

//       <div className="bg-white rounded-xl border p-6">
//         <h2 className="font-semibold mb-4">Sections List</h2>
//         {cls.sections.map((s: any) => (
//           <div key={s.id} className="py-2 border-b">{s.name}</div>
//         ))}
//       </div>

//     </div>
//   );
// }

// function Card({ title, value }: any) {
//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm">
//       <p className="text-slate-500 text-sm">{title}</p>
//       <h3 className="text-2xl font-bold mt-2">{value}</h3>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";

// export default function ViewClassPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [cls, setCls] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     apiConnector("GET", `/classes/${id}`)
//       .then(res => setCls(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p className="p-8">Loading class details...</p>;
//   if (!cls) return <p className="p-8 text-red-500">Class not found</p>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen space-y-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">{cls.name}</h1>
//           <p className="text-slate-500 text-sm">Grade: {cls.grade?.name}</p>
//         </div>
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg"
//         >
//           Back
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card title="Sections" value={cls.sections.length} />
//         <Card title="Subjects" value={cls.subjects.length} />
//         <Card title="Status" value={cls.isActive ? "Active" : "Inactive"} />
//       </div>

//       {/* SECTIONS LIST */}
//       <div className="bg-white rounded-xl border p-6 shadow-sm">
//         <h2 className="font-semibold text-lg mb-4">Sections List</h2>
//         {cls.sections.length === 0 ? (
//           <p className="text-slate-400">No sections created</p>
//         ) : (
//           cls.sections.map((s: any) => (
//             <div key={s.id} className="py-2 border-b last:border-0">
//               <p className="font-medium">{s.name}</p>
//               {s.capacity && (
//                 <p className="text-sm text-slate-500">
//                   Capacity: {s.capacity}
//                 </p>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* SUBJECTS LIST */}
//       <div className="bg-white rounded-xl border p-6 shadow-sm">
//         <h2 className="font-semibold text-lg mb-4">Subjects List</h2>
//         {cls.subjects.length === 0 ? (
//           <p className="text-slate-400">No subjects assigned</p>
//         ) : (
//           cls.subjects.map((sub: any) => (
//             <div key={sub.id} className="py-2 border-b last:border-0">
//               <p className="font-medium">{sub.name}</p>
//               <p className="text-sm text-slate-500">Code: {sub.code}</p>
//               {sub.description && (
//                 <p className="text-xs text-slate-400">{sub.description}</p>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   );
// }

// function Card({ title, value }: any) {
//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm">
//       <p className="text-slate-500 text-sm">{title}</p>
//       <h3 className="text-2xl font-bold mt-2">{value}</h3>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";

// export default function ViewClassPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [cls, setCls] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [form, setForm] = useState({ name: "", description: "" });
//   const [saving, setSaving] = useState(false);

//   const fetchClass = () => {
//     apiConnector("GET", `/classes/${id}`)
//       .then(res => setCls(res.data))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchClass();
//   }, [id]);

//   const startEdit = (sub: any) => {
//     setEditingId(sub.id);
//     setForm({ name: sub.name, description: sub.description || "" });
//   };

//   const saveEdit = async (subId: number) => {
//     try {
//       setSaving(true);
//       await apiConnector("PATCH", `/subjects/${subId}`, form);
//       setEditingId(null);
//       fetchClass();
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-10 text-slate-500">Loading class details...</div>;
//   if (!cls) return <div className="p-10 text-red-500">Class not found</div>;

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">{cls.name}</h1>
//           <p className="text-sm text-slate-500">Grade: {cls.grade?.name}</p>
//         </div>
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 bg-white border rounded-lg hover:bg-slate-50"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatCard title="Sections" value={cls.sections.length} />
//         <StatCard title="Subjects" value={cls.subjects.length} />
//         <StatCard title="Status" value={cls.isActive ? "Active" : "Inactive"} />
//       </div>

//       {/* SUBJECTS TABLE */}
//       <div className="bg-white rounded-xl shadow border">
//         <div className="px-6 py-4 border-b">
//           <h2 className="font-semibold text-lg text-slate-700">Subjects</h2>
//         </div>

//         {cls.subjects.length === 0 ? (
//           <p className="p-6 text-slate-400">No subjects added yet.</p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="p-4 text-left">Name</th>
//                 <th className="p-4 text-left">Code</th>
//                 <th className="p-4 text-left">Description</th>
//                 <th className="p-4 text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {cls.subjects.map((sub: any) => (
//                 <tr key={sub.id} className="border-t hover:bg-slate-50">

//                   {editingId === sub.id ? (
//                     <>
//                       <td className="p-4">
//                         <input
//                           value={form.name}
//                           onChange={e => setForm({ ...form, name: e.target.value })}
//                           className="border rounded px-3 py-1 w-full"
//                         />
//                       </td>

//                       <td className="p-4 text-slate-400">Auto</td>

//                       <td className="p-4">
//                         <input
//                           value={form.description}
//                           onChange={e => setForm({ ...form, description: e.target.value })}
//                           className="border rounded px-3 py-1 w-full"
//                         />
//                       </td>

//                       <td className="p-4 text-right space-x-2">
//                         <button
//                           onClick={() => saveEdit(sub.id)}
//                           disabled={saving}
//                           className="px-3 py-1 bg-blue-600 text-white rounded"
//                         >
//                           {saving ? "Saving..." : "Save"}
//                         </button>
//                         <button
//                           onClick={() => setEditingId(null)}
//                           className="px-3 py-1 bg-gray-200 rounded"
//                         >
//                           Cancel
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="p-4 font-medium">{sub.name}</td>
//                       <td className="p-4 text-slate-500">{sub.code}</td>
//                       <td className="p-4 text-slate-500">{sub.description || "-"}</td>
//                       <td className="p-4 text-right">
//                         <button
//                           onClick={() => startEdit(sub)}
//                           className="text-blue-600 hover:underline"
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </>
//                   )}

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//     </div>
//   );
// }

// function StatCard({ title, value }: any) {
//   return (
//     <div className="bg-white rounded-xl border p-6 shadow-sm">
//       <p className="text-slate-500 text-sm">{title}</p>
//       <h3 className="text-2xl font-bold mt-2">{value}</h3>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";

export default function ViewClassPage() {
  const { id } = useParams();
  const router = useRouter();

  const [cls, setCls] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchClass = async () => {
    try {
      const res = await apiConnector("GET", `/classes/${id}`);
      setCls(res.data.data ?? res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [id]);

  // ✅ SUBJECTS ARE DERIVED FROM SYLLABI
  const subjects =
    cls?.syllabi?.map((s: any) => s.subject).filter(Boolean) || [];

  const startEdit = (sub: any) => {
    setEditingId(sub.id);
    setForm({
      name: sub.name,
      description: sub.description || ""
    });
  };

  const saveEdit = async (subId: number) => {
    try {
      setSaving(true);
      await apiConnector("PATCH", `/subjects/${subId}`, form);
      setEditingId(null);
      fetchClass();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-slate-500">
        Loading class details...
      </div>
    );
  }

  if (!cls) {
    return (
      <div className="p-10 text-red-500">
        Class not found
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {cls.name}
          </h1>
          <p className="text-sm text-slate-500">
            Grade: {cls.grade?.name}
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-slate-50"
        >
          ← Back
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Sections" value={cls.sections?.length || 0} />
        <StatCard title="Subjects" value={subjects.length} />
        <StatCard
          title="Status"
          value={cls.isActive ? "Active" : "Inactive"}
        />
      </div>

      {/* SUBJECTS TABLE */}
      <div className="bg-white rounded-xl shadow border">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-lg text-slate-700">
            Subjects
          </h2>
        </div>

        {subjects.length === 0 ? (
          <p className="p-6 text-slate-400">
            No subjects added yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((sub: any) => (
                <tr
                  key={sub.id}
                  className="border-t hover:bg-slate-50"
                >
                  {editingId === sub.id ? (
                    <>
                      <td className="p-4">
                        <input
                          value={form.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              name: e.target.value
                            })
                          }
                          className="border rounded px-3 py-1 w-full"
                        />
                      </td>

                      <td className="p-4 text-slate-400">
                        Auto
                      </td>

                      <td className="p-4">
                        <input
                          value={form.description}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              description: e.target.value
                            })
                          }
                          className="border rounded px-3 py-1 w-full"
                        />
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => saveEdit(sub.id)}
                          disabled={saving}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 font-medium">
                        {sub.name}
                      </td>
                      <td className="p-4 text-slate-500">
                        {sub.code}
                      </td>
                      <td className="p-4 text-slate-500">
                        {sub.description || "-"}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => startEdit(sub)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
