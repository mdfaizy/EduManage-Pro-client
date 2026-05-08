// "use client";import { useEffect, useState, useCallback, useRef } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   setAdmissionLoading,
//   setAdmissionSuccess,
//   setAdmissionError,
// } from "@/redux/admissionSlice";
// import { createAdmissionAPI } from "@/services/admissionService";
// import { apiConnector } from "@/services/apiConnecter";
// import { toast } from "react-hot-toast";
// import { 
//   User, 
//   Calendar, 
//   MapPin, 
//   BookOpen, 
//   GraduationCap,
//   Upload,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   FileText,
//   Heart,
//   Edit,
//   Download,
//   Printer,
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   X
// } from "lucide-react";

// /* ================= TYPES ================= */

// interface FormState {
//   // Personal Information
//   studentName: string;
//   dateOfBirth: string;
//   gender: string;
//   bloodGroup: string;
//   nationality: string;
//   religion: string;
//   caste: string;
//   aadharNumber: string;

//   // Contact Information
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   phoneNumber: string;
//   alternatePhone: string;
//   email: string;

//   // Academic Information
//   classId: string;
//   className?: string;
//   sectionId: string;
//   sectionName?: string;
//   academicYearId: string;
//   academicYearName?: string;
//   previousSchool: string;
//   previousClass: string;
//   previousPercentage: string;

//   // Parent/Guardian Information
//   fatherName: string;
//   fatherOccupation: string;
//   fatherPhone: string;
//   fatherEmail: string;
//   motherName: string;
//   motherOccupation: string;
//   motherPhone: string;
//   motherEmail: string;
//   guardianName: string;
//   guardianRelation: string;
//   guardianPhone: string;

//   // Documents
//   hasBirthCertificate: boolean;
//   hasAadharCard: boolean;
//   hasTransferCertificate: boolean;
//   hasMarksheet: boolean;
//   hasPassportPhoto: boolean;

//   // Additional Information
//   transportRequired: boolean;
//   hostelRequired: boolean;
//   sportsQuota: boolean;
//   sportsDetails: string;
//   medicalConditions: string;
//   allergies: string;
// }

// interface Step {
//   id: number;
//   name: string;
//   icon: React.ElementType;
//   description: string;
// }

// interface UploadedFile {
//   file: File;
//   name: string;
//   size: string;
//   url?: string;
// }

// export default function CreateAdmissionPage() {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((s) => s.admission);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPreview, setShowPreview] = useState(false);
//   const [classes, setClasses] = useState<any[]>([]);
//   const [sections, setSections] = useState<any[]>([]);
//   const [years, setYears] = useState<any[]>([]);
//   const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: UploadedFile}>({});
//   const [editMode, setEditMode] = useState<{step: number, field?: string} | null>(null);

//   // Use refs to prevent infinite loops
//   const isInitialMount = useRef(true);
//   const prevClassId = useRef<string>("");
//   const prevSectionId = useRef<string>("");
//   const prevAcademicYearId = useRef<string>("");

//   const steps: Step[] = [
//     { id: 1, name: "Personal Info", icon: User, description: "Basic personal details" },
//     { id: 2, name: "Contact Details", icon: MapPin, description: "Address and contact information" },
//     { id: 3, name: "Academic Info", icon: BookOpen, description: "Class and academic history" },
//     { id: 4, name: "Parent Details", icon: GraduationCap, description: "Parent/guardian information" },
//     { id: 5, name: "Documents", icon: FileText, description: "Upload required documents" },
//     { id: 6, name: "Additional Info", icon: Heart, description: "Medical and facilities" },
//   ];

//   const [form, setForm] = useState<FormState>({
//     // Personal Information
//     studentName: "",
//     dateOfBirth: "",
//     gender: "",
//     bloodGroup: "",
//     nationality: "Indian",
//     religion: "",
//     caste: "",
//     aadharNumber: "",

//     // Contact Information
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phoneNumber: "",
//     alternatePhone: "",
//     email: "",

//     // Academic Information
//     classId: "",
//     sectionId: "",
//     academicYearId: "",
//     previousSchool: "",
//     previousClass: "",
//     previousPercentage: "",

//     // Parent/Guardian Information
//     fatherName: "",
//     fatherOccupation: "",
//     fatherPhone: "",
//     fatherEmail: "",
//     motherName: "",
//     motherOccupation: "",
//     motherPhone: "",
//     motherEmail: "",
//     guardianName: "",
//     guardianRelation: "",
//     guardianPhone: "",

//     // Documents
//     hasBirthCertificate: false,
//     hasAadharCard: false,
//     hasTransferCertificate: false,
//     hasMarksheet: false,
//     hasPassportPhoto: false,

//     // Additional Information
//     transportRequired: false,
//     hostelRequired: false,
//     sportsQuota: false,
//     sportsDetails: "",
//     medicalConditions: "",
//     allergies: "",
//   });

//   const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

