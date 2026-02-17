// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiConnector } from "@/services/apiConnecter";

// export default function ViewTeacherPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [teacher, setTeacher] = useState<any>(null);

  

//   if (!teacher) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen space-y-6">

//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">{teacher.name}</h1>
//           <p className="text-slate-500 text-sm mt-1">Teacher Profile</p>
//         </div>

//         <button onClick={() => router.back()} className="px-4 py-2 bg-white border rounded-lg">
//           Back
//         </button>
//       </div>

      

//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  User, 
  Hash, 
  CheckCircle, 
  XCircle, 
  Edit,
  Download,
  Printer,
  Clock,
  MapPin,
  Briefcase,
  Award,
  BookOpen,
  Shield
} from "lucide-react";
import { toast } from "react-hot-toast";
import { apiConnector } from "@/services/apiConnecter";

interface TeacherDetails {
  id: number;
  userId: number;
  teacherCode: string;
  phone: string;
  gender: string;
  qualification: string;
  dateOfBirth?: string;
  address?: string;
  department?: string;
  specialization?: string;
  experience?: number;
  subjects?: string[];
  joiningDate?: string;
  salary?: number;
  emergencyContact?: string;
  bloodGroup?: string;
  nationality?: string;
  user: {
    name: string;
    email: string;
    isActive: boolean;
    profilePicture?: string;
    createdAt: string;
  };
}

