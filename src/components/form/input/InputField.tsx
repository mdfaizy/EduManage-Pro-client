
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean;
  error?: boolean;
  hint?: string;
  // type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  // id?: string;
  // name?: string;
  // placeholder?: string;
  // defaultValue?: string | number;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // className?: string;
  // min?: string;
  // max?: string;
  // step?: number;
  // disabled?: boolean;
  // success?: boolean;
  // error?: boolean;
  // hint?: string; // Optional hint text
  // value?:string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", success, error, hint, ...props }, ref) => {
    let inputClasses = `h-11 w-full rounded-lg border px-4 py-2.5 text-sm 
    placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${className}`;

    if (error) {
      inputClasses += " border-red-500 focus:ring-red-500/10";
    } else if (success) {
      inputClasses += " border-green-500 focus:ring-green-500/10";
    } else {
      inputClasses += " border-gray-300 focus:ring-emerald-500/10";
    }

    return (
      <div className="relative">
        <input ref={ref} className={inputClasses} {...props} />

        {hint && (
          <p className={`mt-1.5 text-xs ${error ? "text-red-500" : "text-gray-500"}`}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
