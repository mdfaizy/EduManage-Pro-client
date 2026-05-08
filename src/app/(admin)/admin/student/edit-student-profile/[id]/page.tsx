// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";

// export default function EditStudentPage() {
//   const params = useParams();
//   const router = useRouter();
//  const id = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     address: "",
//     dob: "",
//   });

//   // ✅ fetch student
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:8000/api/students/${id}`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await res.json();

//         if (data.success) {
//           const s = data.data;
//           setForm({
//             name: s.name ?? "",
//             gender: s.gender ?? "",
//             address: s.address ?? "",
//             dob: s.dob ? s.dob.substring(0, 10) : "",
//           });
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (id) fetchStudent();
//   }, [id]);

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/students/${id}`,
//         {
//           method: "PATCH",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         alert("Student updated");
//         router.push("/students");
//       } else {
//         alert(data.message);
//       }
//     } catch {
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 p-6 md:p-10">
//       <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
//         <h1 className="text-xl font-semibold text-gray-100 mb-6">
//           Edit Student
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label>Name</Label>
//             <Input name="name" value={form.name} onChange={handleChange} />
//           </div>

//           <div>
//             <Label>Gender</Label>
//             <select
//               name="gender"
//               value={form.gender}
//               onChange={handleChange}
//               className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-200"
//             >
//               <option value="">Select gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>
//           </div>

//           <div>
//             <Label>Date of Birth</Label>
//             <Input
//               type="date"
//               name="dob"
//               value={form.dob}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <Label>Address</Label>
//             <Input
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Update Student"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { toast } from "react-hot-toast";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    address: "",
    dob: "",
    bloodGroup: "",
    phone: "",
  });

  const [studentCode, setStudentCode] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/students/${id}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (data.success) {
          const s = data.data;

          setStudentCode(s.studentCode);

          setForm({
            name: s.name ?? "",
            gender: s.gender ?? "",
            address: s.address ?? "",
            dob: s.dob ? s.dob.substring(0, 10) : "",
            bloodGroup: s.bloodGroup ?? "",
            phone: s.phone ?? "",
          });
        } else {
          toast.error(data.message);
        }
      } catch {
        toast.error("Failed to fetch student");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  /* ================= CHANGE ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/students/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Student updated successfully ✅");
        router.push("/students");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (fetching) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading student...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen dark:bg-gray-950 p-6 md:p-10">
      <div className="max-w-2xl mx-auto dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6">
        <h1 className="text-xl font-semibold dark:text-gray-100 mb-6">
          Edit Student Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student Code (readonly) */}
          <div>
            <Label>Student Code</Label>
            <Input value={studentCode} disabled />
          </div>

          {/* Name */}
          <div>
            <Label>Name *</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-200"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* Blood Group */}
          <div>
            <Label>Blood Group</Label>
            <Input
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              placeholder="e.g. O+"
            />
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Student"}
          </button>
        </form>
      </div>
    </div>
  );
}