//   /* ================= LOAD MASTER DATA ================= */

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [cRes, secRes, yRes] = await Promise.all([
//           apiConnector("GET", "/classes"),
//           apiConnector("GET", "/sections"),
//           apiConnector("GET", "/academic-year"),
//         ]);

//         setClasses(cRes.data || []);
//         setSections(secRes.data.data || []);
//         setYears(yRes.data.data || []);
//       } catch {
//         toast.error("Failed to load data");
//       }
//     };

//     load();
//   }, []);

//   // Update class name when classId changes - with prevention of infinite loops
//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }

//     if (form.classId && form.classId !== prevClassId.current) {
//       const selectedClass = classes.find(c => String(c.id) === form.classId);
//       if (selectedClass) {
//         setForm(prev => ({ ...prev, className: selectedClass.name }));
//       }
//       prevClassId.current = form.classId;
//     }
//   }, [form.classId, classes]);

//   // Update section name when sectionId changes - with prevention of infinite loops
//   useEffect(() => {
//     if (form.sectionId && form.sectionId !== prevSectionId.current) {
//       const selectedSection = sections.find(s => String(s.id) === form.sectionId);
//       if (selectedSection) {
//         setForm(prev => ({ ...prev, sectionName: selectedSection.name }));
//       }
//       prevSectionId.current = form.sectionId;
//     }
//   }, [form.sectionId, sections]);

//   // Update academic year name when academicYearId changes - with prevention of infinite loops
//   useEffect(() => {
//     if (form.academicYearId && form.academicYearId !== prevAcademicYearId.current) {
//       const selectedYear = years.find(y => String(y.id) === form.academicYearId);
//       if (selectedYear) {
//         setForm(prev => ({ ...prev, academicYearName: selectedYear.name }));
//       }
//       prevAcademicYearId.current = form.academicYearId;
//     }
//   }, [form.academicYearId, years]);

//   /* ================= FILTER SECTIONS ================= */

//   const filteredSections = sections.filter(
//     (s) => String(s.classId) === form.classId
//   );

//   /* ================= VALIDATION ================= */

//   const validateStep = useCallback((step: number): boolean => {
//     const newErrors: Partial<Record<keyof FormState, string>> = {};

//     if (step === 1) {
//       if (!form.studentName?.trim()) newErrors.studentName = "Student name is required";
//       if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
//       if (!form.gender) newErrors.gender = "Gender is required";
//       if (!form.bloodGroup) newErrors.bloodGroup = "Blood group is required";
//       if (form.aadharNumber && !/^\d{12}$/.test(form.aadharNumber)) {
//         newErrors.aadharNumber = "Aadhar number must be 12 digits";
//       }
//     }

//     if (step === 2) {
//       if (!form.address?.trim()) newErrors.address = "Address is required";
//       if (!form.city?.trim()) newErrors.city = "City is required";
//       if (!form.state?.trim()) newErrors.state = "State is required";
//       if (!form.pincode?.trim()) newErrors.pincode = "Pincode is required";
//       if (!form.phoneNumber?.trim()) newErrors.phoneNumber = "Phone number is required";
//       if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//         newErrors.email = "Invalid email format";
//       }
//     }

//     if (step === 3) {
//       if (!form.classId) newErrors.classId = "Class is required";
//       if (!form.academicYearId) newErrors.academicYearId = "Academic year is required";
//     }

//     if (step === 4) {
//       if (!form.fatherName?.trim() && !form.motherName?.trim() && !form.guardianName?.trim()) {
//         newErrors.fatherName = "At least one parent/guardian name is required";
//       }
//       if (form.fatherPhone && !/^\d{10}$/.test(form.fatherPhone)) {
//         newErrors.fatherPhone = "Phone number must be 10 digits";
//       }
//       if (form.motherPhone && !/^\d{10}$/.test(form.motherPhone)) {
//         newErrors.motherPhone = "Phone number must be 10 digits";
//       }
//     }

//     if (step === 5) {
//       if (!form.hasBirthCertificate) {
//         newErrors.hasBirthCertificate = "Birth certificate is required";
//       }
//       if (!form.hasPassportPhoto) {
//         newErrors.hasPassportPhoto = "Passport photo is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [form]);

//   const validateAllSteps = useCallback((): boolean => {
//     for (let step = 1; step <= steps.length; step++) {
//       if (!validateStep(step)) {
//         setCurrentStep(step);
//         toast.error(`Please complete step ${step} correctly`);
//         return false;
//       }
//     }
//     return true;
//   }, [validateStep, steps.length]);

//   /* ================= CHANGE ================= */

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear error for this field
//     if (errors[name as keyof FormState]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const fileSize = (file.size / 1024).toFixed(2); // Size in KB

//       // Create object URL for preview
//       const url = URL.createObjectURL(file);

//       setUploadedFiles((prev) => ({
//         ...prev,
//         [documentType]: {
//           file: file,
//           name: file.name,
//           size: fileSize,
//           url: url
//         },
//       }));

//       // Auto-check the corresponding checkbox
//       const checkboxName = `has${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
//       setForm((prev) => ({
//         ...prev,
//         [checkboxName]: true,
//       }));

//       toast.success(`${file.name} uploaded successfully`);
//     }
//   };

//   const removeFile = (documentType: string) => {
//     // Revoke object URL to free memory
//     if (uploadedFiles[documentType]?.url) {
//       URL.revokeObjectURL(uploadedFiles[documentType].url);
//     }

//     setUploadedFiles((prev) => {
//       const newFiles = { ...prev };
//       delete newFiles[documentType];
//       return newFiles;
//     });

//     // Uncheck the corresponding checkbox
//     const checkboxName = `has${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
//     setForm((prev) => ({
//       ...prev,
//       [checkboxName]: false,
//     }));
//   };

//   /* ================= NAVIGATION ================= */

//   const handleNext = useCallback(() => {
//     if (validateStep(currentStep)) {
//       if (currentStep === steps.length) {
//         // If on last step, show preview
//         setShowPreview(true);
//       } else {
//         setCurrentStep((prev) => Math.min(prev + 1, steps.length));
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     }
//   }, [currentStep, steps.length, validateStep]);

//   const handlePrevious = useCallback(() => {
//     if (showPreview) {
//       setShowPreview(false);
//     } else {
//       setCurrentStep((prev) => Math.max(prev - 1, 1));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [showPreview]);

//   const handleEditStep = useCallback((step: number) => {
//     setCurrentStep(step);
//     setShowPreview(false);
//     setEditMode({ step });
//   }, []);

//   const handleEditField = useCallback((step: number, field: string) => {
//     setCurrentStep(step);
//     setShowPreview(false);
//     setEditMode({ step, field });

//     // Focus on the field after a short delay
//     setTimeout(() => {
//       const element = document.querySelector(`[name="${field}"]`);
//       if (element) {
//         (element as HTMLElement).focus();
//         (element as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }, 100);
//   }, []);

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateAllSteps()) {
//       return;
//     }

//     dispatch(setAdmissionLoading(true));
//     dispatch(setAdmissionError(null));

//     try {
//       // Prepare data for API
//       const formData = new FormData();

//       // Append all form fields
//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== '') {
//           formData.append(key, String(value));
//         }
//       });

//       // Append files
//       Object.entries(uploadedFiles).forEach(([key, fileData]) => {
//         formData.append(key, fileData.file);
//       });

//       // Add address as combined field
//       formData.append('fullAddress', `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`);

//       await createAdmissionAPI(formData);

//       dispatch(setAdmissionSuccess(true));
//       toast.success("Admission application submitted successfully!");

//       // Reset form
//       setForm({
//         studentName: "",
//         dateOfBirth: "",
//         gender: "",
//         bloodGroup: "",
//         nationality: "Indian",
//         religion: "",
//         caste: "",
//         aadharNumber: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//         phoneNumber: "",
//         alternatePhone: "",
//         email: "",
//         classId: "",
//         sectionId: "",
//         academicYearId: "",
//         previousSchool: "",
//         previousClass: "",
//         previousPercentage: "",
//         fatherName: "",
//         fatherOccupation: "",
//         fatherPhone: "",
//         fatherEmail: "",
//         motherName: "",
//         motherOccupation: "",
//         motherPhone: "",
//         motherEmail: "",
//         guardianName: "",
//         guardianRelation: "",
//         guardianPhone: "",
//         hasBirthCertificate: false,
//         hasAadharCard: false,
//         hasTransferCertificate: false,
//         hasMarksheet: false,
//         hasPassportPhoto: false,
//         transportRequired: false,
//         hostelRequired: false,
//         sportsQuota: false,
//         sportsDetails: "",
//         medicalConditions: "",
//         allergies: "",
//       });

//       setUploadedFiles({});
//       setCurrentStep(1);
//       setShowPreview(false);
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || "Admission failed";
//       dispatch(setAdmissionError(msg));
//       toast.error(msg);
//     } finally {
//       dispatch(setAdmissionLoading(false));
//     }
//   };

//   /* ================= RENDER PREVIEW ================= */

//   const renderPreview = () => {
//     return (
//       <div className="space-y-6">
//         {/* Preview Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
//           <div className="flex space-x-2">
//             <button
//               type="button"
//               onClick={() => window.print()}
//               className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               <Printer className="w-4 h-4" />
//               <span>Print</span>
//             </button>
//             <button
//               type="button"
//               className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               <Download className="w-4 h-4" />
//               <span>Download</span>
//             </button>
//           </div>
//         </div>

//         <p className="text-gray-600">Please review all information before final submission. You can edit any section by clicking the edit button.</p>

//         {/* Personal Information Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <User className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Personal Information</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(1)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Student Name</p>
//               <p className="font-medium">{form.studentName || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Date of Birth</p>
//               <p className="font-medium">{form.dateOfBirth ? new Date(form.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Gender</p>
//               <p className="font-medium">{form.gender || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Blood Group</p>
//               <p className="font-medium">{form.bloodGroup || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Nationality</p>
//               <p className="font-medium">{form.nationality || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Religion</p>
//               <p className="font-medium">{form.religion || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Caste/Category</p>
//               <p className="font-medium">{form.caste || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Aadhar Number</p>
//               <p className="font-medium">{form.aadharNumber || 'Not provided'}</p>
//             </div>
//           </div>
//         </div>

//         {/* Contact Information Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <MapPin className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Contact Information</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(2)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <p className="text-sm text-gray-500">Address</p>
//               <p className="font-medium">{form.address || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">City</p>
//               <p className="font-medium">{form.city || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">State</p>
//               <p className="font-medium">{form.state || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Pincode</p>
//               <p className="font-medium">{form.pincode || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Phone Number</p>
//               <p className="font-medium">{form.phoneNumber || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Alternate Phone</p>
//               <p className="font-medium">{form.alternatePhone || 'Not provided'}</p>
//             </div>
//             <div className="col-span-2">
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium">{form.email || 'Not provided'}</p>
//             </div>
//           </div>
//         </div>

//         {/* Academic Information Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <BookOpen className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Academic Information</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(3)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Academic Year</p>
//               <p className="font-medium">{form.academicYearName || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Applying for Class</p>
//               <p className="font-medium">{form.className ? `Class ${form.className}` : 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Preferred Section</p>
//               <p className="font-medium">{form.sectionName || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Previous School</p>
//               <p className="font-medium">{form.previousSchool || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Last Attended Class</p>
//               <p className="font-medium">{form.previousClass || 'Not provided'}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Last Year Percentage</p>
//               <p className="font-medium">{form.previousPercentage || 'Not provided'}</p>
//             </div>
//           </div>
//         </div>

//         {/* Parent Information Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <GraduationCap className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Parent/Guardian Information</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(4)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>

//           {/* Father's Details */}
//           {(form.fatherName || form.fatherOccupation || form.fatherPhone) && (
//             <div className="p-6 border-b">
//               <h4 className="font-medium text-gray-800 mb-3">Father's Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Name</p>
//                   <p className="font-medium">{form.fatherName || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Occupation</p>
//                   <p className="font-medium">{form.fatherOccupation || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-medium">{form.fatherPhone || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-medium">{form.fatherEmail || 'Not provided'}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Mother's Details */}
//           {(form.motherName || form.motherOccupation || form.motherPhone) && (
//             <div className="p-6 border-b">
//               <h4 className="font-medium text-gray-800 mb-3">Mother's Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Name</p>
//                   <p className="font-medium">{form.motherName || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Occupation</p>
//                   <p className="font-medium">{form.motherOccupation || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-medium">{form.motherPhone || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-medium">{form.motherEmail || 'Not provided'}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Guardian's Details */}
//           {(form.guardianName || form.guardianRelation || form.guardianPhone) && (
//             <div className="p-6">
//               <h4 className="font-medium text-gray-800 mb-3">Guardian's Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Name</p>
//                   <p className="font-medium">{form.guardianName || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Relation</p>
//                   <p className="font-medium">{form.guardianRelation || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-medium">{form.guardianPhone || 'Not provided'}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Documents Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <FileText className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Documents</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(5)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//           <div className="p-6">
//             <div className="space-y-3">
//               {[
//                 { key: 'birthCertificate', label: 'Birth Certificate', required: true },
//                 { key: 'aadharCard', label: 'Aadhar Card', required: false },
//                 { key: 'transferCertificate', label: 'Transfer Certificate', required: false },
//                 { key: 'marksheet', label: 'Marksheet', required: false },
//                 { key: 'passportPhoto', label: 'Passport Photo', required: true },
//               ].map((doc) => {
//                 const hasDoc = form[`has${doc.key.charAt(0).toUpperCase() + doc.key.slice(1)}` as keyof FormState] as boolean;
//                 const uploadedFile = uploadedFiles[doc.key];

//                 return (
//                   <div key={doc.key} className="flex items-center justify-between py-2 border-b last:border-0">
//                     <div className="flex items-center space-x-2">
//                       {hasDoc ? (
//                         <CheckCircle className="w-5 h-5 text-green-500" />
//                       ) : (
//                         <X className="w-5 h-5 text-red-500" />
//                       )}
//                       <span className="text-sm text-gray-700">
//                         {doc.label} {doc.required && <span className="text-red-500">*</span>}
//                       </span>
//                     </div>
//                     {uploadedFile && (
//                       <span className="text-xs text-gray-500">
//                         {uploadedFile.name} ({uploadedFile.size} KB)
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Additional Information Preview */}
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <Heart className="w-5 h-5 text-indigo-600" />
//               <h3 className="font-semibold text-gray-900">Additional Information</h3>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleEditStep(6)}
//               className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               <Edit className="w-4 h-4" />
//               <span>Edit</span>
//             </button>
//           </div>
//           <div className="p-6 space-y-4">
//             {/* Facilities */}
//             <div>
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities Required</h4>
//               <div className="space-y-1">
//                 <div className="flex items-center space-x-2">
//                   {form.transportRequired ? (
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <X className="w-4 h-4 text-red-500" />
//                   )}
//                   <span className="text-sm text-gray-600">Transport Facility</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {form.hostelRequired ? (
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <X className="w-4 h-4 text-red-500" />
//                   )}
//                   <span className="text-sm text-gray-600">Hostel Accommodation</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {form.sportsQuota ? (
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <X className="w-4 h-4 text-red-500" />
//                   )}
//                   <span className="text-sm text-gray-600">Sports Quota</span>
//                 </div>
//               </div>
//               {form.sportsQuota && form.sportsDetails && (
//                 <div className="mt-2 p-3 bg-gray-50 rounded">
//                   <p className="text-sm text-gray-600">{form.sportsDetails}</p>
//                 </div>
//               )}
//             </div>

