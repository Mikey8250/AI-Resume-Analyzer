import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClass = "";
  let label = "";

  // Dynamic states based on your requirement
  if (score > 70) {
    badgeClass = "bg-green-100 text-green-600 border-green-200";
    label = "Strong";
  } else if (score > 49) {
    badgeClass = "bg-yellow-100 text-yellow-600 border-yellow-200";
    label = "Good Start";
  } else {
    badgeClass = "bg-red-100 text-red-600 border-red-200";
    label = "Need work";
  }

  return (
    <div
      className={`px-2 py-0.5 rounded-full border text-[10px] font-bold w-fit uppercase tracking-wider ${badgeClass}`}
    >
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;
