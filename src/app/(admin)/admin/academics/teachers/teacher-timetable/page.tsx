
import TeacherTimetableForm from "@/components/Academics/teachers/TeacherMyTimetablePage";

export default function TeacherTimetablePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Timetable</h1>
        <p className="text-gray-600">Manage weekly schedules for teachers</p>
      </div>
      <TeacherTimetableForm />
    </div>
  );
}