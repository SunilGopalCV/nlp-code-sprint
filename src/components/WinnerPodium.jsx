import React, { useState, useEffect } from "react";
import { Trophy, User, Users } from "lucide-react";

const Confetti = () => {
  // Create an array of confetti pieces
  const pieces = Array(50)
    .fill()
    .map((_, i) => (
      <div
        key={i}
        className="confetti-piece absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-20px`,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 2 + 3}s`,
        }}
      />
    ));

  return (
    <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
      {pieces}
    </div>
  );
};

const WinnerPodium = ({ teams }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Start celebration animation when component mounts
    setShowCelebration(true);

    // Hide celebration after 6 seconds
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (teams.length < 2) return null;

  const winner = teams[0];
  const runnerUp = teams[1];

  return (
    <div className="bg-gray-800 rounded-xl relative">
      {showCelebration && <Confetti />}

      <h3 className="text-xl font-bold mb-4 text-white text-center font-mono">
        Final Results
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Winner Card with Animation */}
        <div
          className={`bg-gradient-to-r from-blue-700 to-blue-600 p-4 rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden ${
            showCelebration ? "winner-glow" : ""
          }`}
        >
          {showCelebration && (
            <div className="trophy-shine absolute inset-0 bg-white opacity-0"></div>
          )}
          <Trophy
            className={`text-yellow-400 h-10 w-10 mb-3 ${
              showCelebration ? "animate-bounce" : ""
            }`}
          />
          <h4 className="text-lg font-semibold mb-2 text-white font-sans">
            1st Place
          </h4>
          <p className="text-2xl font-bold text-white font-mono">
            {winner.name}
          </p>
          <div className="mt-2 flex items-center">
            <User className="text-gray-400 h-5 w-5 mr-2" />
            <p className="text-base text-gray-300 font-sans">
              Score:{" "}
              <span className="font-bold text-white">
                {winner.score.toFixed(4)}
              </span>
            </p>
          </div>
          <div className="mt-1 flex flex-col items-center">
            <p className="text-sm text-gray-300 font-sans">
              Fake:{" "}
              <span className="text-blue-300">
                {winner.fakeScore.toFixed(4)}
              </span>
            </p>
            <p className="text-sm text-gray-300 font-sans">
              Hate:{" "}
              <span className="text-blue-300">
                {winner.hateScore.toFixed(4)}
              </span>
            </p>
          </div>
        </div>

        {/* Runner-up Card */}
        <div
          className={`bg-gradient-to-r from-purple-700 to-purple-600 p-4 rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden ${
            showCelebration ? "runner-up-pulse" : ""
          }`}
        >
          <Users className="text-purple-400 h-10 w-10 mb-3" />
          <h4 className="text-lg font-semibold mb-2 text-white font-sans">
            2nd Place
          </h4>
          <p className="text-2xl font-bold text-white font-mono">
            {runnerUp.name}
          </p>
          <div className="mt-2 flex items-center">
            <User className="text-gray-400 h-5 w-5 mr-2" />
            <p className="text-base text-gray-300 font-sans">
              Score:{" "}
              <span className="font-bold text-white">
                {runnerUp.score.toFixed(4)}
              </span>
            </p>
          </div>
          <div className="mt-1 flex flex-col items-center">
            <p className="text-sm text-gray-300 font-sans">
              Fake:{" "}
              <span className="text-purple-300">
                {runnerUp.fakeScore.toFixed(4)}
              </span>
            </p>
            <p className="text-sm text-gray-300 font-sans">
              Hate:{" "}
              <span className="text-purple-300">
                {runnerUp.hateScore.toFixed(4)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* We need to inject styles for the animations */}
      <style jsx="true">{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          animation: confetti-fall 4s ease-in-out forwards;
          border-radius: 50%;
          opacity: 0.8;
        }

        @keyframes winner-glow {
          0%,
          100% {
            box-shadow: 0 0 10px 3px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.8);
          }
        }

        .winner-glow {
          animation: winner-glow 2s infinite;
        }

        @keyframes trophy-shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .trophy-shine {
          animation: trophy-shine 2s ease-in-out infinite;
          transform: skewX(-30deg);
        }

        @keyframes runner-up-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .runner-up-pulse {
          animation: runner-up-pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WinnerPodium;
