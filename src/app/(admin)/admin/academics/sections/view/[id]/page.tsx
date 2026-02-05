// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";

// export default function ViewSectionPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [section, setSection] = useState<any>(null);

//   useEffect(() => {
//     apiConnector("GET", `/sections/${id}`).then(res => setSection(res.data));
//   }, [id]);

//   if (!section) return <p className="p-8">Loading...</p>;

// return (
//   <div className="min-h-screen bg-slate-50 p-8 space-y-8">

//     {/* PAGE HEADER */}
//     <div className="flex items-start justify-between">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">{section.name}</h1>
//         <p className="text-slate-500 mt-1 text-sm">
//           Section overview and configuration details
//         </p>
//       </div>

//       <button
//         onClick={() => router.back()}
//         className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-100"
//       >
//         Back to Sections
//       </button>
//     </div>

//     {/* STATS CARDS */}
//     <div className="grid grid-cols-3 gap-6">
//       <StatCard title="Class" value={section.class?.name || "-"} />
//       <StatCard title="School" value={section.school?.name || "-"} />
//       <StatCard title="Created On" value={new Date(section.createdAt).toLocaleDateString()} />
//     </div>

//     {/* DETAILS CARD */}
//     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
//       <div className="p-8 border-b">
//         <h2 className="text-lg font-semibold text-slate-800">Section Details</h2>
//         <p className="text-sm text-slate-500 mt-1">
//           Core information related to this section
//         </p>
//       </div>

//       <div className="p-8 grid grid-cols-2 gap-6 text-sm">
//         <DetailItem label="Section Name" value={section.name} />
//         <DetailItem label="Class Name" value={section.class?.name} />
//         <DetailItem label="School Name" value={section.school?.name} />
//         <DetailItem label="Created Date" value={new Date(section.createdAt).toLocaleDateString()} />
//       </div>
//     </div>

//   </div>
// );

// }


// function StatCard({ title, value }: any) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
//       <p className="text-slate-500 text-sm">{title}</p>
//       <h3 className="text-xl font-semibold text-slate-900 mt-2">{value}</h3>
//     </div>
//   );
// }

// function DetailItem({ label, value }: any) {
//   return (
//     <div>
//       <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
//       <p className="text-slate-800 font-medium mt-1">{value || "-"}</p>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";
// import {
//   ArrowLeft,
//   School,
//   Layers,
//   Calendar,
//   Building2,
//   BadgeCheck,
// } from "lucide-react";

// export default function ViewSectionPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [section, setSection] = useState<any>(null);

//   useEffect(() => {
//     apiConnector("GET", `/sections/${id}`).then(res => setSection(res.data));
//   }, [id]);

//   if (!section)
//     return (
//       <div className="flex justify-center py-24 text-slate-500">
//         Loading section details...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-slate-50 p-8 space-y-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-4">
//           <div className="h-14 w-14 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
//             <Layers size={28} />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">{section.name}</h1>
//             <div className="flex items-center gap-3 mt-1">
//               <span className="text-sm text-slate-500">
//                 Section ID: {section.id}
//               </span>
//               <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
//                 <BadgeCheck size={12} /> Active
//               </span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-slate-100"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>
//       </div>

//       {/* INFO GRID */}
//       <div className="grid md:grid-cols-3 gap-6">
//         <InfoCard icon={<Layers size={18} />} label="Class" value={section.class?.name} />
//         <InfoCard icon={<School size={18} />} label="School" value={section.school?.name} />
//         <InfoCard icon={<Calendar size={18} />} label="Created On" value={new Date(section.createdAt).toLocaleDateString()} />
//       </div>

//       {/* DETAILS SECTION */}
//       <div className="bg-white border rounded-2xl shadow-sm">

//         <div className="px-8 py-6 border-b">
//           <h2 className="text-lg font-semibold text-slate-800">Section Information</h2>
//           <p className="text-sm text-slate-500 mt-1">
//             Core configuration and academic linkage
//           </p>
//         </div>