//             {/* Medical Information */}
//             {(form.medicalConditions || form.allergies) && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Medical Information</h4>
//                 {form.medicalConditions && (
//                   <div className="mb-2">
//                     <p className="text-xs text-gray-500">Medical Conditions:</p>
//                     <p className="text-sm text-gray-600">{form.medicalConditions}</p>
//                   </div>
//                 )}
//                 {form.allergies && (
//                   <div>
//                     <p className="text-xs text-gray-500">Allergies:</p>
//                     <p className="text-sm text-gray-600">{form.allergies}</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Declaration */}
//         <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded-lg">
//           <p className="text-sm text-gray-700">
//             <strong>Declaration:</strong> I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to cancellation of admission.
//           </p>
//           <div className="mt-4 flex items-center">
//             <input
//               type="checkbox"
//               id="declaration"
//               className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//               required
//             />
//             <label htmlFor="declaration" className="ml-2 text-sm text-gray-600">
//               I agree to the above declaration <span className="text-red-500">*</span>
//             </label>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= RENDER STEP CONTENT ================= */

//   const renderStepContent = () => {
//     if (showPreview) {
//       return renderPreview();
//     }

//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//               <span className="text-sm text-gray-500">Step 1 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[0].description}</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Student Name */}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Student Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     name="studentName"
//                     value={form.studentName}
//                     onChange={handleChange}
//                     placeholder="Enter full name"
//                     className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                       errors.studentName ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 {errors.studentName && (
//                   <p className="mt-1 text-sm text-red-500 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {errors.studentName}
//                   </p>
//                 )}
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date of Birth <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={form.dateOfBirth}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                       errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 {errors.dateOfBirth && (
//                   <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
//                 )}
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="gender"
//                   value={form.gender}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.gender ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
//                 )}
//               </div>

//               {/* Blood Group */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Blood Group <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="bloodGroup"
//                   value={form.bloodGroup}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select Blood Group</option>
//                   <option value="A+">A+</option>
//                   <option value="A-">A-</option>
//                   <option value="B+">B+</option>
//                   <option value="B-">B-</option>
//                   <option value="AB+">AB+</option>
//                   <option value="AB-">AB-</option>
//                   <option value="O+">O+</option>
//                   <option value="O-">O-</option>
//                 </select>
//                 {errors.bloodGroup && (
//                   <p className="mt-1 text-sm text-red-500">{errors.bloodGroup}</p>
//                 )}
//               </div>

//               {/* Nationality */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Nationality
//                 </label>
//                 <input
//                   name="nationality"
//                   value={form.nationality}
//                   onChange={handleChange}
//                   placeholder="Enter nationality"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Religion */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Religion
//                 </label>
//                 <input
//                   name="religion"
//                   value={form.religion}
//                   onChange={handleChange}
//                   placeholder="Enter religion"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Caste */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Caste/Category
//                 </label>
//                 <input
//                   name="caste"
//                   value={form.caste}
//                   onChange={handleChange}
//                   placeholder="Enter caste/category"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Aadhar Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Aadhar Number
//                 </label>
//                 <input
//                   name="aadharNumber"
//                   value={form.aadharNumber}
//                   onChange={handleChange}
//                   placeholder="Enter 12-digit Aadhar number"
//                   maxLength={12}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.aadharNumber && (
//                   <p className="mt-1 text-sm text-red-500">{errors.aadharNumber}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
//               <span className="text-sm text-gray-500">Step 2 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[1].description}</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Address */}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   rows={3}
//                   placeholder="Enter complete address"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.address ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.address && (
//                   <p className="mt-1 text-sm text-red-500">{errors.address}</p>
//                 )}
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   placeholder="Enter city"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.city ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.city && (
//                   <p className="mt-1 text-sm text-red-500">{errors.city}</p>
//                 )}
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   placeholder="Enter state"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.state ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.state && (
//                   <p className="mt-1 text-sm text-red-500">{errors.state}</p>
//                 )}
//               </div>

//               {/* Pincode */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Pincode <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="pincode"
//                   value={form.pincode}
//                   onChange={handleChange}
//                   placeholder="Enter pincode"
//                   maxLength={6}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.pincode ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.pincode && (
//                   <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
//                 )}
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="phoneNumber"
//                   value={form.phoneNumber}
//                   onChange={handleChange}
//                   placeholder="Enter 10-digit phone number"
//                   maxLength={10}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
//                 )}
//               </div>

//               {/* Alternate Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Alternate Phone
//                 </label>
//                 <input
//                   name="alternatePhone"
//                   value={form.alternatePhone}
//                   onChange={handleChange}
//                   placeholder="Enter alternate phone"
//                   maxLength={10}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Email */}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
//               <span className="text-sm text-gray-500">Step 3 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[2].description}</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Academic Year */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Academic Year <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="academicYearId"
//                   value={form.academicYearId}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.academicYearId ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select Academic Year</option>
//                   {years.map((y) => (
//                     <option key={y.id} value={y.id}>
//                       {y.name} {y.isCurrent ? '(Current)' : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.academicYearId && (
//                   <p className="mt-1 text-sm text-red-500">{errors.academicYearId}</p>
//                 )}
//               </div>

//               {/* Class */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Applying for Class <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="classId"
//                   value={form.classId}
//                   onChange={(e) =>
//                     setForm((prev) => ({
//                       ...prev,
//                       classId: e.target.value,
//                       sectionId: "",
//                     }))
//                   }
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.classId ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select Class</option>
//                   {classes.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       Class {c.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.classId && (
//                   <p className="mt-1 text-sm text-red-500">{errors.classId}</p>
//                 )}
//               </div>

//               {/* Section */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Preferred Section
//                 </label>
//                 <select
//                   name="sectionId"
//                   value={form.sectionId}
//                   onChange={handleChange}
//                   disabled={!form.classId}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//                 >
//                   <option value="">Select Section</option>
//                   {filteredSections.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Previous School */}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Previous School
//                 </label>
//                 <input
//                   name="previousSchool"
//                   value={form.previousSchool}
//                   onChange={handleChange}
//                   placeholder="Enter previous school name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Previous Class */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Attended Class
//                 </label>
//                 <input
//                   name="previousClass"
//                   value={form.previousClass}
//                   onChange={handleChange}
//                   placeholder="e.g., Class 5"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Previous Percentage */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Year Percentage
//                 </label>
//                 <input
//                   name="previousPercentage"
//                   value={form.previousPercentage}
//                   onChange={handleChange}
//                   placeholder="e.g., 85%"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Parent/Guardian Information</h3>
//               <span className="text-sm text-gray-500">Step 4 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[3].description}</p>

//             {/* Father's Information */}
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium text-gray-800 mb-3">Father's Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Father's Name
//                   </label>
//                   <input
//                     name="fatherName"
//                     value={form.fatherName}
//                     onChange={handleChange}
//                     placeholder="Enter father's full name"
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                       errors.fatherName ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Occupation
//                   </label>
//                   <input
//                     name="fatherOccupation"
//                     value={form.fatherOccupation}
//                     onChange={handleChange}
//                     placeholder="Enter occupation"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     name="fatherPhone"
//                     value={form.fatherPhone}
//                     onChange={handleChange}
//                     placeholder="Enter 10-digit phone"
//                     maxLength={10}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                       errors.fatherPhone ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="fatherEmail"
//                     value={form.fatherEmail}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Mother's Information */}
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium text-gray-800 mb-3">Mother's Details</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mother's Name
//                   </label>
//                   <input
//                     name="motherName"
//                     value={form.motherName}
//                     onChange={handleChange}
//                     placeholder="Enter mother's full name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Occupation
//                   </label>
//                   <input
//                     name="motherOccupation"
//                     value={form.motherOccupation}
//                     onChange={handleChange}
//                     placeholder="Enter occupation"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     name="motherPhone"
//                     value={form.motherPhone}
//                     onChange={handleChange}
//                     placeholder="Enter 10-digit phone"
//                     maxLength={10}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                       errors.motherPhone ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="motherEmail"
//                     value={form.motherEmail}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Guardian's Information */}
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <h4 className="font-medium text-gray-800 mb-3">Guardian Details (if applicable)</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Guardian's Name
//                   </label>
//                   <input
//                     name="guardianName"
//                     value={form.guardianName}
//                     onChange={handleChange}
//                     placeholder="Enter guardian's full name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Relation
//                   </label>
//                   <input
//                     name="guardianRelation"
//                     value={form.guardianRelation}
//                     onChange={handleChange}
//                     placeholder="e.g., Uncle, Grandfather"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     name="guardianPhone"
//                     value={form.guardianPhone}
//                     onChange={handleChange}
//                     placeholder="Enter 10-digit phone"
//                     maxLength={10}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Documents Upload</h3>
//               <span className="text-sm text-gray-500">Step 5 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[4].description}</p>

//             {/* Documents */}
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium text-gray-800 mb-3">Required Documents</h4>
//               <p className="text-sm text-gray-500 mb-4">Please upload clear scanned copies of the following documents</p>

//               <div className="space-y-4">
//                 {/* Birth Certificate */}
//                 <div className="border-b pb-4">
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       id="hasBirthCertificate"
//                       name="hasBirthCertificate"
//                       checked={form.hasBirthCertificate}
//                       onChange={handleChange}
//                       className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <div className="flex-1">
//                       <label htmlFor="hasBirthCertificate" className="text-sm font-medium text-gray-700">
//                         Birth Certificate <span className="text-red-500">*</span>
//                       </label>
//                       <p className="text-xs text-gray-500">Upload birth certificate or equivalent age proof</p>
//                       {errors.hasBirthCertificate && (
//                         <p className="text-xs text-red-500 mt-1">{errors.hasBirthCertificate}</p>
//                       )}
//                     </div>
//                     <div className="flex-shrink-0">
//                       <input
//                         type="file"
//                         id="file-birthCertificate"
//                         onChange={(e) => handleFileUpload(e, 'birthCertificate')}
//                         className="hidden"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('file-birthCertificate')?.click()}
//                         className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadedFiles['birthCertificate'] && (
//                     <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-sm text-green-700 truncate max-w-xs">
//                         ✓ {uploadedFiles['birthCertificate'].name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile('birthCertificate')}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Aadhar Card */}
//                 <div className="border-b pb-4">
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       id="hasAadharCard"
//                       name="hasAadharCard"
//                       checked={form.hasAadharCard}
//                       onChange={handleChange}
//                       className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <div className="flex-1">
//                       <label htmlFor="hasAadharCard" className="text-sm font-medium text-gray-700">
//                         Student Aadhar Card
//                       </label>
//                       <p className="text-xs text-gray-500">Upload front and back (can be combined in one file)</p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <input
//                         type="file"
//                         id="file-aadharCard"
//                         onChange={(e) => handleFileUpload(e, 'aadharCard')}
//                         className="hidden"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('file-aadharCard')?.click()}
//                         className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadedFiles['aadharCard'] && (
//                     <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-sm text-green-700 truncate max-w-xs">
//                         ✓ {uploadedFiles['aadharCard'].name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile('aadharCard')}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Transfer Certificate */}
//                 <div className="border-b pb-4">
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       id="hasTransferCertificate"
//                       name="hasTransferCertificate"
//                       checked={form.hasTransferCertificate}
//                       onChange={handleChange}
//                       className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <div className="flex-1">
//                       <label htmlFor="hasTransferCertificate" className="text-sm font-medium text-gray-700">
//                         Transfer Certificate
//                       </label>
//                       <p className="text-xs text-gray-500">From last attended school (if applicable)</p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <input
//                         type="file"
//                         id="file-transferCertificate"
//                         onChange={(e) => handleFileUpload(e, 'transferCertificate')}
//                         className="hidden"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('file-transferCertificate')?.click()}
//                         className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadedFiles['transferCertificate'] && (
//                     <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-sm text-green-700 truncate max-w-xs">
//                         ✓ {uploadedFiles['transferCertificate'].name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile('transferCertificate')}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Marksheet */}
//                 <div className="border-b pb-4">
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       id="hasMarksheet"
//                       name="hasMarksheet"
//                       checked={form.hasMarksheet}
//                       onChange={handleChange}
//                       className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <div className="flex-1">
//                       <label htmlFor="hasMarksheet" className="text-sm font-medium text-gray-700">
//                         Previous Year Marksheet
//                       </label>
//                       <p className="text-xs text-gray-500">Marksheet of last attended class</p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <input
//                         type="file"
//                         id="file-marksheet"
//                         onChange={(e) => handleFileUpload(e, 'marksheet')}
//                         className="hidden"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('file-marksheet')?.click()}
//                         className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadedFiles['marksheet'] && (
//                     <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-sm text-green-700 truncate max-w-xs">
//                         ✓ {uploadedFiles['marksheet'].name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile('marksheet')}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Passport Photo */}
//                 <div>
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       id="hasPassportPhoto"
//                       name="hasPassportPhoto"
//                       checked={form.hasPassportPhoto}
//                       onChange={handleChange}
//                       className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <div className="flex-1">
//                       <label htmlFor="hasPassportPhoto" className="text-sm font-medium text-gray-700">
//                         Passport Size Photo <span className="text-red-500">*</span>
//                       </label>
//                       <p className="text-xs text-gray-500">Recent color photograph (max 1MB)</p>
//                       {errors.hasPassportPhoto && (
//                         <p className="text-xs text-red-500 mt-1">{errors.hasPassportPhoto}</p>
//                       )}
//                     </div>
//                     <div className="flex-shrink-0">
//                       <input
//                         type="file"
//                         id="file-passportPhoto"
//                         onChange={(e) => handleFileUpload(e, 'passportPhoto')}
//                         className="hidden"
//                         accept=".jpg,.jpeg,.png"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('file-passportPhoto')?.click()}
//                         className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadedFiles['passportPhoto'] && (
//                     <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-sm text-green-700 truncate max-w-xs">
//                         ✓ {uploadedFiles['passportPhoto'].name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile('passportPhoto')}
//                         className="text-xs text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
//               <span className="text-sm text-gray-500">Step 6 of {steps.length}</span>
//             </div>
//             <p className="text-sm text-gray-500">{steps[5].description}</p>

//             {/* Additional Facilities */}
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium text-gray-800 mb-3">Facilities Required</h4>
//               <div className="space-y-3">
//                 <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
//                   <input
//                     type="checkbox"
//                     name="transportRequired"
//                     checked={form.transportRequired}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                   />
//                   <div>
//                     <span className="text-sm font-medium text-gray-700">Transport Facility Required</span>
//                     <p className="text-xs text-gray-500">School bus/van service</p>
//                   </div>
//                 </label>

//                 <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
//                   <input
//                     type="checkbox"
//                     name="hostelRequired"
//                     checked={form.hostelRequired}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                   />
//                   <div>
//                     <span className="text-sm font-medium text-gray-700">Hostel Accommodation Required</span>
//                     <p className="text-xs text-gray-500">Boys/Girls hostel facility</p>
//                   </div>
//                 </label>

//                 <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
//                   <input
//                     type="checkbox"
//                     name="sportsQuota"
//                     checked={form.sportsQuota}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                   />
//                   <div>
//                     <span className="text-sm font-medium text-gray-700">Sports Quota</span>
//                     <p className="text-xs text-gray-500">Admission under sports category</p>
//                   </div>
//                 </label>

//                 {form.sportsQuota && (
//                   <div className="ml-8 mt-2">
//                     <label className="block text-sm text-gray-600 mb-1">Sports Achievements</label>
//                     <textarea
//                       name="sportsDetails"
//                       value={form.sportsDetails}
//                       onChange={handleChange}
//                       rows={3}
//                       placeholder="Please specify sports achievements, certificates, etc."
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Medical Information */}
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium text-gray-800 mb-3">Medical Information</h4>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Any Medical Conditions
//                   </label>
//                   <textarea
//                     name="medicalConditions"
//                     value={form.medicalConditions}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder="Please list any medical conditions, allergies, or health concerns (if none, write 'None')"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">This information helps us provide better care</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Allergies (if any)
//                   </label>
//                   <textarea
//                     name="allergies"
//                     value={form.allergies}
//                     onChange={handleChange}
//                     rows={2}
//                     placeholder="Please list any food or medical allergies"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Admission Application Form</h1>
//           <p className="text-gray-600">Please fill all the required details carefully</p>
//           {!showPreview && (
//             <p className="text-sm text-gray-500 mt-1">Step {currentStep} of {steps.length}</p>
//           )}
//         </div>

//         {/* Progress Steps - Hide in preview */}
//         {!showPreview && (
//           <div className="mb-8 overflow-x-auto">
//             <div className="flex items-center justify-between min-w-max">
//               {steps.map((step, index) => {
//                 const StepIcon = step.icon;
//                 return (
//                   <div key={step.id} className="flex items-center">
//                     <button
//                       type="button"
//                       onClick={() => setCurrentStep(step.id)}
//                       className="relative focus:outline-none"
//                       disabled={step.id > currentStep}
//                     >
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
//                           currentStep >= step.id
//                             ? 'border-indigo-600 bg-indigo-600 text-white'
//                             : 'border-gray-300 bg-white text-gray-400'
//                         } ${step.id < currentStep ? 'cursor-pointer hover:border-indigo-400' : ''}`}
//                       >
//                         {currentStep > step.id ? (
//                           <CheckCircle className="w-5 h-5" />
//                         ) : (
//                           <StepIcon className="w-5 h-5" />
//                         )}
//                       </div>
//                     </button>
//                     {index < steps.length - 1 && (
//                       <div
//                         className={`w-16 h-1 mx-2 transition-colors ${
//                           currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'
//                         }`}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="flex justify-between mt-2 text-xs">
//               {steps.map((step) => (
//                 <span key={step.id} className={`${currentStep >= step.id ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
//                   {step.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
//           {/* Step Content */}
//           <div className="mb-6">
//             {renderStepContent()}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8 pt-4 border-t">
//             <button
//               type="button"
//               onClick={handlePrevious}
//               disabled={currentStep === 1 && !showPreview}
//               className="flex items-center space-x-2 px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>{showPreview ? 'Back to Form' : 'Previous'}</span>
//             </button>

//             {showPreview ? (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center space-x-2 px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Check className="w-4 h-4" />
//                     <span>Confirm & Submit</span>
//                   </>
//                 )}
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 <span>{currentStep === steps.length ? 'Review Application' : 'Next'}</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Help Text */}
//         <div className="mt-4 text-sm text-gray-500 text-center">
//           <p>Fields marked with <span className="text-red-500">*</span> are required</p>
//           {!showPreview && (
//             <p className="mt-1">You can click on completed steps to edit them</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import Stepper
// from "@/components/Stepper";

// import Navigation
// from "@/components/Navigation";

// import PersonalInfo
// from "@/components/steps/PersonalInfo";

// import AcademicInfo
// from "@/components/steps/AcademicInfo";

// import { useAdmissionForm }
// from "@/hooks/useAdmissionForm";

// const CreateAdmissionPage = () => {

//   const {

//     form,

//     currentStep,

//     setCurrentStep,

//     handleChange,
//   } = useAdmissionForm();

//   const renderStep = () => {

//     switch (currentStep) {

//       case 1:

//         return (
//           <PersonalInfo
//             form={form}
//             handleChange={
//               handleChange
//             }
//           />
//         );

//       case 2:

//         return (
//           <AcademicInfo
//             form={form}
//             handleChange={
//               handleChange
//             }
//             classes={[]}
//             sections={[]}
//             academicYears={[]}
//           />
//         );

//       default:

//         return null;
//     }
//   };

//   return (

//     <div className="p-6">

//       <Stepper
//         currentStep={
//           currentStep
//         }
//       />

//       <div className="mt-6">

//         {renderStep()}
//       </div>

//       <Navigation
//         currentStep={
//           currentStep
//         }
//         setCurrentStep={
//           setCurrentStep
//         }
//         onSubmit={() => {}}
//       />
//     </div>
//   );
// };

// export default CreateAdmissionPage;


// "use client";
// import { useCallback, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { setAdmissionLoading, setAdmissionSuccess, setAdmissionError } from "@/redux/admissionSlice";
// // import { createAdmissionAPI } from "@/services/admissionService";
// import { createAdmission } from "@/redux/actions/admissionActions";
// import { toast } from "react-hot-toast";

// import StepProgress from "@/components/Stepper";
// import FormNavigation from "@/components/Navigation";
// import PersonalInfoStep from "@/components/steps/PersonalInfo";
// import ContactInfoStep from "@/components/steps/ContactInfo";
// import AcademicInfoStep from "@/components/steps/AcademicInfo";
// import ParentInfoStep from "@/components/steps/ParentInfo";
// import DocumentsStep from "@/components/steps/DocumentUpload";
// import AdditionalInfoStep from "@/components/steps/AdditionalInfo";
// import PreviewSection from "@/components/steps/Preview";

// import { useAdmissionForm } from "@/hooks/useAdmissionForm";
// import { useMasterData } from "@/hooks/useMasterData";
// import { steps } from "@/utils/formUtils";
// import { StudentFormData } from "@/components/types/studentForm";
// export default function CreateAdmissionPage() {
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector((s) => s.admission);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPreview, setShowPreview] = useState(false);
//   const [editMode, setEditMode] = useState(null);

//   const { classes, sections, years, filteredSections } = useMasterData();
//   const { form, uploadedFiles, updateForm, setForm, uploadFile, removeFile, resetForm } = useAdmissionForm();

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target).checked;

