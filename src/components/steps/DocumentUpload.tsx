// import { Upload, X } from "lucide-react";

// export default function DocumentUpload({ documentKey, label, required, hasDoc, uploadedFile, onFileUpload, onRemove }) {
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileUpload(e.target.files[0], documentKey);
//     }
//   };

//   return (
//     <div className="border-b pb-4">
//       <div className="flex items-start space-x-3">
//         <input
//           type="checkbox"
//           id={`has${documentKey.charAt(0).toUpperCase() + documentKey.slice(1)}`}
//           name={`has${documentKey.charAt(0).toUpperCase() + documentKey.slice(1)}`}
//           checked={hasDoc}
//           onChange={onFileUpload}
//           className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//         />
//         <div className="flex-1">
//           <label htmlFor={`has${documentKey.charAt(0).toUpperCase() + documentKey.slice(1)}`} className="text-sm font-medium text-gray-700">
//             {label} {required && <span className="text-red-500">*</span>}
//           </label>
//           <p className="text-xs text-gray-500">Upload clear scanned copy</p>
//         </div>
//         <div className="flex-shrink-0">
//           <input
//             type="file"
//             id={`file-${documentKey}`}
//             onChange={handleFileChange}
//             className="hidden"
//             accept=".pdf,.jpg,.jpeg,.png"
//           />
//           <button
//             type="button"
//             onClick={() => document.getElementById(`file-${documentKey}`)?.click()}
//             className="flex items-center space-x-1 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50"
//           >
//             <Upload className="w-4 h-4" />
//             <span>Upload</span>
//           </button>
//         </div>
//       </div>
//       {uploadedFile && (
//         <div className="mt-2 ml-7 flex items-center justify-between bg-green-50 p-2 rounded">
//           <span className="text-sm text-green-700 truncate max-w-xs">
//             ✓ {uploadedFile.name}
//           </span>
//           <button
//             type="button"
//             onClick={() => onRemove(documentKey)}
//             className="text-xs text-red-600 hover:text-red-800 flex items-center"
//           >
//             <X className="w-3 h-3 mr-1" />
//             Remove
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import {
  Upload,
  X,
} from "lucide-react";

interface Props {
  documentKey?: string;
  label: string;
  required?: boolean;
  hasDoc?: boolean;
  uploadedFile?: File | null;
  onFileUpload: any;
  onRemove: any;
}

export default function DocumentUpload({
  documentKey = "",
  label,
  required = false,
  hasDoc = false,
  uploadedFile,
  onFileUpload,
  onRemove,
}: Props) {
  // =========================
  // Safe Key
  // =========================

  const formattedKey = documentKey
    ? documentKey.charAt(0).toUpperCase() +
      documentKey.slice(1)
    : "";

  // =========================
  // File Change
  // =========================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target.files &&
      e.target.files[0]
    ) {
      onFileUpload(
        e.target.files[0],
        documentKey
      );
    }
  };

  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Top */}

      <div className="flex items-start gap-3">
        {/* Checkbox */}

        <input
          type="checkbox"
          id={`has${formattedKey}`}
          name={`has${formattedKey}`}
          checked={hasDoc}
          onChange={onFileUpload}
          className="
            mt-1
            h-4
            w-4
            rounded
            border-gray-300
            text-indigo-600
            focus:ring-indigo-500
          "
        />

        {/* Info */}

        <div className="flex-1">
          <label
            htmlFor={`has${formattedKey}`}
            className="
              text-sm
              font-medium
              text-gray-700
              dark:text-gray-300
            "
          >
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>

          <p
            className="
              mt-1
              text-xs
              text-gray-500
            "
          >
            Upload clear scanned copy
          </p>
        </div>

        {/* Upload Button */}

        <div className="shrink-0">
          <input
            type="file"
            id={`file-${documentKey}`}
            onChange={handleFileChange}
            className="hidden"
            accept="
              .pdf,
              .jpg,
              .jpeg,
              .png
            "
          />

          <button
            type="button"
            onClick={() =>
              document
                .getElementById(
                  `file-${documentKey}`
                )
                ?.click()
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-indigo-300
              px-3
              py-2
              text-sm
              font-medium
              text-indigo-600
              transition
              hover:bg-indigo-50
            "
          >
            <Upload className="h-4 w-4" />

            <span>
              Upload
            </span>
          </button>
        </div>
      </div>

      {/* Uploaded File */}

      {uploadedFile && (
        <div
          className="
            mt-3
            ml-7
            flex
            items-center
            justify-between
            rounded-lg
            bg-green-50
            p-3
          "
        >
          <span
            className="
              max-w-xs
              truncate
              text-sm
              text-green-700
            "
          >
            ✓ {uploadedFile.name}
          </span>

          <button
            type="button"
            onClick={() =>
              onRemove(documentKey)
            }
            className="
              inline-flex
              items-center
              text-xs
              font-medium
              text-red-600
              hover:text-red-800
            "
          >
            <X className="mr-1 h-3 w-3" />

            Remove
          </button>
        </div>
      )}
    </div>
  );
}