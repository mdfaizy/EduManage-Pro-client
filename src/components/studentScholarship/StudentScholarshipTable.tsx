"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getStudentScholarships,
  updateStudentScholarship,
  deleteStudentScholarship,
  toggleStudentScholarship,
} from "@/services/studentScholarship";

import {
  getStudentsAPI,
} from "@/services/studentService";

import {
  getScholarships,
} from "@/services/scholarship";

import {
  Search,
  Edit2,
  Trash2,
  User,
  Award,
  GraduationCap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Props {
  refreshKey?: number;
}

export default function StudentScholarshipTable({
  refreshKey,
}: Props) {

  const [data, setData] =
    useState<any[]>([]);

  const [students, setStudents] =
    useState<any[]>([]);

  const [scholarships, setScholarships] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteConfirmId,
    setDeleteConfirmId] =
    useState<number | null>(null);

  const [editFormData,
    setEditFormData] =
    useState({

      studentId: "",

      scholarshipId: "",
    });

  // =====================================
  // FETCH DATA
  // =====================================

  const fetchData =
    async () => {

      try {

        setLoading(true);

        const [
          scholarshipRes,
          studentRes,
          masterRes,
        ] = await Promise.all([

          getStudentScholarships(),

          getStudentsAPI(),

          getScholarships(),
        ]);

        setData(
          scholarshipRes.data?.data || []
        );

        setStudents(
          studentRes.data?.data || []
        );

        setScholarships(
          masterRes.data?.data || []
        );

      } catch (e: any) {

        toast.error(
          e.response?.data?.message ||
          "Failed to load data"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    const load =
      async () => {

        await fetchData();
      };

    load();

  }, [refreshKey]);

  // =====================================
  // TOGGLE
  // =====================================

  const handleToggleStatus =
    async (
      id: number,
      currentStatus: boolean
    ) => {

      try {

        await toggleStudentScholarship(
          id,
          !currentStatus
        );

        toast.success(

          currentStatus

            ? "Scholarship disabled"

            : "Scholarship enabled"
        );

        fetchData();

      } catch (e: any) {

        toast.error(
          e.response?.data?.message ||
          "Failed to update status"
        );
      }
    };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit =
    (item: any) => {

      setEditingId(item.id);

      setEditFormData({

        studentId:
          String(item.studentId),

        scholarshipId:
          String(item.scholarshipId),
      });
    };

  // =====================================
  // UPDATE
  // =====================================

  const handleUpdate =
    async () => {

      try {

        await updateStudentScholarship(

          editingId,

          {

            studentId:
              Number(
                editFormData.studentId
              ),

            scholarshipId:
              Number(
                editFormData.scholarshipId
              ),
          }
        );

        toast.success(
          "Scholarship updated"
        );

        setEditingId(null);

        fetchData();

      } catch (e: any) {

        toast.error(
          e.response?.data?.message ||
          "Failed to update"
        );
      }
    };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete =
    async (id: number) => {

      try {

        await deleteStudentScholarship(id);

        toast.success(
          "Scholarship removed"
        );

        setDeleteConfirmId(null);

        fetchData();

      } catch (e: any) {

        toast.error(
          e.response?.data?.message ||
          "Failed to delete"
        );
      }
    };

  // =====================================
  // FILTER
  // =====================================

  const filteredData =
    data.filter((item) => {

      const term =
        search.toLowerCase();

      return (

        item.student?.name
          ?.toLowerCase()
          .includes(term)

        ||

        item.scholarship?.name
          ?.toLowerCase()
          .includes(term)

        ||

        item.scholarship?.type
          ?.toLowerCase()
          .includes(term)
      );
    });

  return (

    <div className="space-y-5">

      {/* MAIN CARD */}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden">

        {/* HEADER */}

        <div className="px-6 py-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">

              <GraduationCap size={18} />

            </div>

            <div>

              <h2 className="text-md font-bold text-slate-800">

                Scholarship Assignments

              </h2>

              <p className="text-sm text-slate-500">

                Manage student scholarship allocations

              </p>

            </div>

          </div>

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-11 w-full lg:w-72 pl-10 pr-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />

          </div>

        </div>

        {/* LOADING */}

        {
          loading && (

            <div className="flex justify-center items-center py-20">

              <Loader2
                size={30}
                className="animate-spin text-blue-600"
              />

            </div>
          )
        }

        {/* EMPTY */}

        {
          !loading &&
          filteredData.length === 0 && (

            <div className="text-center py-20">

              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">

                <Award
                  size={24}
                  className="text-slate-400"
                />

              </div>

              <h3 className="text-lg font-semibold text-slate-700">

                No scholarships found

              </h3>

              <p className="text-sm text-slate-400 mt-1">

                Try another search

              </p>

            </div>
          )
        }

        {/* TABLE */}

        {
          !loading &&
          filteredData.length > 0 && (

            <div className="overflow-x-auto no-scrollbar">

              <table className="w-full ">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">

                      Student

                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">

                      Scholarship

                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">

                      Type

                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">

                      Amount

                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-slate-500">

                      Status

                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">

                      Actions

                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {
                    filteredData.map(
                      (item) => (

                        <tr
                          key={item.id}
                          className="hover:bg-slate-50 transition-all"
                        >

                          {/* STUDENT */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                                <User size={16} />

                              </div>

                              <div>

                                <p className="font-semibold text-slate-800">

                                  {
                                    item.student?.name
                                  }

                                </p>

                                <p className="text-xs text-slate-400">

                                  {
                                    item.student?.studentCode
                                  }

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* SCHOLARSHIP */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <Award
                                size={15}
                                className="text-amber-500"
                              />

                              <span className="font-medium text-slate-700">

                                {
                                  item.scholarship?.name
                                }

                              </span>

                            </div>

                          </td>

                          {/* TYPE */}

                          <td className="px-6 py-4">

                            <span
                              className={`

                                px-3 py-1 rounded-full text-xs font-semibold

                                ${
                                  item.scholarship?.type ===
                                  "FIXED"

                                    ? "bg-green-100 text-green-700"

                                    : "bg-purple-100 text-purple-700"
                                }

                              `}
                            >

                              {
                                item.scholarship?.type ===
                                "FIXED"

                                  ? "Fixed"

                                  : "Percentage"
                              }

                            </span>

                          </td>

                          {/* AMOUNT */}

                          <td className="px-6 py-4">

                            <span className="font-bold text-emerald-600">

                              {
                                item.scholarship?.type ===
                                "FIXED"

                                  ? `₹${item.scholarship?.amount}`

                                  : `${item.scholarship?.amount}%`
                              }

                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4 text-center">

                            <button
                              onClick={() =>
                                handleToggleStatus(
                                  item.id,
                                  item.isActive
                                )
                              }
                              className={`

                                px-3 py-1.5 rounded-xl text-xs font-semibold transition-all

                                ${
                                  item.isActive

                                    ? "bg-green-100 text-green-700 hover:bg-green-200"

                                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                                }

                              `}
                            >

                              {
                                item.isActive
                                  ? "Active"
                                  : "Inactive"
                              }

                            </button>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-4">

                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() =>
                                  handleEdit(item)
                                }
                                className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center"
                              >

                                <Edit2 size={14} />

                              </button>

                              <button
                                onClick={() =>
                                  setDeleteConfirmId(
                                    item.id
                                  )
                                }
                                className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center justify-center"
                              >

                                <Trash2 size={14} />

                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </div>

      {/* DELETE MODAL */}

      {
        deleteConfirmId && (

          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">

                  <AlertCircle size={22} />

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    Delete Scholarship

                  </h3>

                  <p className="text-sm text-slate-500">

                    This action cannot be undone

                  </p>

                </div>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setDeleteConfirmId(null)
                  }
                  className="h-11 px-4 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      deleteConfirmId
                    )
                  }
                  className="h-11 px-4 rounded-xl bg-red-600 text-white"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        )
      }

      {/* EDIT MODAL */}

      {
        editingId && (

          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">

              <h3 className="text-xl font-bold mb-5">

                Edit Scholarship

              </h3>

              <div className="space-y-4">

                <select
                  value={editFormData.studentId}
                  onChange={(e) =>
                    setEditFormData({

                      ...editFormData,

                      studentId:
                        e.target.value,
                    })
                  }
                  className="w-full h-11 rounded-xl border border-slate-200 px-3"
                >

                  {
                    students.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >

                          {item.name}

                        </option>
                      )
                    )
                  }

                </select>

                <select
                  value={editFormData.scholarshipId}
                  onChange={(e) =>
                    setEditFormData({

                      ...editFormData,

                      scholarshipId:
                        e.target.value,
                    })
                  }
                  className="w-full h-11 rounded-xl border border-slate-200 px-3"
                >

                  {
                    scholarships.map(
                      (item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >

                          {item.name}

                        </option>
                      )
                    )
                  }

                </select>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setEditingId(null)
                  }
                  className="h-11 px-4 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="h-11 px-4 rounded-xl bg-blue-600 text-white"
                >
                  Update
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}