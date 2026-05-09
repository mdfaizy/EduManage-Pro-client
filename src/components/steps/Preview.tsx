
import {
  User,
  MapPin,
  BookOpen,
  GraduationCap,
  Heart,
  Edit,
  Printer,
  Download,
  CheckCircle,
  X,
} from "lucide-react";

const PreviewSection = ({
  form,
  years,
  classes,
  sections,
  onEditStep,
}: any) => {

  // ===================================
  // Safe Value
  // ===================================


  const selectedYear =
  years.find(
    (item: any) =>
      String(item.id) ===
      String(form.academicYearId)
  );

const selectedClass =
  classes.find(
    (item: any) =>
      String(item.id) ===
      String(form.classId)
  );

const selectedSection =
  sections.find(
    (item: any) =>
      String(item.id) ===
      String(form.sectionId)
  );
  const safeValue = (
    value: any
  ) => {

    // Empty values

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Not provided";
    }

    // Object safety

    if (
      typeof value === "object"
    ) {

      // React Select option

      if ("label" in value) {
        return value.label;
      }

      if ("value" in value) {
        return value.value;
      }

      return "Not provided";
    }

    return String(value);
  };

  // ===================================
  // Preview Card
  // ===================================

  const PreviewCard = ({
    title,
    icon,
    step,
    children,
  }: any) => (

    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          bg-gray-50
          px-6
          py-4
        "
      >

        <div className="flex items-center space-x-3">

          <div
            className="
              rounded-lg
              bg-indigo-100
              p-2
            "
          >
            {icon}
          </div>

          <h3
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            {title}
          </h3>

        </div>

        <button
          type="button"
          onClick={() =>
            onEditStep(step)
          }
          className="
            flex
            items-center
            space-x-1
            rounded-lg
            border
            border-indigo-200
            px-3
            py-1.5
            text-sm
            font-medium
            text-indigo-600
            transition
            hover:bg-indigo-50
          "
        >

          <Edit className="h-4 w-4" />

          <span>Edit</span>

        </button>

      </div>

      {/* Body */}

      <div className="p-6">
        {children}
      </div>

    </div>
  );

  // ===================================
  // Info Row
  // ===================================

  const InfoRow = ({
    label,
    value,
  }: any) => (

    <div>

      <p
        className="
          mb-1
          text-sm
          font-medium
          text-gray-500
        "
      >
        {label}
      </p>

      <div
        className="
          rounded-lg
          border
          border-gray-200
          bg-gray-50
          px-3
          py-2.5
          text-sm
          font-medium
          text-gray-900
        "
      >
        {safeValue(value)}
      </div>

    </div>
  );

  // ===================================
  // UI
  // ===================================

  return (

    <div className="space-y-6">

      {/* Top */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Review Your Application
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please review all information before final submission.
          </p>

        </div>

        <div className="flex items-center gap-3">

          {/* Print */}

          <button
            type="button"
            onClick={() =>
              window.print()
            }
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >

            <Printer className="h-4 w-4" />

            <span>Print</span>

          </button>

          {/* Download */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >

            <Download className="h-4 w-4" />

            <span>Download</span>

          </button>

        </div>

      </div>

      {/* ===================================
          Personal Information
      =================================== */}

      <PreviewCard
        title="Personal Information"
        icon={
          <User className="h-5 w-5 text-indigo-600" />
        }
        step={1}
      >

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          <InfoRow
            label="Student Name"
            value={form.studentName}
          />

          <InfoRow
            label="Date of Birth"
            value={
              typeof form.dateOfBirth ===
                "string" &&
              form.dateOfBirth
                ? new Date(
                    form.dateOfBirth
                  ).toLocaleDateString()
                : "Not provided"
            }
          />

          <InfoRow
            label="Gender"
            value={form.gender}
          />

          <InfoRow
            label="Blood Group"
            value={form.bloodGroup}
          />

          <InfoRow
            label="Nationality"
            value={form.nationality}
          />

          <InfoRow
            label="Religion"
            value={form.religion}
          />

          <InfoRow
            label="Category / Caste"
            value={form.caste}
          />

          <InfoRow
            label="Aadhar Number"
            value={form.aadharNumber}
          />

        </div>

      </PreviewCard>

      {/* ===================================
          Contact Information
      =================================== */}

      <PreviewCard
        title="Contact Information"
        icon={
          <MapPin className="h-5 w-5 text-indigo-600" />
        }
        step={2}
      >

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* Phone */}

          <InfoRow
            label="Phone Number"
            value={form.phoneNumber}
          />

          <InfoRow
            label="Alternate Phone"
            value={form.alternatePhone}
          />

          <InfoRow
            label="Email Address"
            value={form.email}
          />

          <div className="md:col-span-2 mt-3">
            <h4 className="mb-3 text-base font-semibold text-gray-800">
              Current Address
            </h4>
          </div>

          <div className="md:col-span-2">

            <InfoRow
              label="Address"
              value={form.currentAddress}
            />

          </div>

          <InfoRow
            label="City"
            value={form.currentCity}
          />

          <InfoRow
            label="State"
            value={form.currentState}
          />

          <InfoRow
            label="Pincode"
            value={form.currentPincode}
          />

          {/* Permanent Address */}

          <div className="md:col-span-2 mt-5">
            <h4 className="mb-3 text-base font-semibold text-gray-800">
              Permanent Address
            </h4>
          </div>

          <div className="md:col-span-2">

            <InfoRow
              label="Address"
              value={
                form.sameAsCurrentAddress
                  ? form.currentAddress
                  : form.permanentAddress
              }
            />

          </div>

          <InfoRow
            label="City"
            value={
              form.sameAsCurrentAddress
                ? form.currentCity
                : form.permanentCity
            }
          />

          <InfoRow
            label="State"
            value={
              form.sameAsCurrentAddress
                ? form.currentState
                : form.permanentState
            }
          />

          <InfoRow
            label="Pincode"
            value={
              form.sameAsCurrentAddress
                ? form.currentPincode
                : form.permanentPincode
            }
          />

        </div>

      </PreviewCard>

      {/* ===================================
          Academic Information
      =================================== */}

      <PreviewCard
        title="Academic Information"
        icon={
          <BookOpen className="h-5 w-5 text-indigo-600" />
        }
        step={3}
      >

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          <InfoRow
  label="Academic Year"
  value={
    selectedYear?.name ||
    "Not provided"
  }
/>

<InfoRow
  label="Applying For Class"
  value={
    selectedClass?.name ||
    "Not provided"
  }
/>

<InfoRow
  label="Preferred Section"
  value={
    selectedSection?.name ||
    "Not provided"
  }
/>

          <InfoRow
            label="Admission Type"
            value={form.admissionType}
          />

          <InfoRow
            label="Admission Date"
            value={
              typeof form.admissionDate ===
                "string" &&
              form.admissionDate
                ? new Date(
                    form.admissionDate
                  ).toLocaleDateString()
                : "Not provided"
            }
          />
          <InfoRow
            label="Previous School"
            value={form.previousSchool}
          />
          <InfoRow
            label="Last Attended Class"
            value={form.previousClass}
          />

          <InfoRow
            label="Last Year Percentage"
            value={form.previousPercentage}
          />

        </div>

      </PreviewCard>

      {/* ===================================
          Parent Information
      =================================== */}

      <PreviewCard
        title="Parent / Guardian Information"
        icon={
          <GraduationCap className="h-5 w-5 text-indigo-600" />
        }
        step={4}
      >

        {/* Father */}

        <div className="mb-8">

          <h4
            className="
              mb-4
              text-base
              font-semibold
              text-gray-800
            "
          >
            Father's Details
          </h4>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >

            <InfoRow
              label="Name"
              value={form.fatherName}
            />

            <InfoRow
              label="Occupation"
              value={form.fatherOccupation}
            />

            <InfoRow
              label="Phone Number"
              value={form.fatherPhone}
            />

          </div>

        </div>

        {/* Mother */}

        <div className="mb-8">

          <h4
            className="
              mb-4
              text-base
              font-semibold
              text-gray-800
            "
          >
            Mother's Details
          </h4>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >

            <InfoRow
              label="Name"
              value={form.motherName}
            />

            <InfoRow
              label="Occupation"
              value={form.motherOccupation}
            />

            <InfoRow
              label="Phone Number"
              value={form.motherPhone}
            />

          </div>

        </div>

        {/* Guardian */}

        <div>

          <h4 className="mb-4  text-base
              font-semibold
              text-gray-800
            "
          >
            Guardian Details
          </h4>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >

            <InfoRow
              label="Guardian Name"
              value={form.guardianName}
            />
<InfoRow
              label="Email"
              value={form.guardianEmail}
            />
            <InfoRow
              label="Relation"
              value={form.guardianRelation}
            />

            <InfoRow
              label="Phone Number"
              value={form.guardianPhone}
            />

          </div>

        </div>

      </PreviewCard>

    
      {/* ===================================
          Declaration
      =================================== */}

      <div
        className="
          rounded-xl
          border-l-4
          border-indigo-500
          bg-indigo-50
          p-6
        "
      >

        <p
          className="
            text-sm
            leading-7
            text-gray-700
          "
        >

          <strong>
            Declaration:
          </strong>{" "}

          I hereby declare that the information provided above is true and correct to the best of my knowledge.

        </p>

        <div className="mt-5 flex items-center">

          <input
            type="checkbox"
            id="declaration"
            required
            className="
              h-4
              w-4
              rounded
              border-gray-300
              text-indigo-600
              focus:ring-indigo-500
            "
          />

          <label
            htmlFor="declaration"
            className="
              ml-2
              text-sm
              font-medium
              text-gray-700
            "
          >

            I agree to the declaration

            <span className="ml-1 text-red-500">
              *
            </span>

          </label>

        </div>

      </div>

    </div>
  );
};

export default PreviewSection;

