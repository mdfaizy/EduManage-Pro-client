// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// import { createUserApi } from "@/services/teacherService";
// import { apiConnector } from "@/services/apiConnecter";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";
// import Select from "@/components/form/Select";

// export default function CreateUser() {
//   const router = useRouter();

//   const [roles, setRoles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     roleId: "",
//   });

//   // 🔹 Fetch roles
//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await apiConnector(
//           "GET",
//           "http://localhost:8000/api/roles"
//         );
//         setRoles(res.data.roles);
//       } catch (error) {
//         toast.error("Failed to load roles");
//       }
//     };

//     fetchRoles();
//   }, []);

//   // 🔹 Convert roles for Select component
//   const roleOptions = roles.map((r) => ({
//     value: String(r.id),
//     label: r.name,
//   }));

//   // 🔹 Input change handler
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // 🔹 Submit handler
//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     if (!form.roleId) {
//       toast.error("Please select a role");
//       return;
//     }

//     try {
//       setLoading(true);

//       await createUserApi({
//         ...form,
//         roleId: Number(form.roleId),
//       });

//       toast.success("User Created Successfully 🎉");
//       router.push("/admin/teachers");
//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message || "Failed to create user"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 gap-6 p-6">
//       {/* LEFT INFO PANEL */}
//       <div className="col-span-12 lg:col-span-5 bg-indigo-600 text-white rounded-2xl p-10 shadow-xl hidden lg:flex flex-col justify-center">
//         <h2 className="text-3xl font-bold mb-4">User Management</h2>
//         <p className="opacity-90 mb-6">
//           Add staff members and control their system access using roles.
//         </p>

//         <ul className="space-y-3 text-sm">
//           <li>✔ Assign roles to control permissions</li>
//           <li>✔ Secure school system access</li>
//           <li>✔ Manage teachers, staff, admins</li>
//           <li>✔ Multi-role system supported</li>
//         </ul>
//       </div>

//       {/* RIGHT FORM PANEL */}
//       <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
//         <div className="bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] rounded-2xl p-10 w-full max-w-lg border">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold">Create New User</h2>
//             <p className="text-gray-500 text-sm">
//               Add a new user to your school
//             </p>
//           </div>

//           <Form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 name="name"
//                 id="name"
//                 placeholder="Md Faizy"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="user@mail.com"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="••••••••"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label htmlFor="roleId">Assign Role</Label>
//               <Select
//                 options={roleOptions}
//                 placeholder="Select Role"
//                 defaultValue={form.roleId}
//                 onChange={(value) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     roleId: value,
//                   }))
//                 }
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold
//               hover:bg-indigo-700 hover:scale-[1.02] transition-all duration-200
//               disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating..." : "Create User"}
//             </button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// import { apiConnector } from "@/services/apiConnecter";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";
// import Select from "@/components/form/Select";

// export default function CreateUser() {
//   const router = useRouter();

//   const [roles, setRoles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [rolesLoading, setRolesLoading] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     roleId: "",
//   });

//   // 🔹 Fetch roles
//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await apiConnector("GET", "/roles");
//         setRoles(res.data.roles);
//       } catch {
//         toast.error("Failed to load roles");
//       } finally {
//         setRolesLoading(false);
//       }
//     };

//     fetchRoles();
//   }, []);

//   const roleOptions = roles.map((r) => ({
//     value: String(r.id),
//     label: r.name,
//   }));

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     if (!form.name.trim()) return toast.error("Name required");
//     if (!form.email.includes("@")) return toast.error("Valid email required");
//     if (!form.roleId) return toast.error("Select role");

//     try {
//       setLoading(true);

//       await apiConnector("POST", "/users/users", {
//         name: form.name,
//         email: form.email,
//         roleId: Number(form.roleId),
//       });

//       toast.success("Invitation email sent 📩");

//       router.push("/admin/teachers"); // or users list
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to invite user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 gap-6 p-6">
//       <div className="col-span-12 lg:col-span-5 bg-indigo-600 text-white rounded-2xl p-10 hidden lg:flex flex-col justify-center">
//         <h2 className="text-3xl font-bold mb-4">Invite User</h2>
//         <p className="opacity-90 mb-6">
//           The user will receive an email to set their password and activate their account.
//         </p>
//       </div>

//       <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
//         <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             Invite New User
//           </h2>

//           <Form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 name="name"
//                 id="name"
//                 placeholder="Md Faizy"
//                 onChange={handleChange}
//                 value={form.name}
//               />
//             </div>

//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="user@mail.com"
//                 onChange={handleChange}
//                 value={form.email}
//               />
//             </div>

//             <div>
//               <Label htmlFor="roleId">Assign Role</Label>
//               <Select
//                 options={roleOptions}
//                 placeholder={rolesLoading ? "Loading..." : "Select Role"}
//                 value={form.roleId}
//                 onChange={(value) =>
//                   setForm((prev) => ({ ...prev, roleId: value }))
//                 }
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold
//               hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               {loading ? "Sending Invite..." : "Send Invitation"}
//             </button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { apiConnector } from "@/services/apiConnecter";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
import Select from "@/components/form/Select";

