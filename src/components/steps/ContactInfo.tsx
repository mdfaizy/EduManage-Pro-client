"use client";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

import { steps } from "@/utils/formUtils";

interface Props {
  form: any;

  handleChange: (
    e:
      | React.ChangeEvent<
          HTMLInputElement
        >
      | React.ChangeEvent<
          HTMLTextAreaElement
        >
  ) => void;
}

export default function ContactInfoStep({
  form,
  handleChange,
}: Props) {

  return (

    <div className="space-y-6">

      {/* ====================================
          Header
      ==================================== */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {
              steps[1]
                .description
            }
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-indigo-50
            px-3
            py-1
            text-xs
            font-medium
            text-indigo-600
          "
        >
          Step 2 of 6
        </span>

      </div>

      {/* ====================================
          Contact Information
      ==================================== */}

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <h4
          className="
            mb-5
            text-base
            font-semibold
            text-gray-800
          "
        >
          Contact Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >

          {/* Phone */}

          <div>

            <Label htmlFor="phoneNumber">
              Phone Number
            </Label>

            <div className="relative">

              <Phone
                className="
                  absolute
                  left-3
                  top-3
                  h-5
                  w-5
                  text-gray-400
                "
              />

              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={
                  form.phoneNumber
                }
                onChange={
                  handleChange
                }
                placeholder="Enter phone number"
                className="pl-10"
              />

            </div>

          </div>

          {/* Alternate Phone */}

          <div>

            <Label htmlFor="alternatePhone">
              Alternate Phone
            </Label>

            <div className="relative">

              <Phone
                className="
                  absolute
                  left-3
                  top-3
                  h-5
                  w-5
                  text-gray-400
                "
              />

              <Input
                id="alternatePhone"
                name="alternatePhone"
                value={
                  form.alternatePhone
                }
                onChange={
                  handleChange
                }
                placeholder="Enter alternate phone"
                className="pl-10"
              />

            </div>

          </div>

          {/* Email */}

          <div className="md:col-span-2">

            <Label htmlFor="email">
              Email Address
            </Label>

            <div className="relative">

              <Mail
                className="
                  absolute
                  left-3
                  top-3
                  h-5
                  w-5
                  text-gray-400
                "
              />

              <Input
                type="email"
                id="email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                placeholder="Enter email address"
                className="pl-10"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ====================================
          Current Address
      ==================================== */}

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <div className="flex items-center gap-2 mb-5">

          <MapPin
            className="
              h-5
              w-5
              text-indigo-600
            "
          />

          <h4
            className="
              text-base
              font-semibold
              text-gray-800
            "
          >
            Current Address
          </h4>

        </div>

        <div className="space-y-5">

          {/* Address */}

          <div>

            <Label htmlFor="currentAddress">
              Address
            </Label>

            <textarea
              id="currentAddress"
              name="currentAddress"
              value={
                form.currentAddress
              }
              onChange={
                handleChange
              }
              rows={4}
              placeholder="Enter current address"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

          </div>

          {/* City State Pincode */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-3
            "
          >

            <div>

              <Label htmlFor="currentCity">
                City
              </Label>

              <Input
                id="currentCity"
                name="currentCity"
                value={
                  form.currentCity
                }
                onChange={
                  handleChange
                }
                placeholder="Enter city"
              />

            </div>

            <div>

              <Label htmlFor="currentState">
                State
              </Label>

              <Input
                id="currentState"
                name="currentState"
                value={
                  form.currentState
                }
                onChange={
                  handleChange
                }
                placeholder="Enter state"
              />

            </div>

            <div>

              <Label htmlFor="currentPincode">
                Pincode
              </Label>

              <Input
                id="currentPincode"
                name="currentPincode"
                value={
                  form.currentPincode
                }
                onChange={
                  handleChange
                }
                placeholder="Enter pincode"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ====================================
          Same Address Checkbox
      ==================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <input
          type="checkbox"
          id="sameAsCurrentAddress"
          name="sameAsCurrentAddress"
          checked={
            form.sameAsCurrentAddress
          }
          onChange={
            handleChange
          }
          className="
            h-4
            w-4
            rounded
            border-gray-300
            text-indigo-600
            focus:ring-indigo-500
          "
        />

        <Label
          htmlFor="sameAsCurrentAddress"
          className="mb-0"
        >
          Permanent address same as current
        </Label>

      </div>

      {/* ====================================
          Permanent Address
      ==================================== */}

      {!form.sameAsCurrentAddress && (

        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <div className="flex items-center gap-2 mb-5">

            <MapPin
              className="
                h-5
                w-5
                text-indigo-600
              "
            />

            <h4
              className="
                text-base
                font-semibold
                text-gray-800
              "
            >
              Permanent Address
            </h4>

          </div>

          <div className="space-y-5">

            {/* Address */}

            <div>

              <Label htmlFor="permanentAddress">
                Address
              </Label>

              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={
                  form.permanentAddress
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Enter permanent address"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

            </div>

            {/* City State Pincode */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-3
              "
            >

              <div>

                <Label htmlFor="permanentCity">
                  City
                </Label>

                <Input
                  id="permanentCity"
                  name="permanentCity"
                  value={
                    form.permanentCity
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter city"
                />

              </div>

              <div>

                <Label htmlFor="permanentState">
                  State
                </Label>

                <Input
                  id="permanentState"
                  name="permanentState"
                  value={
                    form.permanentState
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter state"
                />

              </div>

              <div>

                <Label htmlFor="permanentPincode">
                  Pincode
                </Label>

                <Input
                  id="permanentPincode"
                  name="permanentPincode"
                  value={
                    form.permanentPincode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter pincode"
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}