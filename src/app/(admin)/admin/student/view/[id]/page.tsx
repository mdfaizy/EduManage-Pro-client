  "use client";

  import { useEffect, useState } from "react";
  import { useParams, useRouter } from "next/navigation";

  export default function ViewStudentPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStudent = async () => {
        try {
          const res = await fetch(
            `http://localhost:8000/api/students/${id}`,
            { credentials: "include" }
          );
          const data = await res.json();
          if (data.success) setStudent(data.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      if (id) fetchStudent();
    }, [id]);

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
          Loading...
        </div>
      );
    }

    if (!student) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
          Student not found
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-950 p-6 md:p-10">
        <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h1 className="text-xl font-semibold text-gray-100 mb-6">
            Student Details
          </h1>

          <div className="space-y-3 text-sm text-gray-300">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Admission No:</strong> {student.admissionNo || "—"}</p>
            <p><strong>Gender:</strong> {student.gender || "—"}</p>
            <p><strong>DOB:</strong> {student.dob?.substring(0, 10) || "—"}</p>
            <p><strong>Address:</strong> {student.address || "—"}</p>
            <p>
              <strong>Status:</strong>{" "}
              {student.isActive ? "Active" : "Inactive"}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium"
          >
            Back
          </button>
        </div>
      </div>
    );
  }   