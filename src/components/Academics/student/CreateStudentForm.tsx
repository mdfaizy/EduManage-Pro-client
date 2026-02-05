// // "use client";

// // import { useEffect, useState } from "react";
// // import Label from "@/components/form/Label";
// // import Input from "@/components/form/input/InputField";
// // import { apiConnector } from "@/services/apiConnecter";
// // import { toast } from "react-hot-toast";
// // import {
// //   Loader2,
// //   User,
// //   Phone,
// //   Home,
// //   School,
// //   Sparkles,
// //   BookOpen,
// //   Layers,
// // } from "lucide-react";

// // interface ClassType {
// //   id: number;
// //   name: string;
// // }

// // interface SectionType {
// //   id: number;
// //   name: string;
// // }

// // export default function CreateStudentForm() {
// //   const [bootLoading, setBootLoading] = useState(true);
// //   const [loading, setLoading] = useState(false);

// //   const [classes, setClasses] = useState<ClassType[]>([]);
// //   const [sections, setSections] = useState<SectionType[]>([]);

// //   const [formData, setFormData] = useState({
// //     schoolId: "",
// //     schoolName: "",
// //     name: "",
// //     gender: "",
// //     dob: "",
// //     classId: "",
// //     sectionId: "",
// //     rollNumber: "",
// //     fatherName: "",
// //     motherName: "",
// //     phone: "",
// //     address: "",
// //   });

// //   useEffect(() => {
// //     const fetchAdminSchool = async () => {
// //       try {
// //         const res = await apiConnector("GET", "/auth/me");
// //         const { schoolId, schoolName } = res?.data?.data || {};
// //         setFormData((p) => ({ ...p, schoolId: String(schoolId), schoolName }));
// //       } catch {
// //         toast.error("School info error");
// //       } finally {
// //         setBootLoading(false);
// //       }
// //     };
// //     fetchAdminSchool();
// //   }, []);

// //   useEffect(() => {
// //     if (!formData.schoolId) return;
// //     apiConnector("GET", `/classes?schoolId=${formData.schoolId}`).then((res) =>
// //       setClasses(res.data)
// //     );
// //   }, [formData.schoolId]);

// //   useEffect(() => {
// //     if (!formData.classId) return;
// //     apiConnector("GET", `/sections?classId=${formData.classId}`).then((res) =>
// //       setSections(res.data.data)
// //     );
// //   }, [formData.classId]);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!formData.name || !formData.classId || !formData.sectionId)
// //       return toast.error("Fill required fields");

// //     try {
// //       setLoading(true);
// //       await apiConnector("POST", "/students", formData);
// //       toast.success("Student admitted 🎉");
// //     } catch {
// //       toast.error("Admission failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (bootLoading)
// //     return (
// //       <div className="flex justify-center py-24">
// //         <Loader2 className="animate-spin h-10 w-10 text-brand-500" />
// //       </div>
// //     );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff] flex justify-center items-center p-6">
// //       <div className="w-full max-w-3xl backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">

// //         {/* HEADER */}
// //         <div className="mb-8">
// //           <div className="flex items-center mb-2">
// //             <Sparkles className="text-brand-500 mr-2" />
// //             <h2 className="text-3xl font-bold text-gray-800">
// //               Student Admission
// //             </h2>
// //           </div>
// //           <p className="text-gray-500 text-sm">
// //             Register new student in school system
// //           </p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-8">

// //           {/* School */}
// //           <div>
// //             <Label>School</Label>
// //             <div className="relative mt-2">
// //               <School className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //               <Input disabled value={formData.schoolName} className="pl-9 bg-gray-100" />
// //             </div>
// //           </div>

// //           {/* Student Info */}
// //           <div>
// //             <Label>Student Name *</Label>
// //             <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
// //           </div>

// //           <div className="grid md:grid-cols-2 gap-6">
// //             <div>
// //               <Label>Gender *</Label>
// //               <select className="input" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
// //                 <option value="">Select</option>
// //                 <option>Male</option>
// //                 <option>Female</option>
// //               </select>
// //             </div>

// //             <div>
// //               <Label>Date of Birth *</Label>
// //               <Input type="date" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
// //             </div>
// //           </div>

// //           {/* Class & Section */}
// //           <div className="grid md:grid-cols-2 gap-6">
// //             <div>
// //               <Label>Select Class *</Label>
// //               <select className="input" onChange={(e) => setFormData({ ...formData, classId: e.target.value })}>
// //                 <option value="">Choose Class</option>
// //                 {classes.map((c) => (
// //                   <option key={c.id} value={c.id}>{c.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <Label>Select Section *</Label>
// //               <select className="input" onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}>
// //                 <option value="">Choose Section</option>
// //                 {sections.map((s) => (
// //                   <option key={s.id} value={s.id}>{s.name}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* Parent */}
// //           <div>
// //             <Label>Father Name *</Label>
// //             <Input onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} />
// //           </div>

// //           <div>
// //             <Label>Mobile *</Label>
// //             <Input onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
// //           </div>

