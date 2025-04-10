// FileUploader.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import * as Papa from "papaparse";

const FileUploader = ({ onFilesUploaded }) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const newTeams = [];

      for (const file of acceptedFiles) {
        const teamName = file.name.replace(".csv", "");

        const results = await new Promise((resolve) => {
          Papa.parse(file, {
            header: true,
            complete: (results) => resolve(results.data),
          });
        });

        newTeams.push({
          name: teamName,
          data: results,
          score: null,
          fakeScore: null,
          hateScore: null,
        });
      }

      if (newTeams.length > 0) {
        onFilesUploaded(newTeams);
      }
    },
    [onFilesUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`mb-4 p-5 border-2 border-dashed ${
        isDragActive
          ? "border-blue-500 bg-blue-900 bg-opacity-30"
          : "border-gray-700 border-opacity-50 bg-gray-800 bg-opacity-30"
      } rounded-lg transition-all duration-200 ease-in-out`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <Upload className="mx-auto h-10 w-10 text-indigo-400" />
        <h3 className="mt-3 text-md font-medium text-gray-200 font-sans">
          Upload Team Submissions
        </h3>
        <p className="mt-1 text-xs text-gray-500 font-sans">
          Drag and drop CSV files or click to browse
        </p>

        <div className="mt-4">
          <button
            type="button"
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sans"
          >
            Select CSV Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