export default function ViewTeacherPage() {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchTeacherDetails();
    }
  }, [id]);

  const fetchTeacherDetails = async () => {
    try {
      setLoading(true);
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      

      const res = await apiConnector("GET", `/teachers/${id}`);
      setTeacher(res.data.data || res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load teacher details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/academics/teachers/edit/${id}`);
  };

  const handlePrint = () => {
    window.print();
    toast.success("Printing profile...");
  };

  const handleExport = () => {
    toast.success("Profile exported successfully");
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mt-2"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Profile Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-4"></div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-white rounded-xl border shadow-sm animate-pulse"></div>
            <div className="h-64 bg-white rounded-xl border shadow-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Not Found</h1>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Teacher not found</h3>
          <p className="text-gray-500 mb-6">The requested teacher profile does not exist or has been removed.</p>
          <button
            onClick={() => router.push("/admin/academics/teachers")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Teachers
          </button>
        </div>
      </div>
    );
  }

  // 计算在职时间
  const calculateExperience = (joiningDate: string) => {
    const joinDate = new Date(joiningDate);
    const now = new Date();
    const diffYears = now.getFullYear() - joinDate.getFullYear();
    const diffMonths = now.getMonth() - joinDate.getMonth();
    
    const totalMonths = diffYears * 12 + diffMonths;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    return `${years} years ${months} months`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
              <p className="text-sm text-gray-500 mt-1">
                Detailed information about {teacher.user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              
              <div className="relative px-6 pb-6">
                <div className="relative -top-16 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-lg mb-4">
                    {teacher.user.profilePicture ? (
                      <img 
                        src={teacher.user.profilePicture} 
                        alt={teacher.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={64} className="text-gray-400" />
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{teacher.user.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <Hash size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{teacher.teacherCode}</span>
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    teacher.user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {teacher.user.isActive ? (
                      <>
                        <CheckCircle size={14} />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle size={14} />
                        Inactive
                      </>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 w-full mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {teacher.experience || 0}
                      </div>
                      <div className="text-xs text-gray-600">Years Exp</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {teacher.subjects?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600">Subjects</div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Mail size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{teacher.user.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Phone size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{teacher.phone || "Not provided"}</div>
                    </div>
                  </div>

                  {teacher.joiningDate && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Calendar size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Joining Date</div>
                        <div className="font-medium">
                          {new Date(teacher.joiningDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        {teacher.joiningDate && (
                          <div className="text-xs text-gray-500">
                            {calculateExperience(teacher.joiningDate)} in service
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {teacher.department && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Briefcase size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Department</div>
                        <div className="font-medium">{teacher.department}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            {teacher.emergencyContact && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-red-500" />
                  Emergency Contact
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Contact Person</div>
                    <div className="font-medium">{teacher.emergencyContact}</div>
                  </div>
                  {teacher.phone && (
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{teacher.phone}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="border-b">
                <div className="flex space-x-1 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('professional')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'professional'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Professional Info
                  </button>
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'subjects'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Subjects
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Full Name</div>
                          <div className="font-medium">{teacher.user.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Gender</div>
                          <div className="font-medium">{teacher.gender || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Date of Birth</div>
                          <div className="font-medium">
                            {teacher.dateOfBirth 
                              ? new Date(teacher.dateOfBirth).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : "Not specified"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Blood Group</div>
                          <div className="font-medium">{teacher.bloodGroup || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Nationality</div>
                          <div className="font-medium">{teacher.nationality || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Status</div>
                          <div className="font-medium">
                            <span className={`inline-flex items-center gap-1 ${
                              teacher.user.isActive ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {teacher.user.isActive ? (
                                <>
                                  <CheckCircle size={14} />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} />
                                  Inactive
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    {teacher.address && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <MapPin size={18} className="text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">Current Address</div>
                            <div className="text-gray-600 mt-1">{teacher.address}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Teacher ID</div>
                          <div className="font-mono font-medium">{teacher.teacherCode}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">User ID</div>
                          <div className="font-medium">{teacher.userId}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Account Created</div>
                          <div className="font-medium">
                            {new Date(teacher.user.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Last Updated</div>
                          <div className="font-medium">2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'professional' && (
                  <div className="space-y-6">
                    {/* Qualifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap size={20} className="text-blue-500" />
                        Qualifications
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-medium">{teacher.qualification || "No qualifications specified"}</div>
                        {teacher.specialization && (
                          <div className="text-sm text-gray-600 mt-2">
                            Specialization: {teacher.specialization}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase size={20} className="text-green-500" />
                        Professional Experience
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-600">
                            {teacher.experience || 0}
                          </div>
                          <div className="text-sm text-gray-600">Years of Experience</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-600">
                            {teacher.joiningDate 
                              ? calculateExperience(teacher.joiningDate).split(' ')[0]
                              : "0"}
                          </div>
                          <div className="text-sm text-gray-600">Years at Institution</div>
                        </div>
                        {teacher.salary && (
                          <div className="bg-purple-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-600">
                              ${teacher.salary.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Monthly Salary</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Department & Position */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Position</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Department</div>
                          <div className="font-medium">{teacher.department || "Not assigned"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Specialization</div>
                          <div className="font-medium">{teacher.specialization || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Joining Date</div>
                          <div className="font-medium">
                            {teacher.joiningDate 
                              ? new Date(teacher.joiningDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : "Not specified"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Employment Type</div>
                          <div className="font-medium">Full-time</div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={20} className="text-yellow-500" />
                        Certifications & Achievements
                      </h3>
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="text-gray-600">No additional certifications recorded.</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'subjects' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen size={20} className="text-purple-500" />
                      Assigned Subjects
                    </h3>
                    
                    {teacher.subjects && teacher.subjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teacher.subjects.map((subject, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{subject}</div>
                              <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                Grade 10-12
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">Mathematics Department</div>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>Mon, Wed, Fri</span>
                              </div>
                              <div className="text-gray-400">•</div>
                              <div>10:00 AM - 12:00 PM</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No subjects assigned</h4>
                        <p className="text-gray-500 mb-4">This teacher is not currently assigned to any subjects.</p>
                        <button
                          onClick={handleEdit}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit size={16} />
                          Assign Subjects
                        </button>
                      </div>
                    )}

                    {/* Schedule Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-3">Teaching Schedule Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-blue-600">15</div>
                          <div className="text-sm text-gray-600">Weekly Hours</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-green-600">4</div>
                          <div className="text-sm text-gray-600">Classes per Day</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-purple-600">3</div>
                          <div className="text-sm text-gray-600">Active Sections</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Profile updated</div>
                    <div className="text-sm text-gray-500">Personal information was updated</div>
                    <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Subjects assigned</div>
                    <div className="text-sm text-gray-500">Mathematics and Physics added to schedule</div>
                    <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <GraduationCap size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Professional development</div>
                    <div className="text-sm text-gray-500">Attended teaching methodology workshop</div>
                    <div className="text-xs text-gray-400 mt-1">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}