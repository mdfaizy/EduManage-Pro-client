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





// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   Loader2,
//   School,
//   Users,
//   BookOpen,
//   ShieldCheck,
//   UserCheck,
//   Layers,
// } from "lucide-react";

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
//     if (!form.teacherId || !form.classId)
//       return toast.error("Select teacher and class");

//     try {
//       setLoading(true);
//       await apiConnector("POST", "/assign-teacher", {
//         teacherId: Number(form.teacherId),
//         classId: Number(form.classId),
//         isClassTeacher: form.isClassTeacher,
//       });
//       toast.success("Teacher assigned successfully");
//       setForm((p) => ({ ...p, teacherId: "", classId: "", isClassTeacher: false }));
//     } catch {
//       toast.error("Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading)
//     return (
//       <div className="flex justify-center py-24">
//         <Loader2 className="animate-spin h-10 w-10 text-brand-500" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8">

//       {/* PAGE HEADER */}
//       <div className="max-w-6xl mx-auto mb-10">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">Assign Teacher</h1>
//         <p className="text-gray-500">Manage teacher-class relationships in your school</p>

//         {/* INFO CARDS */}
//         <div className="grid sm:grid-cols-3 gap-6 mt-6">
//           <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Teachers</p>
//               <h2 className="text-2xl font-bold text-brand-600">{teachers.length}</h2>
//             </div>
//             <Users className="text-brand-500" />
//           </div>

//           <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Classes</p>
//               <h2 className="text-2xl font-bold text-brand-600">{classes.length}</h2>
//             </div>
//             <Layers className="text-brand-500" />
//           </div>

//           <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">School</p>
//               <h2 className="text-lg font-semibold">{form.schoolName}</h2>
//             </div>
//             <School className="text-brand-500" />
//           </div>
//         </div>
//       </div>

//       {/* FORM CARD */}
//       <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border p-10">
//         <div className="mb-8">
//           <div className="flex items-center mb-2">
//             <UserCheck className="text-brand-500 mr-2" />
//             <h2 className="text-2xl font-bold text-gray-800">
//               Assign Teacher to Class
//             </h2>
//           </div>
//           <p className="text-gray-500 text-sm">
//             Select teacher and class, and optionally assign as class teacher
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-7">

