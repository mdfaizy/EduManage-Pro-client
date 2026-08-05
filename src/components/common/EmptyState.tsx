import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && (
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-blue-100 blur-2xl opacity-20" />
          <div className="relative rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-center text-sm text-gray-500">
          {description}
        </p>
      )}

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}