export default function CreateUser() {
  const router = useRouter();

  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    roleId: "",
    schoolName: "", // ✅ new field
  });

  // 🔹 Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiConnector("GET", "/roles");
        setRoles(res.data.roles);
      } catch {
        toast.error("Failed to load roles");
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

 
  useEffect(() => {
  const init = async () => {
    try {
      const me = await apiConnector("GET", "/auth/me");
console.log(me);
      setForm((prev) => ({
        ...prev,
        schoolName: me?.data?.data?.schoolName || ""
      }));

    } catch {
      toast.error("Failed to load school info");
    }
  };

  init();
}, []);


  const roleOptions = roles.map((r) => ({
    value: String(r.id),
    label: r.name,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!form.name.trim()) return toast.error("Name required");
    if (!form.email.includes("@")) return toast.error("Valid email required");
    if (!form.roleId) return toast.error("Select role");

    try {
      setLoading(true);

      await apiConnector("POST", "/users/users", {
        name: form.name,
        email: form.email,
        roleId: Number(form.roleId),
      });

      toast.success("Invitation email sent 📩");
      router.push("/admin/teachers");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
  //     <div className="w-full max-w-5xl grid grid-cols-12 shadow-2xl rounded-3xl overflow-hidden bg-white">

  //       {/* Left Info Panel */}
  //       <div className="col-span-12 lg:col-span-5 bg-indigo-600 text-white p-10 hidden lg:flex flex-col justify-center">
  //         <h2 className="text-3xl font-bold mb-4">Invite User</h2>
  //         <p className="opacity-90 leading-relaxed">
  //           Add teachers or staff to your school. They’ll receive an email to
  //           activate their account and set their password securely.
  //         </p>
  //       </div>

  //       {/* Form Panel */}
  //       <div className="col-span-12 lg:col-span-7 p-10">
  //         <h2 className="text-2xl font-bold mb-8 text-gray-800">
  //           Invite New User
  //         </h2>

  //         <Form onSubmit={handleSubmit} className="space-y-6">

  //           {/* School Name (Auto + Disabled) */}
  //           <div>
  //             <Label htmlFor="schoolName">School</Label>
  //             <Input
  //               name="schoolName"
  //               id="schoolName"
  //               value={form.schoolName}
  //               disabled
  //               className="bg-gray-100 cursor-not-allowed"
  //             />
  //           </div>

  //           <div>
  //             <Label htmlFor="name">Full Name</Label>
  //             <Input
  //               name="name"
  //               id="name"
  //               placeholder="Enter full name"
  //               onChange={handleChange}
  //               value={form.name}
  //             />
  //           </div>

  //           <div>
  //             <Label htmlFor="email">Email Address</Label>
  //             <Input
  //               type="email"
  //               name="email"
  //               id="email"
  //               placeholder="user@mail.com"
  //               onChange={handleChange}
  //               value={form.email}
  //             />
  //           </div>

  //           <div>
  //             <Label htmlFor="roleId">Assign Role</Label>
  //             <Select
  //               options={roleOptions}
  //               placeholder={rolesLoading ? "Loading roles..." : "Select Role"}
  //               value={form.roleId}
  //               onChange={(value) =>
  //                 setForm((prev) => ({ ...prev, roleId: value }))
  //               }
  //             />
  //           </div>

  //           <button
  //             type="submit"
  //             disabled={loading}
  //             className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
  //           >
  //             {loading && <Loader2 className="animate-spin w-5 h-5" />}
  //             {loading ? "Sending Invite..." : "Send Invitation"}
  //           </button>
  //         </Form>
  //       </div>
  //     </div>
  //   </div>
  // );

return (
  <div className="min-h-screen bg-slate-50 flex justify-center p-8">
    <div className="w-full max-w-3xl">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Add New User</h1>
        <p className="text-slate-500 mt-1">
          Add teachers or staff to your school system
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <Form onSubmit={handleSubmit} className="space-y-6">

          {/* School (readonly badge style) */}
          <div>
            <Label htmlFor="schoolName">School</Label>
            <div className="mt-1 flex items-center bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 font-medium">
              {form.schoolName || "Loading..."}
            </div>
          </div>

          {/* Name + Email Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Enter full name"
                onChange={handleChange}
                value={form.name}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="user@mail.com"
                onChange={handleChange}
                value={form.email}
                className="mt-1"
              />
            </div>

          </div>

          {/* Role */}
          <div>
            <Label htmlFor="roleId">Assign Role</Label>
            <Select
              options={roleOptions}
              placeholder={rolesLoading ? "Loading roles..." : "Select Role"}
              value={form.roleId}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, roleId: value }))
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            {loading ? "Sumbit..." : "Sumbit"}
          </button>

        </Form>
      </div>
    </div>
  </div>
);


}
