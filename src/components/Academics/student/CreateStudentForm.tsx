"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function StudentAdmissionForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    admissionNo: "",
    name: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    aadhaarNo: "",
    nationality: "",
    religion: "",

    classId: "",
    sectionId: "",
    academicYear: "",
    rollNumber: "",
    admissionDate: "",

    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    phone: "",
    alternatePhone: "",
    parentEmail: "",

    medicalConditions: "",
    allergies: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const update = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border p-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Admission</h1>
          <p className="text-slate-500 text-sm mt-1">
            Register a new student into the school system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* STUDENT IDENTITY */}
          <Section title="Student Identity">
            <Grid>
              <Field label="Admission No *">
                <Input onChange={(e)=>update("admissionNo",e.target.value)} />
              </Field>
              <Field label="Full Name *">
                <Input onChange={(e)=>update("name",e.target.value)} />
              </Field>
              <Field label="Gender *">
                <Select onChange={(e)=>update("gender",e.target.value)} options={["Male","Female"]}/>
              </Field>
              <Field label="Date of Birth *">
                <Input type="date" onChange={(e)=>update("dob",e.target.value)} />
              </Field>
              <Field label="Blood Group">
                <Input onChange={(e)=>update("bloodGroup",e.target.value)} />
              </Field>
              <Field label="Aadhaar No">
                <Input onChange={(e)=>update("aadhaarNo",e.target.value)} />
              </Field>
              <Field label="Nationality">
                <Input onChange={(e)=>update("nationality",e.target.value)} />
              </Field>
              <Field label="Religion">
                <Input onChange={(e)=>update("religion",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* ACADEMIC */}
          <Section title="Academic Details">
            <Grid>
              <Field label="Class *"><Input /></Field>
              <Field label="Section *"><Input /></Field>
              <Field label="Academic Year *"><Input placeholder="2025-26" /></Field>
              <Field label="Roll Number"><Input /></Field>
              <Field label="Admission Date *">
                <Input type="date" onChange={(e)=>update("admissionDate",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* PARENT DETAILS */}
          <Section title="Parent Information">
            <Grid>
              <Field label="Father Name *"><Input onChange={(e)=>update("fatherName",e.target.value)} /></Field>
              <Field label="Mother Name"><Input onChange={(e)=>update("motherName",e.target.value)} /></Field>
              <Field label="Father Occupation"><Input onChange={(e)=>update("fatherOccupation",e.target.value)} /></Field>
              <Field label="Mother Occupation"><Input onChange={(e)=>update("motherOccupation",e.target.value)} /></Field>
              <Field label="Mobile *"><Input onChange={(e)=>update("phone",e.target.value)} /></Field>
              <Field label="Alternate Phone"><Input onChange={(e)=>update("alternatePhone",e.target.value)} /></Field>
              <Field label="Parent Email"><Input type="email" onChange={(e)=>update("parentEmail",e.target.value)} /></Field>
            </Grid>
          </Section>

          {/* HEALTH */}
          <Section title="Health & Medical">
            <Grid>
              <Field label="Medical Conditions">
                <Input onChange={(e)=>update("medicalConditions",e.target.value)} />
              </Field>
              <Field label="Allergies">
                <Input onChange={(e)=>update("allergies",e.target.value)} />
              </Field>
            </Grid>
          </Section>

          {/* ADDRESS */}
          <Section title="Address">
            <Grid>
              <Field label="Address *"><Input onChange={(e)=>update("address",e.target.value)} /></Field>
              <Field label="City"><Input onChange={(e)=>update("city",e.target.value)} /></Field>
              <Field label="State"><Input onChange={(e)=>update("state",e.target.value)} /></Field>
              <Field label="Pincode"><Input onChange={(e)=>update("pincode",e.target.value)} /></Field>
            </Grid>
          </Section>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full h-14 bg-indigo-600 text-white rounded-xl font-semibold flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin"/> : "Submit Admission"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* REUSABLE UI COMPONENTS */

function Section({ title, children }: any) {
  return (
    <section className="border rounded-xl p-6 space-y-6">
      <h2 className="font-semibold text-lg text-slate-800">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: any) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

function Field({ label, children }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full h-11 px-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  );
}

function Select({ options, ...rest }: any) {
  return (
    <select {...rest} className="w-full h-11 px-3 border border-slate-200 rounded-lg">
      <option value="">Select</option>
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  );
}
