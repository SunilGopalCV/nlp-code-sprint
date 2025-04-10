import React from "react";
import { FileText } from "lucide-react";

const TeamList = ({ teams }) => {
  if (teams.length === 0) return null;

  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold mb-3 text-white font-sans">
        Uploaded Teams ({teams.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {teams.map((team, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg shadow 
              ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-blue-800 to-blue-700"
                  : "bg-gradient-to-r from-purple-800 to-purple-700"
              } 
              flex items-center
            `}
          >
            <FileText className="text-gray-400 mr-2 h-4 w-4" />
            <span className="font-medium truncate text-white text-sm font-sans">
              {team.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