// //           <div>
// //             <Label>Address *</Label>
// //             <Input onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
// //           </div>

// //           <button
// //             disabled={loading}
// //             className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold shadow-lg flex justify-center items-center"
// //           >
// //             {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Admission"}
// //           </button>
// //         </form>
// //       </div>

// //       <style jsx>{`
// //         .input {
// //           width: 100%;
// //           height: 48px;
// //           border: 1px solid #e5e7eb;
// //           border-radius: 12px;
// //           padding: 0 14px;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import {
//   Loader2,
//   User,
//   Phone,
//   Home,
//   School,
//   Sparkles,
//   BookOpen,
//   Layers,
//   Calendar,
// } from "lucide-react";

// interface ClassType { id: number; name: string; }
// interface SectionType { id: number; name: string; }

// export default function CreateStudentForm() {
//   const [bootLoading, setBootLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [sections, setSections] = useState<SectionType[]>([]);

//   const [formData, setFormData] = useState({
//     schoolId: "",
//     schoolName: "",
//     name: "",
//     gender: "",
//     dob: "",
//     classId: "",
//     sectionId: "",
//     rollNumber: "",
//     fatherName: "",
//     motherName: "",
//     phone: "",
//     address: "",
//   });

//   const update = (k: string, v: string) => setFormData(p => ({ ...p, [k]: v }));

//   useEffect(() => {
//     apiConnector("GET", "/auth/me").then(res => {
//       const { schoolId, schoolName } = res?.data?.data || {};
//       setFormData(p => ({ ...p, schoolId: String(schoolId), schoolName }));
//       setBootLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     if (!formData.schoolId) return;
//     apiConnector("GET", `/classes?schoolId=${formData.schoolId}`).then(res => setClasses(res.data));
//   }, [formData.schoolId]);

//   useEffect(() => {
//     if (!formData.classId) return;
//     apiConnector("GET", `/sections?classId=${formData.classId}`).then(res => setSections(res.data.data));
//   }, [formData.classId]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await apiConnector("POST", "/students", formData);
//       toast.success("Student admitted 🎉");
//     } catch {
//       toast.error("Admission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bootLoading)
//     return <div className="flex justify-center py-24"><Loader2 className="animate-spin h-10 w-10 text-brand-500" /></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] flex justify-center p-8">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 space-y-10">

//         {/* Header */}
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <Sparkles className="text-brand-500" />
//             <h2 className="text-3xl font-bold text-gray-800">Student Admission</h2>
//           </div>
//           <p className="text-gray-500 text-sm">Register new student into school system</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-10">

//           {/* SCHOOL */}
//           <section className="border rounded-2xl p-6">
//             <div className="flex items-center mb-4">
//               <School className="text-brand-500 mr-2" size={18}/>
//               <h3 className="font-semibold text-lg">School Information</h3>
//             </div>
//             <Label>School</Label>
//             <Input disabled value={formData.schoolName} className="bg-gray-100"/>
//           </section>

//           {/* STUDENT */}
//           <section className="border rounded-2xl p-6">
//             <div className="flex items-center mb-4">
//               <User className="text-blue-600 mr-2" size={18}/>
//               <h3 className="font-semibold text-lg">Student Details</h3>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <Label>Full Name *</Label>
//                 <Input onChange={(e)=>update("name",e.target.value)} />
//               </div>
//               <div>
//                 <Label>Roll Number</Label>
//                 <Input onChange={(e)=>update("rollNumber",e.target.value)} />
//               </div>
//               <div>
//                 <Label>Gender *</Label>
//                 <select className="input" onChange={(e)=>update("gender",e.target.value)}>
//                   <option value="">Select</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//               </div>
//               <div>
//                 <Label>Date of Birth *</Label>
//                 <Input type="date" onChange={(e)=>update("dob",e.target.value)} />
//               </div>
//             </div>
//           </section>

//           {/* ACADEMIC */}
//           <section className="border rounded-2xl p-6">
//             <div className="flex items-center mb-4">
//               <BookOpen className="text-purple-600 mr-2" size={18}/>
//               <h3 className="font-semibold text-lg">Academic Info</h3>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <Label>Class *</Label>
//                 <select className="input" onChange={(e)=>update("classId",e.target.value)}>
//                   <option value="">Choose Class</option>
//                   {classes.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <Label>Section *</Label>
//                 <select className="input" onChange={(e)=>update("sectionId",e.target.value)}>
//                   <option value="">Choose Section</option>
//                   {sections.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
//                 </select>
//               </div>
//             </div>
//           </section>

//           {/* PARENT */}
//           <section className="border rounded-2xl p-6">
//             <div className="flex items-center mb-4">
//               <Phone className="text-green-600 mr-2" size={18}/>
//               <h3 className="font-semibold text-lg">Parent Details</h3>
//             </div>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div><Label>Father Name *</Label><Input onChange={(e)=>update("fatherName",e.target.value)} /></div>
//               <div><Label>Mother Name</Label><Input onChange={(e)=>update("motherName",e.target.value)} /></div>
//               <div><Label>Mobile *</Label><Input onChange={(e)=>update("phone",e.target.value)} /></div>
//             </div>
//           </section>