//         <div className="p-8 grid md:grid-cols-2 gap-8 text-sm">
//           <DetailItem label="Section Name" value={section.name} />
//           <DetailItem label="Class Name" value={section.class?.name} />
//           <DetailItem label="School Name" value={section.school?.name} />
//           <DetailItem label="Created Date" value={new Date(section.createdAt).toLocaleDateString()} />
//         </div>
//       </div>

//       {/* METADATA CARD */}
//       <div className="bg-white border rounded-2xl shadow-sm p-6 text-sm text-slate-500 flex justify-between">
//         <span>Section created at {new Date(section.createdAt).toLocaleString()}</span>
//         <span>Last updated at {new Date(section.updatedAt).toLocaleString()}</span>
//       </div>
//     </div>
//   );
// }

// function InfoCard({ icon, label, value }: any) {
//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
//       <div className="h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg">
//         {icon}
//       </div>
//       <div>
//         <p className="text-slate-500 text-sm">{label}</p>
//         <p className="text-slate-900 font-semibold mt-1">{value || "-"}</p>
//       </div>
//     </div>
//   );
// }

// function DetailItem({ label, value }: any) {
//   return (
//     <div>
//       <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
//       <p className="text-slate-800 font-medium mt-1">{value || "-"}</p>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiConnector } from "@/services/apiConnecter";
import {
  ArrowLeft,
  School,
  Layers,
  Calendar,
  BadgeCheck,
  Users,
  GraduationCap,
} from "lucide-react";

export default function ViewSectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    apiConnector("GET", `/sections/${id}`).then((res) =>
      setSection(res.data)
    );
  }, [id]);

  if (!section)
    return (
      <div className="flex justify-center py-24 text-slate-500">
        Loading section details...
      </div>
    );

  const students = section._count?.students || 0;
  const capacity = section.capacity || 0;

  const percent =
    capacity > 0 ? Math.round((students / capacity) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
            <Layers size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">{section.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-slate-500">
                Section ID: {section.id}
              </span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                <BadgeCheck size={12} /> Active
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* INFO CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <InfoCard icon={<Layers size={18} />} label="Class" value={section.class?.name} />
        <InfoCard icon={<GraduationCap size={18} />} label="Grade" value={section.class?.grade?.name} />
        <InfoCard icon={<Users size={18} />} label="Students" value={students} />
        <InfoCard icon={<School size={18} />} label="School" value={section.school?.name} />
      </div>

      {/* DETAILS */}
      <div className="bg-white border rounded-2xl shadow-sm">
        <div className="px-8 py-6 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Section Details</h2>
          <p className="text-sm text-slate-500 mt-1">
            Core configuration and academic linkage
          </p>
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-8 text-sm">
          <DetailItem label="Section Name" value={section.name} />
          <DetailItem label="Class Name" value={section.class?.name} />
          <DetailItem label="Grade Name" value={section.class?.grade?.name} />
          <DetailItem label="School Name" value={section.school?.name} />
        </div>
      </div>

      {/* CAPACITY INFO */}
      <div className="bg-white border rounded-2xl shadow-sm p-8 grid md:grid-cols-2 gap-8 text-sm">
        <DetailItem label="Section Capacity" value={capacity} />
        <DetailItem label="Class Max Capacity" value={section.class?.maxStudents} />
      </div>

      {/* OCCUPANCY BAR */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <p className="text-sm text-slate-500 mb-2">Section Occupancy</p>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {students} of {capacity} students ({percent}%)
        </p>
      </div>

      {/* METADATA */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 text-sm text-slate-500 flex justify-between">
        <span>Created at {new Date(section.createdAt).toLocaleString()}</span>
        <span>Last updated at {new Date(section.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
      <div className="h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-slate-900 font-semibold mt-1">{value || "-"}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-slate-800 font-medium mt-1">{value || "-"}</p>
    </div>
  );
}
