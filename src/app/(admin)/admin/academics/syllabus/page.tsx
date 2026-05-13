"use client";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnecter";
import { toast } from "react-hot-toast";
import {
  Loader2,
  BookOpen,
  FileText,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function SyllabusPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiConnector("GET", "/syllabus/all")
      .then((res) => setData(res.data.data || []))
      .catch(() => toast.error("Failed to load syllabus"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Syllabus Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage class-wise and subject-wise syllabus records
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-white">
              Syllabus Records
            </h2>
          </div>

          <Table className="w-full">

            <TableHeader>
              <TableRow>
                <TableCell isHeader>Class</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Chapters</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>

              {/* Loading */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading syllabus...
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty */}
              {!loading && data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    No syllabus created yet.
                  </TableCell>
                </TableRow>
              )}

              {/* Data */}
              {!loading &&
                data.map((s) => (
                  <TableRow
                    key={s.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen
                          size={16}
                          className="text-indigo-500"
                        />
                        <span className="font-medium text-slate-800 dark:text-white">
                          {s.class?.name || "-"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold text-slate-800 dark:text-white">
                      {s.subject?.name}
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                        {s.type}
                      </span>
                    </TableCell>

                    <TableCell>
                      {Array.isArray(s.chapters) ? (
                        <div className="space-y-3">
                          {s.chapters.map(
                            (ch: any, index: number) => (
                              <div
                                key={index}
                                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <FileText
                                    size={14}
                                    className="text-slate-500"
                                  />
                                  <span className="font-medium text-slate-800 dark:text-white">
                                    {ch.title}
                                  </span>
                                </div>

                                {ch.topics?.length > 0 && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400 ml-6">
                                    {ch.topics.join(", ")}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}