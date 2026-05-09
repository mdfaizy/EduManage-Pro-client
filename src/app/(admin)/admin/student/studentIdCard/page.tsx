'use client';

import React, { useRef, useState } from 'react';
import {
  Printer,
  Download,
  Phone,
  MapPin,
  Droplets,
  GraduationCap,
  Mail,
  Calendar,
  Hash,
  User,
  School,
  Award,
  AlertCircle,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface StudentIdCardProps {
  student: {
    id: number;
    name: string;
    admissionNo: string;
    className: string;
    sectionName: string;
    rollNumber: number | string;
    dob: string;
    bloodGroup: string;
    profilePhoto?: string;
    address: string;
    city?: string;
    state?: string;
    pincode?: string;
    fatherName?: string;
    fatherPhone: string;
    motherName?: string;
    motherPhone: string;
    guardianName?: string;
    guardianPhone: string;
    email?: string;
    academicYear: string;
    medium?: string;
    schoolName?: string;
    validFrom?: string;
    validTo?: string;
  };
  schoolDetails?: {
    name: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

export default function StudentIdCard({ 
  student, 
  schoolDetails = {
    name: 'MODERN PUBLIC SCHOOL',
    logo: '/logo.png',
    address: '123 Education District, New Delhi - 110001',
    phone: '+91-11-12345678',
    email: 'info@modernschool.edu',
    website: 'www.modernschool.edu'
  }
}: StudentIdCardProps) {
  
  const printRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${student.name}-id-card`,
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
  });

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsPrinting(true);
    
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${student.name.replace(/\s/g, '-')}-id-card.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 print:bg-white">
      {/* Action Buttons */}
      <div className="mb-8 flex justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
        >
          <Printer size={18} />
          Print ID Card
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isPrinting}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 disabled:opacity-50"
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* ID Card Container */}
      <div ref={printRef} className="flex flex-col items-center justify-center gap-8 print:gap-0">
        
        {/* Front Side */}
        <div className="relative w-[85mm] h-[54mm] overflow-hidden rounded-lg shadow-2xl print:shadow-none transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: '#ffffff' }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600 rounded-full -ml-12 -mb-12" />
          </div>
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
          {/* Content */}
          <div className="flex h-full p-4">
            {/* Left Section - Photo */}
            <div className="flex-shrink-0 w-[75px] mr-4">
              <div className="relative">
                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden border-2 border-indigo-200 bg-gray-50 shadow-sm">
                  {student.profilePhoto ? (
                    <img
                      src={student.profilePhoto}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100">
                      <User size={30} className="text-indigo-300" />
                    </div>
                  )}
                </div>
                {/* Blood Group Badge */}
                {student.bloodGroup && (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full px-1.5 py-0.5 shadow-sm">
                    {student.bloodGroup}
                  </div>
                )}
              </div>
            </div>
            {/* Right Section - Details */}
            <div className="flex-1 min-w-0">
              {/* School Header */}
              <div className="mb-2">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Student ID Card</h2>
                <h1 className="text-sm font-extrabold text-gray-800 uppercase leading-tight truncate">
                  {schoolDetails.name}
                </h1>
              </div>
              {/* Student Name */}
              <div className="mb-2 pb-1 border-b border-dashed border-gray-200">
                <p className="text-[10px] text-gray-500 font-medium">Student Name</p>
                <p className="text-sm font-bold text-gray-800 truncate">{student.name}</p>
              </div>
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px]">
                <div>
                  <p className="text-gray-500">Admission No</p>
                  <p className="font-semibold text-gray-700 text-[10px]">{student.admissionNo}</p>
                </div>
                <div>
                  <p className="text-gray-500">Roll Number</p>
                  <p className="font-semibold text-gray-700 text-[10px]">{student.rollNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Class</p>
                  <p className="font-semibold text-gray-700 text-[10px]">{student.className} - {student.sectionName}</p>
                </div>
                <div>
                  <p className="text-gray-500">DOB</p>
                  <p className="font-semibold text-gray-700 text-[10px]">{formatDate(student.dob)}</p>
                </div>
              </div>
              {/* Validity */}
              {(student.validFrom || student.validTo) && (
                <div className="mt-2 pt-1 border-t border-dashed border-gray-200">
                  <p className="text-[8px] text-gray-500 text-center">
                    Valid: {student.validFrom || 'Issued'} - {student.validTo || 'Permanent'}
                  </p>
                </div>
              )}
            </div>
            {/* QR Code */}
            <div className="flex-shrink-0 ml-3">
              <div className="bg-white rounded-md p-1 shadow-sm border border-gray-200">
                <QRCode
                  size={45}
                  value={JSON.stringify({
                    id: student.id,
                    name: student.name,
                    admissionNo: student.admissionNo,
                    class: student.className,
                  })}
                />
              </div>
            </div>
          </div>
          {/* Signature */}
          <div className="absolute bottom-1 right-2 text-right">
            <p className="text-[6px] text-gray-400">Authorized Signature</p>
            <div className="w-16 h-6 border-b border-gray-400 mt-0.5" />
          </div>
        </div>

        {/* Back Side */}
       <div
          className="relative h-[540px] w-[340px] overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-xl"
        >

          {/* TOP */}

          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-6 py-5 text-white">

            <h2 className="text-center text-lg font-bold uppercase">
              Student Information
            </h2>

          </div>

          {/* CONTENT */}

          <div className="space-y-5 p-6">

            {/* ADDRESS */}

            <div className="rounded-2xl border bg-gray-50 p-4">

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <MapPin size={16} />

                Address

              </div>

              <p className="text-sm leading-6 text-gray-600">
                {student.address || "-"}
              </p>

            </div>

            {/* CONTACT */}

            <div className="rounded-2xl border bg-gray-50 p-4">

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <Phone size={16} />

                Emergency Contact

              </div>

              <div className="space-y-2 text-sm text-gray-600">

                <p>
                  Father :
                  {" "}
                  {student.fatherPhone || "-"}
                </p>

                <p>
                  Mother :
                  {" "}
                  {student.motherPhone || "-"}
                </p>

                <p>
                  Guardian :
                  {" "}
                  {student.guardianPhone || "-"}
                </p>

              </div>

            </div>

            {/* SCHOOL */}

            <div className="rounded-2xl border bg-gray-50 p-4">

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <GraduationCap size={16} />

                School Details

              </div>

              <div className="space-y-2 text-sm text-gray-600">

                <p>
                  School : Modern Public School
                </p>

                <p>
                  Session :
                  {" "}
                  {student.academicYear}
                </p>

                <p>
                  Medium :
                  {" "}
                  {student.medium || "English"}
                </p>

              </div>

            </div>
            </div>
            </div>


      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          @page {
            size: A4;
            margin: 0.5cm;
          }
          
          .no-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}