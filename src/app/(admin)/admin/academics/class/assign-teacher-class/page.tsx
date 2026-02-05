import AssignPrivelege from "@/components/Academics/class/AssignTeacherFormClass";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
export default function RoleForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Assign Class" />
      <div className="space-y-6">
        <AssignPrivelege/>
      </div>

      
    </div>
  );
}