//           {/* ADDRESS */}
//           <section className="border rounded-2xl p-6">
//             <div className="flex items-center mb-4">
//               <Home className="text-orange-600 mr-2" size={18}/>
//               <h3 className="font-semibold text-lg">Address</h3>
//             </div>
//             <Label>Full Address *</Label>
//             <Input onChange={(e)=>update("address",e.target.value)} />
//           </section>

//           <button disabled={loading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold shadow-lg flex justify-center items-center">
//             {loading ? <Loader2 className="animate-spin"/> : "Submit Admission"}
//           </button>

//         </form>
//       </div>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           height: 48px;
//           border: 1px solid #e5e7eb;
//           border-radius: 12px;
//           padding: 0 14px;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function StudentAdmissionForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    admissionNo: "",
    name: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    aadhaarNo: "",
    nationality: "",
    religion: "",

    classId: "",
    sectionId: "",
    academicYear: "",
    rollNumber: "",
    admissionDate: "",

    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    phone: "",
    alternatePhone: "",
    parentEmail: "",

    medicalConditions: "",
    allergies: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const update = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border p-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Admission</h1>
          <p className="text-slate-500 text-sm mt-1">
            Register a new student into the school system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* STUDENT IDENTITY */}
          <Section title="Student Identity">
            <Grid>
              <Field label="Admission No *">
                <Input onChange={(e)=>update("admissionNo",e.target.value)} />
              </Field>
              <Field label="Full Name *">
                <Input onChange={(e)=>update("name",e.target.value)} />
              </Field>
              <Field label="Gender *">
                <Select onChange={(e)=>update("gender",e.target.value)} options={["Male","Female"]}/>
              </Field>
              <Field label="Date of Birth *">
                <Input type="date" onChange={(e)=>update("dob",e.target.value)} />
              </Field>
              <Field label="Blood Group">
                <Input onChange={(e)=>update("bloodGroup",e.target.value)} />
              </Field>
              <Field label="Aadhaar No">
                <Input onChange={(e)=>update("aadhaarNo",e.target.value)} />
              </Field>
              <Field label="Nationality">
                <Input onChange={(e)=>update("nationality",e.target.value)} />
              </Field>
              <Field label="Religion">
                <Input onChange={(e)=>update("religion",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* ACADEMIC */}
          <Section title="Academic Details">
            <Grid>
              <Field label="Class *"><Input /></Field>
              <Field label="Section *"><Input /></Field>
              <Field label="Academic Year *"><Input placeholder="2025-26" /></Field>
              <Field label="Roll Number"><Input /></Field>
              <Field label="Admission Date *">
                <Input type="date" onChange={(e)=>update("admissionDate",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* PARENT DETAILS */}
          <Section title="Parent Information">
            <Grid>
              <Field label="Father Name *"><Input onChange={(e)=>update("fatherName",e.target.value)} /></Field>
              <Field label="Mother Name"><Input onChange={(e)=>update("motherName",e.target.value)} /></Field>
              <Field label="Father Occupation"><Input onChange={(e)=>update("fatherOccupation",e.target.value)} /></Field>
              <Field label="Mother Occupation"><Input onChange={(e)=>update("motherOccupation",e.target.value)} /></Field>
              <Field label="Mobile *"><Input onChange={(e)=>update("phone",e.target.value)} /></Field>
              <Field label="Alternate Phone"><Input onChange={(e)=>update("alternatePhone",e.target.value)} /></Field>
              <Field label="Parent Email"><Input type="email" onChange={(e)=>update("parentEmail",e.target.value)} /></Field>
            </Grid>
          </Section>

          {/* HEALTH */}
          <Section title="Health & Medical">
            <Grid>
              <Field label="Medical Conditions">
                <Input onChange={(e)=>update("medicalConditions",e.target.value)} />
              </Field>
              <Field label="Allergies">
                <Input onChange={(e)=>update("allergies",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* ADDRESS */}
          <Section title="Address">
            <Grid>
              <Field label="Address *"><Input onChange={(e)=>update("address",e.target.value)} /></Field>
              <Field label="City"><Input onChange={(e)=>update("city",e.target.value)} /></Field>
              <Field label="State"><Input onChange={(e)=>update("state",e.target.value)} /></Field>
              <Field label="Pincode"><Input onChange={(e)=>update("pincode",e.target.value)} /></Field>
            </Grid>
          </Section>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full h-14 bg-indigo-600 text-white rounded-xl font-semibold flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin"/> : "Submit Admission"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* REUSABLE UI COMPONENTS */

function Section({ title, children }: any) {
  return (
    <section className="border rounded-xl p-6 space-y-6">
      <h2 className="font-semibold text-lg text-slate-800">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: any) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

function Field({ label, children }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full h-11 px-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  );
}

function Select({ options, ...rest }: any) {
  return (
    <select {...rest} className="w-full h-11 px-3 border border-slate-200 rounded-lg">
      <option value="">Select</option>
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  );
}