//     updateForm(name, type === "checkbox" ? checked : value);
//   };

//   const handleNext = useCallback(() => {
//     if (currentStep === steps.length) {
//       setShowPreview(true);
//     } else {
//       setCurrentStep((prev) => Math.min(prev + 1, steps.length));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [currentStep]);

//   const handlePrevious = useCallback(() => {
//     if (showPreview) {
//       setShowPreview(false);
//     } else {
//       setCurrentStep((prev) => Math.max(prev - 1, 1));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [showPreview]);

//   const handleEditStep = useCallback((step) => {
//     setCurrentStep(step);
//     setShowPreview(false);
//     setEditMode({ step });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(setAdmissionLoading(true));
//     dispatch(setAdmissionError(null));

//     try {
//       const formData = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== '') {
//           formData.append(key, String(value));
//         }
//       });

//       Object.entries(uploadedFiles).forEach(([key, fileData]) => {
//         formData.append(key, fileData.file);
//       });

//       formData.append('fullAddress', `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`);

//       await createAdmissionAPI(formData);

//       dispatch(setAdmissionSuccess(true));
//       toast.success("Admission application submitted successfully!");
//       resetForm();
//       setCurrentStep(1);
//       setShowPreview(false);
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Admission failed";
//       dispatch(setAdmissionError(msg));
//       toast.error(msg);
//     } finally {
//       dispatch(setAdmissionLoading(false));
//     }
//   };

