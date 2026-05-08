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
  onEditStep,
}: any) => {
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
        rounded-lg
        border
        bg-white
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          bg-gray-50
          px-6
          py-4
        "
      >
        <div className="flex items-center space-x-2">
          {icon}

          <h3
            className="
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
            text-sm
            text-indigo-600
            hover:text-indigo-800
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
          text-sm
          text-gray-500
        "
      >
        {label}
      </p>

      <p className="font-medium">
        {value ||
          "Not provided"}
      </p>
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
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-gray-900
          "
        >
          Review Your
          Application
        </h2>

        <div className="flex space-x-2">
          {/* Print */}

          <button
            type="button"
            onClick={() =>
              window.print()
            }
            className="
              flex
              items-center
              space-x-2
              rounded-lg
              border
              border-gray-300
              px-4
              py-2
              text-gray-600
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
              space-x-2
              rounded-lg
              border
              border-gray-300
              px-4
              py-2
              text-gray-600
              hover:bg-gray-50
            "
          >
            <Download className="h-4 w-4" />

            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Description */}

      <p className="text-gray-600">
        Please review all
        information before
        final submission.
      </p>

      {/* ===================================
          Personal Info
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
            gap-4
            md:grid-cols-2
          "
        >
          <InfoRow
            label="Student Name"
            value={
              form.studentName
            }
          />

          <InfoRow
            label="Date of Birth"
            value={
              form.dateOfBirth
                ? new Date(
                    form.dateOfBirth
                  ).toLocaleDateString()
                : null
            }
          />

          <InfoRow
            label="Gender"
            value={form.gender}
          />

          <InfoRow
            label="Blood Group"
            value={
              form.bloodGroup
            }
          />

          <InfoRow
            label="Nationality"
            value={
              form.nationality
            }
          />

          <InfoRow
            label="Religion"
            value={
              form.religion
            }
          />

          <InfoRow
            label="Caste/Category"
            value={form.caste}
          />

          <InfoRow
            label="Aadhar Number"
            value={
              form.aadharNumber
            }
          />
        </div>
      </PreviewCard>

      {/* ===================================
          Contact Info
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
            gap-4
            md:grid-cols-2
          "
        >
          <div className="md:col-span-2">
            <InfoRow
              label="Address"
              value={
                form.address
              }
            />
          </div>

          <InfoRow
            label="City"
            value={form.city}
          />

          <InfoRow
            label="State"
            value={form.state}
          />

          <InfoRow
            label="Pincode"
            value={
              form.pincode
            }
          />

          <InfoRow
            label="Phone Number"
            value={
              form.phoneNumber
            }
          />

          <InfoRow
            label="Alternate Phone"
            value={
              form.alternatePhone
            }
          />

          <div className="md:col-span-2">
            <InfoRow
              label="Email"
              value={form.email}
            />
          </div>
        </div>
      </PreviewCard>

      {/* ===================================
          Academic Info
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
            gap-4
            md:grid-cols-2
          "
        >
          <InfoRow
            label="Academic Year"
            value={
              form.academicYearName
            }
          />

          <InfoRow
            label="Applying For Class"
            value={
              form.className
                ? `Class ${form.className}`
                : null
            }
          />

          <InfoRow
            label="Preferred Section"
            value={
              form.sectionName
            }
          />

          <InfoRow
            label="Previous School"
            value={
              form.previousSchool
            }
          />

          <InfoRow
            label="Last Attended Class"
            value={
              form.previousClass
            }
          />

          <InfoRow
            label="Last Year Percentage"
            value={
              form.previousPercentage
            }
          />
        </div>
      </PreviewCard>

      {/* ===================================
          Parent Info
      =================================== */}

      <PreviewCard
        title="Parent / Guardian Information"
        icon={
          <GraduationCap className="h-5 w-5 text-indigo-600" />
        }
        step={4}
      >
        {/* Father */}

        {(form.fatherName ||
          form.fatherOccupation ||
          form.fatherPhone) && (
          <div className="mb-5">
            <h4
              className="
                mb-2
                font-medium
                text-gray-800
              "
            >
              Father's Details
            </h4>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >
              <InfoRow
                label="Name"
                value={
                  form.fatherName
                }
              />

              <InfoRow
                label="Occupation"
                value={
                  form.fatherOccupation
                }
              />

              <InfoRow
                label="Phone"
                value={
                  form.fatherPhone
                }
              />

              <InfoRow
                label="Email"
                value={
                  form.fatherEmail
                }
              />
            </div>
          </div>
        )}

        {/* Mother */}

        {(form.motherName ||
          form.motherOccupation ||
          form.motherPhone) && (
          <div>
            <h4
              className="
                mb-2
                font-medium
                text-gray-800
              "
            >
              Mother's Details
            </h4>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >
              <InfoRow
                label="Name"
                value={
                  form.motherName
                }
              />

              <InfoRow
                label="Occupation"
                value={
                  form.motherOccupation
                }
              />

              <InfoRow
                label="Phone"
                value={
                  form.motherPhone
                }
              />

              <InfoRow
                label="Email"
                value={
                  form.motherEmail
                }
              />
            </div>
          </div>
        )}
      </PreviewCard>

      {/* ===================================
          Additional Info
      =================================== */}

      <PreviewCard
        title="Additional Information"
        icon={
          <Heart className="h-5 w-5 text-indigo-600" />
        }
        step={5}
      >
        <div className="space-y-4">
          {/* Facilities */}

          <div>
            <h4
              className="
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >
              Facilities Required
            </h4>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {form.transportRequired ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}

                <span className="text-sm text-gray-600">
                  Transport
                  Facility
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {form.hostelRequired ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}

                <span className="text-sm text-gray-600">
                  Hostel
                  Accommodation
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {form.sportsQuota ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}

                <span className="text-sm text-gray-600">
                  Sports Quota
                </span>
              </div>
            </div>
          </div>

          {/* Medical */}

          {(form.medicalConditions ||
            form.allergies) && (
            <div>
              <h4
                className="
                  mb-2
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Medical
                Information
              </h4>

              {form.medicalConditions && (
                <p className="text-sm text-gray-600">
                  <span className="text-gray-500">
                    Conditions:
                  </span>{" "}
                  {
                    form.medicalConditions
                  }
                </p>
              )}

              {form.allergies && (
                <p className="text-sm text-gray-600">
                  <span className="text-gray-500">
                    Allergies:
                  </span>{" "}
                  {
                    form.allergies
                  }
                </p>
              )}
            </div>
          )}
        </div>
      </PreviewCard>

      {/* ===================================
          Declaration
      =================================== */}

      <div
        className="
          rounded-lg
          border-l-4
          border-indigo-500
          bg-indigo-50
          p-6
        "
      >
        <p
          className="
            text-sm
            text-gray-700
          "
        >
          <strong>
            Declaration:
          </strong>{" "}
          I hereby declare
          that the information
          provided above is
          true and correct to
          the best of my
          knowledge.
        </p>

        <div className="mt-4 flex items-center">
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
              text-gray-600
            "
          >
            I agree to the
            declaration{" "}
            <span className="text-red-500">
              *
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;