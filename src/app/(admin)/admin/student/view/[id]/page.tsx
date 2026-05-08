  // "use client";

  // import { useEffect, useState } from "react";
  // import { useParams, useRouter } from "next/navigation";

  // export default function ViewStudentPage() {
  //   const params = useParams();
  //   const router = useRouter();
  //   const id = Array.isArray(params.id) ? params.id[0] : params.id;

  //   const [student, setStudent] = useState<any>(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchStudent = async () => {
  //       try {
  //         const res = await fetch(
  //           `http://localhost:8000/api/students/${id}`,
  //           { credentials: "include" }
  //         );
  //         const data = await res.json();
  //         if (data.success) setStudent(data.data);
  //       } catch (err) {
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (id) fetchStudent();
  //   }, [id]);

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
  //         Loading...
  //       </div>
  //     );
  //   }

  //   if (!student) {
  //     return (
  //       <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
  //         Student not found
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-gray-950 p-6 md:p-10">
  //       <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
  //         <h1 className="text-xl font-semibold text-gray-100 mb-6">
  //           Student Details
  //         </h1>

  //         <div className="space-y-3 text-sm text-gray-300">
  //           <p><strong>Name:</strong> {student.name}</p>
  //           <p><strong>Admission No:</strong> {student.admissionNo || "—"}</p>
  //           <p><strong>Gender:</strong> {student.gender || "—"}</p>
  //           <p><strong>DOB:</strong> {student.dob?.substring(0, 10) || "—"}</p>
  //           <p><strong>Address:</strong> {student.address || "—"}</p>
  //           <p>
  //             <strong>Status:</strong>{" "}
  //             {student.isActive ? "Active" : "Inactive"}
  //           </p>
  //         </div>

  //         <button
  //           onClick={() => router.back()}
  //           className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium"
  //         >
  //           Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }   

  "use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type TabType = "profile" | "admission" | "attendance" | "fees" | "result";

export default function ViewStudentPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>("profile");

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/students/${id}`,
          { credentials: "include" }
        );

        const data = await res.json();
        if (data.success) setStudent(data.data);
        else toast.error(data.message);
      } catch {
        toast.error("Failed to load student");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-950 flex items-center justify-center dark:text-gray-400">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen dark:bg-gray-950 flex items-center justify-center text-red-400">
        Student not found
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen dark:bg-gray-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ================= HEADER ================= */}
        <div className="dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-100">
              {student.name}
            </h1>
            <p className="text-sm text-gray-400">
              Student Code: {student.studentCode}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/students/edit/${id}`)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg dark:dark:bg-gray-700 hover:bg-gray-600 text-white text-sm"
            >
              Back
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="border-b border-gray-800 flex flex-wrap">
            {[
              { key: "profile", label: "Profile" },
              { key: "admission", label: "Admission" },
              { key: "attendance", label: "Attendance" },
              { key: "fees", label: "Fees" },
              { key: "result", label: "Result" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as TabType)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                  tab === t.key
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ================= TAB CONTENT ================= */}
          <div className="p-6">
            {/* ================= PROFILE ================= */}
            {tab === "profile" && (
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <Info label="Name" value={student.name} />
                <Info label="Gender" value={student.gender} />
                <Info
                  label="DOB"
                  value={student.dob?.substring(0, 10)}
                />
                <Info label="Address" value={student.address} />
                <Info
                  label="Status"
                  value={student.isActive ? "Active" : "Inactive"}
                />
              </div>
            )}

            {/* ================= ADMISSION ================= */}
            {tab === "admission" && (
              <EmptyBlock title="Admission Info coming soon" />
            )}

            {/* ================= ATTENDANCE ================= */}
            {tab === "attendance" && (
              <EmptyBlock title="Attendance module coming soon" />
            )}

            {/* ================= FEES ================= */}
            {tab === "fees" && (
              <EmptyBlock title="Fees module coming soon" />
            )}

            {/* ================= RESULT ================= */}
            {tab === "result" && (
              <EmptyBlock title="Result module coming soon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Info({ label, value }: any) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-gray-100 font-medium">{value || "—"}</p>
    </div>
  );
}

function EmptyBlock({ title }: { title: string }) {
  return (
    <div className="text-center py-16 text-gray-500 text-sm">
      {title}
    </div>
  );
}