//   const stepProps = {
//     form,
//     handleChange,
//     uploadedFiles,
//     uploadFile,
//     removeFile,
//     classes,
//     sections: filteredSections,
//     years,
//     setForm,
//   };

//   const renderStepContent = () => {
//     if (showPreview) {
//       return <PreviewSection form={form} uploadedFiles={uploadedFiles} onEditStep={handleEditStep} />;
//     }

//     switch (currentStep) {
//       case 1: return <PersonalInfoStep {...stepProps} />;
//       case 2: return <ContactInfoStep {...stepProps} />;
//       case 3: return <AcademicInfoStep {...stepProps} />;
//       case 4: return <ParentInfoStep {...stepProps} />;
//       case 5: return <DocumentsStep {...stepProps} />;
//       case 6: return <AdditionalInfoStep {...stepProps} />;
//       default: return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Admission Application Form</h1>
//           <p className="text-gray-600">Please fill all the required details carefully</p>
//           {!showPreview && (
//             <p className="text-sm text-gray-500 mt-1">Step {currentStep} of {steps.length}</p>
//           )}
//         </div>

//         {!showPreview && (
//           <StepProgress currentStep={currentStep} onStepClick={setCurrentStep} />
//         )}

//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
//           <div className="mb-6">{renderStepContent()}</div>

