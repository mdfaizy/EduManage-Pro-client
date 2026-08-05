import React from "react"
interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];

  placeholder?: string;

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  className?: string;

  value?: string;

  name: string;

  label?: string;

  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,

  placeholder = "Select option",

  onChange,

  className = "",

  value = "",

  name,

  label,

  required,
}) => {
  return (
    <div>
      {/* Label */}

      {label && (
        <label
          className="
            mb-1
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Select */}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          h-11
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-2.5
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          ${className}
        `}
      >
        {/* Placeholder */}

        <option value="" disabled>
          {placeholder}
        </option>

        {/* Options */}

        {options.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;