//           {/* Teacher */}
//           <div>
//             <Label>Teacher</Label>
//             <select
//               value={form.teacherId}
//               onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
//               className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-brand-500"
//             >
//               <option value="">Choose Teacher</option>
//               {teachers.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.user.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Class */}
//           <div>
//             <Label>Class</Label>
//             <select
//               value={form.classId}
//               onChange={(e) => setForm({ ...form, classId: e.target.value })}
//               className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-brand-500"
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
//           <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border">
//             <div>
//               <p className="font-medium text-gray-700">Make Class Teacher</p>
//               <p className="text-xs text-gray-400">Gives full class responsibility</p>
//             </div>
//             <input
//               type="checkbox"
//               checked={form.isClassTeacher}
//               onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
//               className="w-5 h-5 accent-brand-500"
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center"
//           >
//             {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Assign Teacher"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import Select from "@/components/form/Select";
// import Form from "@/components/form/Form";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, Users, Layers, School, UserCheck } from "lucide-react";

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
//     subject: "",
//     section: "",
//     academicYear: "2025-26",
//     periods: "",
//     roomNumber: "",
//     startDate: "",
//     endDate: "",
//     status: "active",
//     remarks: "",
//     isClassTeacher: false,
//     schoolName: "",
//   });

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [bootLoading, setBootLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         setForm((p) => ({ ...p, schoolName: me.data.data.schoolName }));

//         const [tRes, cRes] = await Promise.all([
//           apiConnector("GET", "/teachers"),
//           apiConnector("GET", "/classes"),
//         ]);

//         setTeachers(tRes.data || []);
//         setClasses(cRes.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       } finally {
//         setBootLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const handleSubmit = async () => {
//     if (!form.teacherId || !form.classId)
//       return toast.error("Teacher & Class required");

//     try {
//       setLoading(true);
//       await apiConnector("POST", "/assign-teacher", {
//         ...form,
//         teacherId: Number(form.teacherId),
//         classId: Number(form.classId),
//         periods: form.periods.split(","),
//       });

//       toast.success("Teacher Assigned 🎉");

//       setForm((p) => ({
//         ...p,
//         teacherId: "",
//         classId: "",
//         subject: "",
//         section: "",
//         periods: "",
//         roomNumber: "",
//         startDate: "",
//         endDate: "",
//         remarks: "",
//         isClassTeacher: false,
//       }));
//     } catch {
//       toast.error("Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading)
//     return (
//       <div className="flex justify-center py-24">
//         <Loader2 className="animate-spin h-10 w-10 text-brand-500" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
//       <div className="max-w-6xl mx-auto mb-10">
//         <h1 className="text-4xl font-bold mb-2">Assign Teacher</h1>
//         <p className="text-gray-500">ERP Teacher Assignment</p>

//         <div className="grid sm:grid-cols-3 gap-6 mt-6">
//           <InfoCard title="Teachers" value={teachers.length} icon={<Users />} />
//           <InfoCard title="Classes" value={classes.length} icon={<Layers />} />
//           <InfoCard title="School" value={form.schoolName} icon={<School />} />
//         </div>
//       </div>

//       <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border p-10">
//         <div className="flex items-center mb-6">
//           <UserCheck className="text-brand-500 mr-2" />
//           <h2 className="text-2xl font-bold">Assignment Details</h2>
//         </div>

//         <Form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <Label>Teacher *</Label>
//             <Select
//               value={form.teacherId}
//               onChange={(v) => setForm({ ...form, teacherId: v })}
//               options={teachers.map((t) => ({ label: t.user.name, value: String(t.id) }))}
//             />
//           </div>

//           <div>
//             <Label>Class *</Label>
//             <Select
//               value={form.classId}
//               onChange={(v) => setForm({ ...form, classId: v })}
//               options={classes.map((c) => ({ label: c.name, value: String(c.id) }))}
//             />
//           </div>

//           <div><Label>Subject</Label>
//             <Input value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})}/>
//           </div>

//           <div><Label>Section</Label>
//             <Input value={form.section} onChange={(e)=>setForm({...form,section:e.target.value})}/>
//           </div>

//           <div><Label>Academic Year</Label>
//             <Input value={form.academicYear} onChange={(e)=>setForm({...form,academicYear:e.target.value})}/>
//           </div>

//           <div><Label>Room Number</Label>
//             <Input value={form.roomNumber} onChange={(e)=>setForm({...form,roomNumber:e.target.value})}/>
//           </div>

//           <div><Label>Periods</Label>
//             <Input value={form.periods} onChange={(e)=>setForm({...form,periods:e.target.value})} hint="Example: Mon-1, Tue-2"/>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div><Label>Start Date</Label>
//               <Input type="date" value={form.startDate} onChange={(e)=>setForm({...form,startDate:e.target.value})}/>
//             </div>
//             <div><Label>End Date</Label>
//               <Input type="date" value={form.endDate} onChange={(e)=>setForm({...form,endDate:e.target.value})}/>
//             </div>
//           </div>

//           <div>
//             <Label>Status</Label>
//             <Select
//               value={form.status}
//               onChange={(v)=>setForm({...form,status:v})}
//               options={[
//                 {label:"Active",value:"active"},
//                 {label:"Scheduled",value:"scheduled"},
//                 {label:"Ended",value:"ended"},
//               ]}
//             />
//           </div>

//           <div><Label>Remarks</Label>
//             <Input value={form.remarks} onChange={(e)=>setForm({...form,remarks:e.target.value})}/>
//           </div>

//           <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border">
//             <span>Make Class Teacher</span>
//             <input type="checkbox" checked={form.isClassTeacher}
//               onChange={(e)=>setForm({...form,isClassTeacher:e.target.checked})}/>
//           </div>

//           <button disabled={loading}
//             className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold">
//             {loading ? <Loader2 className="animate-spin"/> : "Assign Teacher"}
//           </button>

//         </Form>
//       </div>
//     </div>
//   );
// }

// const InfoCard = ({title,value,icon}:any)=>(
//   <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between">
//     <div><p className="text-sm text-gray-500">{title}</p>
//     <h2 className="text-2xl font-bold text-brand-600">{value}</h2></div>
//     {icon}
//   </div>
// );





// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import Select from "@/components/form/Select";
// import Form from "@/components/form/Form";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, Users, Layers, School, UserCheck, Calendar, BookOpen, MapPin, Clock, CheckCircle2 } from "lucide-react";

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
//     subject: "",
//     section: "",
//     academicYear: "2025-26",
//     periods: "",
//     roomNumber: "",
//     startDate: "",
//     endDate: "",
//     status: "active",
//     remarks: "",
//     isClassTeacher: false,
//     schoolName: "",
//   });

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [bootLoading, setBootLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         setForm((p) => ({ ...p, schoolName: me.data.data.schoolName }));

//         const [tRes, cRes] = await Promise.all([
//           apiConnector("GET", "/teachers"),
//           apiConnector("GET", "/classes"),
//         ]);

//         setTeachers(tRes.data || []);
//         setClasses(cRes.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       } finally {
//         setBootLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const handleSubmit = async () => {
//     if (!form.teacherId || !form.classId)
//       return toast.error("Teacher & Class required");

//     try {
//       setLoading(true);
//       await apiConnector("POST", "/assign-teacher", {
//         ...form,
//         teacherId: Number(form.teacherId),
//         classId: Number(form.classId),
//         periods: form.periods.split(","),
//       });

//       toast.success("Teacher Assigned Successfully 🎉");

//       setForm((p) => ({
//         ...p,
//         teacherId: "",
//         classId: "",
//         subject: "",
//         section: "",
//         periods: "",
//         roomNumber: "",
//         startDate: "",
//         endDate: "",
//         remarks: "",
//         isClassTeacher: false,
//       }));
//     } catch {
//       toast.error("Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 p-4 md:p-8">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Teacher Assignment</h1>
//             <p className="text-gray-500">Manage and assign teaching responsibilities across classes</p>
//           </div>
//           <div className="mt-4 md:mt-0 bg-white rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
//             <div className="flex items-center gap-2">
//               <School className="h-5 w-5 text-indigo-600" />
//               <span className="font-medium text-gray-900">{form.schoolName}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Total Teachers</p>
//                 <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
//                 <p className="text-sm text-gray-500 mt-2">Available for assignment</p>
//               </div>
//               <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
//                 <Users className="h-6 w-6 text-indigo-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Classes</p>
//                 <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
//                 <p className="text-sm text-gray-500 mt-2">Across all sections</p>
//               </div>
//               <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
//                 <Layers className="h-6 w-6 text-emerald-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Current Year</p>
//                 <p className="text-3xl font-bold text-gray-900">2025-26</p>
//                 <p className="text-sm text-gray-500 mt-2">Academic session</p>
//               </div>
//               <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                 <Calendar className="h-6 w-6 text-amber-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Form Card */}
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             {/* Form Header */}
//             <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
//                   <UserCheck className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">New Assignment</h2>
//                   <p className="text-gray-500 text-sm">Fill in the details to assign a teacher</p>
//                 </div>
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="p-8">
//               <Form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {/* Left Column */}
//                   <div className="space-y-6">
//                     {/* Teacher Selection */}
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <Users className="h-4 w-4 text-indigo-600" />
//                         <Label className="text-sm font-semibold text-gray-700">Select Teacher *</Label>
//                       </div>
//                       <Select
//                         value={form.teacherId}
//                         onChange={(v) => setForm({ ...form, teacherId: v })}
//                         options={[
//                           { label: "Choose a teacher", value: "" },
//                           ...teachers.map((t) => ({ label: t.user.name, value: String(t.id) }))
//                         ]}
//                         className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
//                       />
//                     </div>

//                     {/* Class Selection */}
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <Layers className="h-4 w-4 text-indigo-600" />
//                         <Label className="text-sm font-semibold text-gray-700">Select Class *</Label>
//                       </div>
//                       <Select
//                         value={form.classId}
//                         onChange={(v) => setForm({ ...form, classId: v })}
//                         options={[
//                           { label: "Choose a class", value: "" },
//                           ...classes.map((c) => ({ label: c.name, value: String(c.id) }))
//                         ]}
//                         className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
//                       />
//                     </div>

//                     {/* Subject & Section */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Subject</Label>
//                         <div className="relative">
//                           <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <Input
//                             value={form.subject}
//                             onChange={(e) => setForm({ ...form, subject: e.target.value })}
//                             className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg"
//                             placeholder="e.g., Mathematics"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Section</Label>
//                         <Input
//                           value={form.section}
//                           onChange={(e) => setForm({ ...form, section: e.target.value })}
//                           className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                           placeholder="e.g., A"
//                         />
//                       </div>
//                     </div>

//                     {/* Academic Year & Room */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Academic Year</Label>
//                         <div className="relative">
//                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <Input
//                             value={form.academicYear}
//                             onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
//                             className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg"
//                             placeholder="2025-26"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Room Number</Label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <Input
//                             value={form.roomNumber}
//                             onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
//                             className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg"
//                             placeholder="e.g., 101"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div className="space-y-6">
//                     {/* Periods */}
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <Clock className="h-4 w-4 text-indigo-600" />
//                         <Label className="text-sm font-semibold text-gray-700">Schedule Periods</Label>
//                       </div>
//                       <Input
//                         value={form.periods}
//                         onChange={(e) => setForm({ ...form, periods: e.target.value })}
//                         className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                         placeholder="Mon-1, Tue-3, Wed-2, Thu-4, Fri-5"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">Enter comma-separated period schedule</p>
//                     </div>

//                     {/* Date Range */}
//                     <div className="space-y-4">
//                       <Label className="text-sm font-medium text-gray-700">Assignment Period</Label>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <Label className="text-xs text-gray-600 mb-1">Start Date</Label>
//                           <Input
//                             type="date"
//                             value={form.startDate}
//                             onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                             className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                           />
//                         </div>
//                         <div>
//                           <Label className="text-xs text-gray-600 mb-1">End Date</Label>
//                           <Input
//                             type="date"
//                             value={form.endDate}
//                             onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                             className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status */}
//                     <div>
//                       <Label className="text-sm font-medium text-gray-700 mb-3">Status</Label>
//                       <div className="grid grid-cols-3 gap-2">
//                         {["active", "scheduled", "ended"].map((status) => (
//                           <button
//                             key={status}
//                             type="button"
//                             onClick={() => setForm({ ...form, status })}
//                             className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
//                               form.status === status
//                                 ? "border-indigo-600 bg-indigo-50 text-indigo-700"
//                                 : "border-gray-300 text-gray-600 hover:bg-gray-50"
//                             }`}
//                           >
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Class Teacher Toggle */}
//                     <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center">
//                             <CheckCircle2 className="h-4 w-4 text-indigo-600" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900">Class Teacher Role</p>
//                             <p className="text-sm text-gray-500">Assign additional responsibilities</p>
//                           </div>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={form.isClassTeacher}
//                             onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                         </label>
//                       </div>
//                     </div>

//                     {/* Remarks */}
//                     <div>
//                       <Label className="text-sm font-medium text-gray-700 mb-3">Additional Notes</Label>
//                       <textarea
//                         value={form.remarks}
//                         onChange={(e) => setForm({ ...form, remarks: e.target.value })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 resize-none"
//                         rows={3}
//                         placeholder="Any special instructions or notes..."
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-6 border-t border-gray-100">
//                   <button
//                     type="submit"
//                     disabled={loading || !form.teacherId || !form.classId}
//                     className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <UserCheck className="h-5 w-5" />
//                         Assign Teacher
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </Form>
//             </div>
//           </div>

//           {/* Footer Note */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               All assignments are subject to approval and will be reflected in the timetable within 24 hours.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import Select from "@/components/form/Select";
// import Form from "@/components/form/Form";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { Loader2, Users, Layers, School, UserCheck, Calendar, BookOpen, MapPin, Clock, CheckCircle2, Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

// interface Teacher {
//   id: number;
//   user: { name: string };
// }

// interface ClassType {
//   id: number;
//   name: string;
//   sections: string[];
// }

// interface TimeSlot {
//   id: number;
//   day: string;
//   startTime: string;
//   endTime: string;
//   periodNumber: number;
// }

// interface ClassAssignment {
//   id: string;
//   classId: string;
//   section: string;
//   subject: string;
//   day: string;
//   startTime: string;
//   endTime: string;
//   periodNumber: number;
//   roomNumber: string;
// }

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const PERIOD_TIMES = [
//   { period: 1, start: "08:00", end: "08:45" },
//   { period: 2, start: "08:45", end: "09:30" },
//   { period: 3, start: "09:30", end: "10:15" },
//   { period: 4, start: "10:15", end: "11:00" },
//   { period: 5, start: "11:00", end: "11:45" },
//   { period: 6, start: "11:45", end: "12:30" },
//   { period: 7, start: "12:30", end: "13:15" },
//   { period: 8, start: "13:15", end: "14:00" },
// ];

// export default function AssignTeacherForm() {
//   const [form, setForm] = useState({
//     teacherId: "",
//     academicYear: "2025-26",
//     startDate: "",
//     endDate: "",
//     status: "active",
//     remarks: "",
//     isClassTeacher: false,
//     schoolName: "",
//   });

//   const [classAssignments, setClassAssignments] = useState<ClassAssignment[]>([
//     { id: "1", classId: "", section: "", subject: "", day: "Monday", startTime: "08:00", endTime: "08:45", periodNumber: 1, roomNumber: "" }
//   ]);

//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [bootLoading, setBootLoading] = useState(true);
//   const [showSchedule, setShowSchedule] = useState(true);
//   const [selectedDay, setSelectedDay] = useState("Monday");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const me = await apiConnector("GET", "/auth/me");
//         setForm((p) => ({ ...p, schoolName: me.data.data.schoolName }));

//         const [tRes, cRes] = await Promise.all([
//           apiConnector("GET", "/teachers"),
//           apiConnector("GET", "/classes"),
//         ]);

//         setTeachers(tRes.data || []);
//         setClasses(cRes.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       } finally {
//         setBootLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const addClassAssignment = () => {
//     const newId = (classAssignments.length + 1).toString();
//     setClassAssignments([
//       ...classAssignments,
//       { 
//         id: newId, 
//         classId: "", 
//         section: "", 
//         subject: "", 
//         day: "Monday", 
//         startTime: "08:00", 
//         endTime: "08:45", 
//         periodNumber: 1, 
//         roomNumber: "" 
//       }
//     ]);
//   };

//   const removeClassAssignment = (id: string) => {
//     if (classAssignments.length > 1) {
//       setClassAssignments(classAssignments.filter(item => item.id !== id));
//     }
//   };

//   const updateClassAssignment = (id: string, field: keyof ClassAssignment, value: string | number) => {
//     setClassAssignments(classAssignments.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const getClassSections = (classId: string) => {
//     const classData = classes.find(c => c.id === parseInt(classId));
//     return classData?.sections || [];
//   };

//   const getPeriodOptions = () => {
//     return PERIOD_TIMES.map(time => ({
//       label: `Period ${time.period} (${time.start} - ${time.end})`,
//       value: time.period.toString()
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!form.teacherId) {
//       return toast.error("Please select a teacher");
//     }

//     if (classAssignments.some(a => !a.classId || !a.subject)) {
//       return toast.error("Please fill all required fields in the schedule");
//     }

//     try {
//       setLoading(true);
//       const assignments = classAssignments.map(assignment => ({
//         classId: parseInt(assignment.classId),
//         section: assignment.section,
//         subject: assignment.subject,
//         day: assignment.day,
//         startTime: assignment.startTime,
//         endTime: assignment.endTime,
//         periodNumber: assignment.periodNumber,
//         roomNumber: assignment.roomNumber,
//       }));

//       await apiConnector("POST", "/assign-teacher", {
//         ...form,
//         teacherId: Number(form.teacherId),
//         assignments,
//       });

//       toast.success("Teacher Schedule Assigned Successfully 🎉");

//       // Reset form
//       setForm((p) => ({
//         ...p,
//         teacherId: "",
//         startDate: "",
//         endDate: "",
//         remarks: "",
//         isClassTeacher: false,
//       }));
//       setClassAssignments([
//         { id: "1", classId: "", section: "", subject: "", day: "Monday", startTime: "08:00", endTime: "08:45", periodNumber: 1, roomNumber: "" }
//       ]);
//     } catch {
//       toast.error("Assignment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTeacherScheduleSummary = () => {
//     const summary = {};
//     classAssignments.forEach(assignment => {
//       if (assignment.classId && assignment.subject) {
//         const key = `${assignment.day}-${assignment.startTime}`;
//         summary[key] = {
//           class: classes.find(c => c.id === parseInt(assignment.classId))?.name || '',
//           section: assignment.section,
//           subject: assignment.subject,
//           period: assignment.periodNumber,
//         };
//       }
//     });
//     return summary;
//   };

//   if (bootLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Teacher Timetable Assignment</h1>
//             <p className="text-gray-500">Create comprehensive weekly schedule for teachers</p>
//           </div>
//           <div className="mt-4 md:mt-0 bg-white rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
//             <div className="flex items-center gap-2">
//               <School className="h-5 w-5 text-indigo-600" />
//               <span className="font-medium text-gray-900">{form.schoolName}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Total Teachers</p>
//                 <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
//               </div>
//               <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
//                 <Users className="h-6 w-6 text-indigo-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Classes</p>
//                 <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
//               </div>
//               <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
//                 <Layers className="h-6 w-6 text-emerald-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Periods Scheduled</p>
//                 <p className="text-3xl font-bold text-gray-900">{classAssignments.filter(a => a.classId).length}</p>
//               </div>
//               <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                 <Clock className="h-6 w-6 text-amber-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Current Year</p>
//                 <p className="text-3xl font-bold text-gray-900">2025-26</p>
//               </div>
//               <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <Calendar className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             {/* Form Header */}
//             <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
//                   <UserCheck className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Create Teacher Schedule</h2>
//                   <p className="text-gray-500 text-sm">Assign classes and periods for the academic week</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <Form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Teacher Selection & Basic Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {/* Left Column - Teacher Info */}
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <Users className="h-4 w-4 text-indigo-600" />
//                         <Label className="text-sm font-semibold text-gray-700">Select Teacher *</Label>
//                       </div>
//                       <Select
//                         value={form.teacherId}
//                         onChange={(v) => setForm({ ...form, teacherId: v })}
//                         options={[
//                           { label: "Choose a teacher", value: "" },
//                           ...teachers.map((t) => ({ label: t.user.name, value: String(t.id) }))
//                         ]}
//                         className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Academic Year</Label>
//                         <div className="relative">
//                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <Input
//                             value={form.academicYear}
//                             onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
//                             className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg"
//                             placeholder="2025-26"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Status</Label>
//                         <Select
//                           value={form.status}
//                           onChange={(v) => setForm({ ...form, status: v })}
//                           options={[
//                             { label: "Active", value: "active" },
//                             { label: "Scheduled", value: "scheduled" },
//                             { label: "Inactive", value: "inactive" },
//                           ]}
//                           className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">Start Date</Label>
//                         <Input
//                           type="date"
//                           value={form.startDate}
//                           onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                           className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                         />
//                       </div>
//                       <div>
//                         <Label className="text-sm font-medium text-gray-700 mb-2">End Date</Label>
//                         <Input
//                           type="date"
//                           value={form.endDate}
//                           onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                           className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                         />
//                       </div>
//                     </div>

//                     {/* Class Teacher Toggle */}
//                     <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center">
//                             <CheckCircle2 className="h-4 w-4 text-indigo-600" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900">Class Teacher Role</p>
//                             <p className="text-sm text-gray-500">Assign additional responsibilities</p>
//                           </div>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={form.isClassTeacher}
//                             onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - Quick Schedule Preview */}
//                   <div className="space-y-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule Preview</h3>
//                         <p className="text-sm text-gray-500">Assigned classes for this teacher</p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setShowSchedule(!showSchedule)}
//                         className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
//                       >
//                         {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                         {showSchedule ? "Hide" : "Show"} Schedule
//                       </button>
//                     </div>

//                     {showSchedule && (
//                       <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                         <div className="space-y-3">
//                           {DAYS.map(day => {
//                             const dayAssignments = classAssignments.filter(a => a.day === day && a.classId);
//                             if (dayAssignments.length === 0) return null;
                            
//                             return (
//                               <div key={day} className="pb-3 border-b border-gray-200 last:border-0">
//                                 <div className="flex items-center justify-between mb-2">
//                                   <span className="font-medium text-gray-700">{day}</span>
//                                   <span className="text-sm text-gray-500">{dayAssignments.length} classes</span>
//                                 </div>
//                                 <div className="space-y-2">
//                                   {dayAssignments.map(assignment => {
//                                     const classData = classes.find(c => c.id === parseInt(assignment.classId));
//                                     return (
//                                       <div key={assignment.id} className="bg-white p-3 rounded-lg border border-gray-200">
//                                         <div className="flex justify-between items-start">
//                                           <div>
//                                             <div className="flex items-center gap-2">
//                                               <Clock className="h-3 w-3 text-gray-400" />
//                                               <span className="text-sm font-medium text-gray-900">
//                                                 {assignment.startTime} - {assignment.endTime}
//                                               </span>
//                                             </div>
//                                             <p className="text-sm text-gray-700 mt-1">
//                                               {classData?.name} • Section {assignment.section}
//                                             </p>
//                                             <p className="text-xs text-gray-500">{assignment.subject}</p>
//                                           </div>
//                                           <button
//                                             type="button"
//                                             onClick={() => removeClassAssignment(assignment.id)}
//                                             className="text-gray-400 hover:text-red-500"
//                                           >
//                                             <Trash2 size={14} />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}

//                     {/* Remarks */}
//                     <div>
//                       <Label className="text-sm font-medium text-gray-700 mb-3">Additional Notes</Label>
//                       <textarea
//                         value={form.remarks}
//                         onChange={(e) => setForm({ ...form, remarks: e.target.value })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 resize-none"
//                         rows={3}
//                         placeholder="Any special instructions or notes..."
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Schedule Builder Section */}
//                 <div className="border-t border-gray-200 pt-8">
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Class Schedule Builder</h3>
//                       <p className="text-sm text-gray-500">Add classes for different periods and days</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={addClassAssignment}
//                       className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
//                     >
//                       <Plus size={16} />
//                       Add Class Period
//                     </button>
//                   </div>

//                   {/* Day Filter Tabs */}
//                   <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//                     {DAYS.map(day => (
//                       <button
//                         key={day}
//                         type="button"
//                         onClick={() => setSelectedDay(day)}
//                         className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
//                           selectedDay === day
//                             ? 'bg-indigo-100 text-indigo-700 font-medium'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Class Assignments Table */}
//                   <div className="overflow-x-auto rounded-xl border border-gray-200">
//                     <table className="w-full">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Period</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Class *</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Section *</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Subject *</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Room</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Time</th>
//                           <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200">
//                         {classAssignments
//                           .filter(a => a.day === selectedDay)
//                           .map((assignment) => (
//                             <tr key={assignment.id} className="hover:bg-gray-50/50">
//                               <td className="py-3 px-4">
//                                 <Select
//                                   value={assignment.periodNumber.toString()}
//                                   onChange={(v) => updateClassAssignment(assignment.id, 'periodNumber', parseInt(v))}
//                                   options={getPeriodOptions()}
//                                   className="border-gray-300 focus:border-indigo-500 rounded-lg w-48"
//                                 />
//                               </td>
//                               <td className="py-3 px-4">
//                                 <Select
//                                   value={assignment.classId}
//                                   onChange={(v) => {
//                                     updateClassAssignment(assignment.id, 'classId', v);
//                                     updateClassAssignment(assignment.id, 'section', '');
//                                   }}
//                                   options={[
//                                     { label: "Select Class", value: "" },
//                                     ...classes.map(c => ({ label: c.name, value: c.id.toString() }))
//                                   ]}
//                                   className="border-gray-300 focus:border-indigo-500 rounded-lg w-48"
//                                 />
//                               </td>
//                               <td className="py-3 px-4">
//                                 <Select
//                                   value={assignment.section}
//                                   onChange={(v) => updateClassAssignment(assignment.id, 'section', v)}
//                                   options={[
//                                     { label: "Select Section", value: "" },
//                                     ...getClassSections(assignment.classId).map(s => ({ label: s, value: s }))
//                                   ]}
//                                   className="border-gray-300 focus:border-indigo-500 rounded-lg w-32"
//                                 />
//                               </td>
//                               <td className="py-3 px-4">
//                                 <div className="relative">
//                                   <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                                   <Input
//                                     value={assignment.subject}
//                                     onChange={(e) => updateClassAssignment(assignment.id, 'subject', e.target.value)}
//                                     className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg w-48"
//                                     placeholder="e.g., Mathematics"
//                                   />
//                                 </div>
//                               </td>
//                               <td className="py-3 px-4">
//                                 <div className="relative">
//                                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                                   <Input
//                                     value={assignment.roomNumber}
//                                     onChange={(e) => updateClassAssignment(assignment.id, 'roomNumber', e.target.value)}
//                                     className="pl-10 border-gray-300 focus:border-indigo-500 rounded-lg w-32"
//                                     placeholder="101"
//                                   />
//                                 </div>
//                               </td>
//                               <td className="py-3 px-4">
//                                 <div className="flex gap-2">
//                                   <Input
//                                     type="time"
//                                     value={assignment.startTime}
//                                     onChange={(e) => updateClassAssignment(assignment.id, 'startTime', e.target.value)}
//                                     className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                                   />
//                                   <Input
//                                     type="time"
//                                     value={assignment.endTime}
//                                     onChange={(e) => updateClassAssignment(assignment.id, 'endTime', e.target.value)}
//                                     className="border-gray-300 focus:border-indigo-500 rounded-lg"
//                                   />
//                                 </div>
//                               </td>
//                               <td className="py-3 px-4">
//                                 <button
//                                   type="button"
//                                   onClick={() => removeClassAssignment(assignment.id)}
//                                   className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                                   disabled={classAssignments.length === 1}
//                                 >
//                                   <Trash2 size={16} />
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Day Selection for Each Assignment */}
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {DAYS.map(day => {
//                       const assignmentsCount = classAssignments.filter(a => a.day === day && a.classId).length;
//                       return (
//                         <div key={day} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
//                           <span className="text-sm font-medium text-gray-700">{day}</span>
//                           <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
//                             {assignmentsCount} classes
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-8 border-t border-gray-100">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                     <div className="text-sm text-gray-500">
//                       <p>Total periods scheduled: <span className="font-medium text-gray-900">{classAssignments.filter(a => a.classId).length}</span></p>
//                       <p>Teacher will be notified upon submission</p>
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={loading || !form.teacherId || classAssignments.filter(a => a.classId).length === 0}
//                       className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="h-5 w-5 animate-spin" />
//                           Creating Schedule...
//                         </>
//                       ) : (
//                         <>
//                           <UserCheck className="h-5 w-5" />
//                           Assign Complete Schedule
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             </div>
//           </div>

//           {/* Footer Note */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               Schedule will be reflected in the timetable immediately. Teachers can view their schedule in the portal.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import Form from "@/components/form/Form";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";

export default function TeacherAssignmentForm() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    classId: "",
    subject: "",
    academicYear: "2025-26",
    isClassTeacher: false,
  });

  useEffect(() => {
    Promise.all([
      apiConnector("GET", "/teachers"),
      apiConnector("GET", "/classes"),
    ]).then(([t, c]) => {
      setTeachers(t.data);
      setClasses(c.data);
    });
  }, []);

  const submit = async () => {
    await apiConnector("POST", "/teacher-assignment", {
      ...form,
      teacherId: Number(form.teacherId),
      classId: Number(form.classId),
    });
    toast.success("Teacher Assignment Saved ✅");
  };

  return (
    <Form onSubmit={submit} className="space-y-6 max-w-xl">
      <Select
        value={form.teacherId}
        onChange={(v) => setForm({ ...form, teacherId: v })}
        options={teachers.map(t => ({ label: t.user.name, value: t.id }))}
      />

      <Select
        value={form.classId}
        onChange={(v) => setForm({ ...form, classId: v })}
        options={classes.map(c => ({ label: c.name, value: c.id }))}
      />

      <Input
        placeholder="Subject Name"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isClassTeacher}
          onChange={(e) =>
            setForm({ ...form, isClassTeacher: e.target.checked })
          }
        />
        Class Teacher
      </label>

      <button className="btn-primary">Save Assignment</button>
    </Form>
  );
}