//           <FormNavigation
//             currentStep={currentStep}
//             totalSteps={steps.length}
//             showPreview={showPreview}
//             loading={loading}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//           />
//         </form>

//         <div className="mt-4 text-sm text-gray-500 text-center">
//           <p>Fields marked with <span className="text-red-500">*</span> are required</p>
//           {!showPreview && (
//             <p className="mt-1">You can click on completed steps to edit them</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";

import { createAdmission } from "@/redux/actions/admissionActions";

import StepProgress from "@/components/Stepper";
import FormNavigation from "@/components/Navigation";

import PersonalInfoStep from "@/components/steps/PersonalInfo";
import ContactInfoStep from "@/components/steps/ContactInfo";
import AcademicInfoStep from "@/components/steps/AcademicInfo";
import ParentInfoStep from "@/components/steps/ParentInfo";
import AdditionalInfoStep from "@/components/steps/AdditionalInfo";
import PreviewSection from "@/components/steps/Preview";

import { useAdmissionForm } from "@/hooks/useAdmissionForm";
import { useMasterData } from "@/hooks/useMasterData";

import { steps } from "@/utils/formUtils";
import { StudentFormData } from "@/components/types/studentForm";

export default function CreateAdmissionPage() {
  // ===================================
  // Redux
  // ===================================

  const dispatch =
    useAppDispatch();

  const {
    loading,
    error,
    success,
  } = useAppSelector(
    (state) =>
      state.admission
  );

  // ===================================
  // Local States
  // ===================================

  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);

  const [
    showPreview,
    setShowPreview,
  ] = useState(false);

  // ===================================
  // Master Data
  // ===================================

  const {
    classes,
    sections,
    years,
  } = useMasterData();

  // ===================================
  // Form Hook
  // ===================================

  const {
    form,
    updateForm,
    setForm,
    resetForm,
  } = useAdmissionForm();

  // ===================================
  // Handle Change
  // ===================================

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    const checked = (
      e.target as HTMLInputElement
    ).checked;

    updateForm(
      name as keyof StudentFormData,

      type === "checkbox"
        ? checked
        : value
    );
  };

  // ===================================
  // Next Step
  // ===================================

  const handleNext =
    useCallback(() => {
      if (
        currentStep ===
        steps.length
      ) {
        setShowPreview(
          true
        );
      } else {
        setCurrentStep(
          (prev) =>
            Math.min(
              prev + 1,
              steps.length
            )
        );

        window.scrollTo({
          top: 0,
          behavior:
            "smooth",
        });
      }
    }, [currentStep]);

  // ===================================
  // Previous Step
  // ===================================

  const handlePrevious =
    useCallback(() => {
      if (showPreview) {
        setShowPreview(
          false
        );
      } else {
        setCurrentStep(
          (prev) =>
            Math.max(
              prev - 1,
              1
            )
        );

        window.scrollTo({
          top: 0,
          behavior:
            "smooth",
        });
      }
    }, [showPreview]);

  // ===================================
  // Edit Step
  // ===================================

  const handleEditStep =
    useCallback(
      (step: number) => {
        setCurrentStep(step);

        setShowPreview(
          false
        );
      },
      []
    );

  // ===================================
  // Submit
  // ===================================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        const payload = {
  studentName:
    form.studentName,

  dob:
    form.dateOfBirth,

  gender:
    form.gender,

  address: `
    ${form.address},
    ${form.city},
    ${form.state}
    - ${form.pincode}
  `,

  academicYearId:
    Number(
      form.academicYearId
    ),

  classId: Number(
    form.classId
  ),

  sectionId:
    form.sectionId
      ? Number(
          form.sectionId
        )
      : null,
};

        console.log(
          "FINAL PAYLOAD =>",
          payload
        );

        await dispatch(
          createAdmission(
            payload
          ) as any
        );

        resetForm();

        setCurrentStep(1);

        setShowPreview(
          false
        );
      } catch (error) {
        console.error(error);
      }
    };

  // ===================================
  // Common Step Props
  // ===================================

  const stepProps = {
    form,

    handleChange,

    classes,

    sections,

    years,

    setForm,
  };

  // ===================================
  // Render Steps
  // ===================================

  const renderStepContent =
    () => {
      if (showPreview) {
        return (
          <PreviewSection
            form={form}
            onEditStep={
              handleEditStep
            }
          />
        );
      }

      switch (
      currentStep
      ) {
        case 1:
          return (
            <PersonalInfoStep
              {...stepProps}
            />
          );

        case 2:
          return (
            <ContactInfoStep
              {...stepProps}
            />
          );

        case 3:
          return (
            <AcademicInfoStep
              {...stepProps}
            />
          );

        case 4:
          return (
            <ParentInfoStep
              {...stepProps}
            />
          );

        case 5:
          return (
            <AdditionalInfoStep
              {...stepProps}
            />
          );

        default:
          return null;
      }
    };

  // ===================================
  // UI
  // ===================================

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        py-8
      "
    >
      <div
        className="
          mx-auto
          max-w-4xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Admission
            Application
            Form
          </h1>

          <p className="text-gray-600">
            Please fill all
            required details
            carefully
          </p>

          {!showPreview && (
            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Step{" "}
              {
                currentStep
              }{" "}
              of{" "}
              {
                steps.length
              }
            </p>
          )}
        </div>

        {/* Stepper */}

        {!showPreview && (
          <StepProgress
            currentStep={
              currentStep
            }
            onStepClick={
              setCurrentStep
            }
          />
        )}

        {/* Error */}

        {error && (
          <div
            className="
              mb-4
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div
            className="
              mb-4
              rounded-lg
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-600
            "
          >
            Admission submitted
            successfully
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            rounded-xl
            bg-white
            p-6
            shadow-lg
          "
        >
          {/* Step Content */}

          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation */}

          <FormNavigation
            currentStep={
              currentStep
            }
            totalSteps={
              steps.length
            }
            showPreview={
              showPreview
            }
            loading={loading}
            onPrevious={
              handlePrevious
            }
            onNext={
              handleNext
            }
          />
        </form>

        {/* Footer */}

        <div
          className="
            mt-4
            text-center
            text-sm
            text-gray-500
          "
        >
          <p>
            Fields marked
            with{" "}
            <span className="text-red-500">
              *
            </span>{" "}
            are required
          </p>

          {!showPreview && (
            <p className="mt-1">
              You can click
              completed steps
              to edit them
            </p>
          )}
        </div>
      </div>
    </div>
  );
}