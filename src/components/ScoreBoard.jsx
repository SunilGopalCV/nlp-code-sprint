import React from "react";
import { Award, AlertCircle } from "lucide-react";
import WinnerPodium from "./WinnerPodium";

const ScoreBoard = ({ teams, isCalculating, isComplete, currentTeamIndex }) => {
  if (teams.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow text-center border border-gray-700 border-opacity-50 h-full flex flex-col justify-center items-center">
        <AlertCircle className="h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-white font-sans">
          No Teams Uploaded
        </h3>
        <p className="mt-1 text-gray-400 font-sans">
          Upload team submissions to start the competition
        </p>
      </div>
    );
  }

  if (!teams.some((t) => t.score !== null) && !isCalculating) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow text-center border border-gray-700 border-opacity-50 h-full flex flex-col justify-center items-center">
        <AlertCircle className="h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-white font-sans">
          Ready to Calculate
        </h3>
        <p className="mt-1 text-gray-400 font-sans">
          Click "Find the Winner!" to calculate scores
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 border-opacity-50 h-full flex flex-col">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-3">
        <h2 className="text-xl font-bold text-white flex items-center font-mono">
          <Award className="mr-2" /> Competition Scoreboard
        </h2>
      </div>

      {isCalculating && (
        <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
          <div className="flex items-center mb-2">
            <div className="animate-pulse mr-2 h-3 w-3 bg-blue-500 rounded-full"></div>
            <p className="text-blue-400 font-medium font-sans">
              Calculating scores... ({currentTeamIndex + 1}/{teams.length})
            </p>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentTeamIndex + 1) / teams.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col overflow-hidden">
        {isComplete && teams.length >= 2 && (
          <div className="p-4">
            <WinnerPodium teams={teams} />
          </div>
        )}

        <div className="overflow-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider font-sans"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider font-sans"
                >
                  Team
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider font-sans"
                >
                  Fake
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider font-sans"
                >
                  Hate
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider font-sans"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {teams.map((team, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-500 ease-in-out ${
                    index === 0 && isComplete
                      ? "bg-gradient-to-r from-yellow-900 to-yellow-800 bg-opacity-50"
                      : ""
                  } ${
                    index === 1 && isComplete
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 bg-opacity-50"
                      : ""
                  } ${
                    index === 2 && isComplete
                      ? "bg-gradient-to-r from-orange-800 to-orange-700 bg-opacity-50"
                      : ""
                  } ${
                    isCalculating && index === currentTeamIndex
                      ? "bg-blue-900 bg-opacity-50"
                      : ""
                  }`}
                >
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-300 font-sans">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300 font-sans">
                    <span
                      className={`font-medium ${
                        index < 3 && isComplete ? "font-bold" : ""
                      }`}
                    >
                      {team.name}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-400 font-sans">
                    {team.fakeScore !== null ? team.fakeScore.toFixed(4) : "-"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-400 font-sans">
                    {team.hateScore !== null ? team.hateScore.toFixed(4) : "-"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium font-sans">
                    {team.score !== null ? (
                      <span
                        className={`
                          ${
                            index === 0 && isComplete
                              ? "text-yellow-300 font-bold"
                              : ""
                          }
                          ${
                            index === 1 && isComplete
                              ? "text-gray-300 font-semibold"
                              : ""
                          }
                          ${
                            index === 2 && isComplete
                              ? "text-orange-300 font-semibold"
                              : ""
                          }
                          ${index > 2 || !isComplete ? "text-gray-300" : ""}
                        `}
                      >
                        {team.score.toFixed(4)}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
