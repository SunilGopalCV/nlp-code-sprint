import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FileUploader from "./components/FileUploader";
import TeamList from "./components/TeamList";
import ScoreBoard from "./components/ScoreBoard";
import {
  calculateMacroF1,
  ANSWER_KEY,
  loadAnswerKey,
} from "./utils/scoreCalculator";

function App() {
  const [teams, setTeams] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [answerKey, setAnswerKey] = useState(ANSWER_KEY);
  const [answerKeyLoaded, setAnswerKeyLoaded] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);

  useEffect(() => {
    async function fetchAnswerKey() {
      const loadedKey = await loadAnswerKey();
      if (Object.keys(loadedKey).length > 0) {
        setAnswerKey(loadedKey);
        setAnswerKeyLoaded(true);
      } else if (
        Object.keys(ANSWER_KEY).length > 0 &&
        ANSWER_KEY.Fake.length > 0 &&
        ANSWER_KEY.Hate.length > 0
      ) {
        setAnswerKey(ANSWER_KEY);
        setAnswerKeyLoaded(true);
      }
    }
    fetchAnswerKey();
  }, []);

  const handleFilesUploaded = (newTeams) => {
    setTeams([...teams, ...newTeams]);
    setFilesUploaded(true);
  };

  const calculateScores = () => {
    if (teams.length === 0) return;
    if (!answerKeyLoaded) {
      alert("Answer key not loaded yet. Please try again in a moment.");
      return;
    }
    setIsCalculating(true);
    setIsComplete(false);
    setCurrentTeamIndex(0);
    const updatedTeams = [...teams];
    setTimeout(() => processNextTeam(updatedTeams, 0), 500);
  };

  const processNextTeam = (updatedTeams, index) => {
    if (index >= updatedTeams.length) {
      setIsCalculating(false);
      setIsComplete(true);
      return;
    }
    setCurrentTeamIndex(index);
    const team = updatedTeams[index];
    const teamData = team.data;
    const fakePreds = teamData.map((row) => parseInt(row.Fake));
    const hatePreds = teamData.map((row) => parseInt(row.Hate));
    const f1_fake = calculateMacroF1(answerKey.Fake, fakePreds);
    const f1_hate = calculateMacroF1(answerKey.Hate, hatePreds);
    const combined_f1 = (f1_fake + f1_hate) / 2;
    team.fakeScore = f1_fake;
    team.hateScore = f1_hate;
    team.score = combined_f1;
    updatedTeams.sort((a, b) => (b.score || 0) - (a.score || 0));
    setTeams([...updatedTeams]);
    setTimeout(() => processNextTeam(updatedTeams, index + 1), 1000);
  };

  const resetCompetition = () => {
    setTeams([]);
    setIsCalculating(false);
    setIsComplete(false);
    setCurrentTeamIndex(0);
    setFilesUploaded(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - File Upload and Team Controls */}
        <div className="w-full md:w-1/3 p-4 flex flex-col overflow-auto">
          {!answerKeyLoaded && (
            <div className="mb-4 p-4 bg-yellow-900 border border-yellow-800 rounded-md">
              <p className="text-yellow-400 font-sans">
                Loading answer key from public directory...
              </p>
            </div>
          )}

          {!filesUploaded && (
            <FileUploader onFilesUploaded={handleFilesUploaded} />
          )}

          <div className="mt-auto mb-4 flex flex-wrap gap-3">
            <button
              onClick={calculateScores}
              disabled={teams.length === 0 || isCalculating || !answerKeyLoaded}
              className={`px-4 py-2 rounded-md font-medium text-white shadow-md font-sans ${
                teams.length === 0 || isCalculating || !answerKeyLoaded
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              }`}
            >
              Find the Winner!
            </button>
            <button
              onClick={resetCompetition}
              className="px-4 py-2 bg-gray-700 rounded-md font-medium text-gray-300 hover:bg-gray-600 shadow-md font-sans"
            >
              Reset Competition
            </button>
          </div>

          <TeamList teams={teams} />
        </div>

        {/* Right Side - Scoreboard */}
        <div className="w-full md:w-2/3 p-4 overflow-auto border-t md:border-t-0 md:border-l border-gray-700">
          <ScoreBoard
            teams={teams}
            isCalculating={isCalculating}
            isComplete={isComplete}
            currentTeamIndex={currentTeamIndex}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
