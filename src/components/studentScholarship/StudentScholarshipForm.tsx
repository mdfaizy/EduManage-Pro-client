// // components/studentScholarship/StudentScholarshipForm.tsx

// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getStudentsAPI,
// } from "@/services/studentService";

// import {
//   getScholarships,
// } from "@/services/scholarship";

// import {
//   createStudentScholarship,
// } from "@/services/studentScholarship";

// export default function StudentScholarshipForm() {

//   const [students,
//     setStudents] =
//     useState<any[]>([]);

//   const [scholarships,
//     setScholarships] =
//     useState<any[]>([]);

//   const [formData,
//     setFormData] =
//     useState({

//       studentId: "",

//       scholarshipId: "",
//     });

//   const fetchData =
//     async () => {

//       try {

//         const [
//           studentRes,
//           scholarshipRes,
//         ] = await Promise.all([

//           getStudentsAPI(),

//           getScholarships(),
//         ]);

//         setStudents(
//           studentRes.data.data || []
//         );

//         setScholarships(
//           scholarshipRes.data.data || []
//         );

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   useEffect(() => {

//   const loadData =
//     async () => {

//       await fetchData();
//     };

//   loadData();

// }, []);

//   const handleSubmit =
//     async () => {

//       try {

//         await createStudentScholarship({

//           studentId:
//             Number(
//               formData.studentId
//             ),

//           scholarshipId:
//             Number(
//               formData.scholarshipId
//             ),
//         });

//       } catch (e) {

//         console.log(e);
//       }
//     };

//   return (

//     <div className="bg-white border rounded-xl p-5">

//       <h2 className="text-lg font-bold mb-5">

//         Assign Scholarship

//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         <select
//           value={formData.studentId}
//           onChange={(e) =>
//             setFormData({

//               ...formData,

//               studentId:
//                 e.target.value,
//             })
//           }
//           className="h-11 border rounded-lg px-3"
//         >

//           <option value="">
//             Select Student
//           </option>

//           {
//             students.map(
//               (item) => (

//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >

//                   {item.name}

//                 </option>
//               )
//             )
//           }

//         </select>

//         <select
//           value={formData.scholarshipId}
//           onChange={(e) =>
//             setFormData({

//               ...formData,

//               scholarshipId:
//                 e.target.value,
//             })
//           }
//           className="h-11 border rounded-lg px-3"
//         >

//           <option value="">
//             Select Scholarship
//           </option>

//           {
//             scholarships.map(
//               (item) => (

//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >

//                   {item.name}

//                 </option>
//               )
//             )
//           }

//         </select>

//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-5 h-11 px-5 bg-blue-600 text-white rounded-lg"
//       >

//         Assign Scholarship

//       </button>

//     </div>
//   );
// }


// components/studentScholarship/StudentScholarshipForm.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getStudentsAPI,
} from "@/services/studentService";

import {
  getScholarships,
} from "@/services/scholarship";

import {
  createStudentScholarship,
} from "@/services/studentScholarship";

import {
  UserPlus,
  GraduationCap,
  Award,
  Loader2,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function StudentScholarshipForm({ onSuccess }: { onSuccess?: () => void }) {
  const [students, setStudents] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    scholarshipId: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentRes, scholarshipRes] = await Promise.all([
        getStudentsAPI(),
        getScholarships(),
      ]);
      setStudents(studentRes.data?.data || []);
      setScholarships(scholarshipRes.data?.data || []);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.studentId) {
      toast.error("👨‍🎓 Please select a student");
      return;
    }
    if (!formData.scholarshipId) {
      toast.error("🏆 Please select a scholarship");
      return;
    }

    try {
      setSubmitting(true);
      await createStudentScholarship({
        studentId: Number(formData.studentId),
        scholarshipId: Number(formData.scholarshipId),
      });
      toast.success("🎉 Scholarship assigned successfully!");
      setFormData({ studentId: "", scholarshipId: "" });
      onSuccess?.();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to assign scholarship");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedScholarship = scholarships.find((s) => s.id === Number(formData.scholarshipId));
  const selectedStudent = students.find((s) => s.id === Number(formData.studentId));

  // Statistics
  const activeScholarshipsCount = scholarships.filter((s) => s.isActive !== false).length;
  const totalStudents = students.length;

  return (
    <div className="sticky top-6 space-y-5">
      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">
              <UserPlus size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Assign Scholarship</h2>
              <p className="text-xs text-slate-400">Grant benefits to students</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={28} className="animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Student Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Student <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all bg-slate-50/30 appearance-none cursor-pointer"
                  >
                    <option value="">Choose a student...</option>
                    {students.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} {item.email ? `(${item.email.split("@")[0]})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedStudent && (
                  <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                    <CheckCircle size={10} />
                    {selectedStudent.name} selected
                  </p>
                )}
              </div>

              {/* Scholarship Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Scholarship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Award size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={formData.scholarshipId}
                    onChange={(e) =>
                      setFormData({ ...formData, scholarshipId: e.target.value })
                    }
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all bg-slate-50/30 appearance-none cursor-pointer"
                  >
                    <option value="">Choose a scholarship...</option>
                    {scholarships.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.type === "FIXED" ? `₹${item.amount}` : `${item.amount}%`})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scholarship Preview */}
              {selectedScholarship && (
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                      <Award size="16" className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-800">{selectedScholarship.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {selectedScholarship.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`
                          text-[10px] font-medium px-2 py-0.5 rounded-full
                          ${selectedScholarship.type === "FIXED" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}
                        `}>
                          {selectedScholarship.type === "FIXED" ? "Fixed" : "Percentage"}
                        </span>
                        <span className="text-xs font-bold text-blue-700">
                          {selectedScholarship.type === "FIXED"
                            ? `₹${selectedScholarship.amount?.toLocaleString()}`
                            : `${selectedScholarship.amount}% Discount`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !formData.studentId || !formData.scholarshipId}
                className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {submitting ? (
                  <>
                    <Loader2 size="16" className="animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <UserPlus size="16" />
                    Assign Scholarship
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}