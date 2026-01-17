import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge"; // Import the new badge component

// Type definition for Feedback (assuming the structure)
interface Feedback {
  overallScore: number;
  toneAndStyle: { score: number };
  content: { score: number };
  structure: { score: number };
  skills: { score: number };
}

function Category({ title, score }: { title: string; score: number }) {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-summary border-t border-gray-50 p-4 first:border-t-0">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row gap-2 items-center justify-center max-md:flex-col items-start">
          {/* Title Paragraph */}
          <p className="text-xl font-semibold text-gray-800 leading-tight">
            {title}
          </p>

          {/* ScoreBadge used right below the title */}
          <ScoreBadge score={score} />
        </div>

        <p className="text-2xl font-bold">
          <span className={textColor}>{score}</span>
          <span className="text-gray-300 text-sm ml-1">/100</span>
        </p>
      </div>
    </div>
  );
}

function Summary({ feedback }: { feedback: Feedback }) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden border border-gray-100">
      <div className="flex flex-row items-center p-6 gap-8 bg-gray-50/50">
        <div className="w-24 h-24">
          <ScoreGauge score={feedback.overallScore} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
}

export default Summary;
