import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Logic for Gradient and Icons based on score
  const isHigh = score > 69;
  const isMedium = score > 49;

  const gradientColor = isHigh
    ? "from-green-100"
    : isMedium
      ? "from-yellow-100"
      : "from-red-100";

  const statusIcon = isHigh
    ? "/icons/ats-good.svg" // Assuming you have a good one, or use logic below
    : "/icons/ats-bad.svg";

  return (
    <div
      className={`w-full rounded-2xl p-6 bg-gradient-to-b ${gradientColor} to-white border border-gray-100 shadow-sm`}
    >
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-4">
        <img src={statusIcon} alt="ATS Status" className="w-12 h-12" />
        <h2 className="text-2xl font-bold text-gray-800">
          ATS Score: <span className="text-gray-900">{score}/100</span>
        </h2>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Detailed Analysis
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your Applicant Tracking System (ATS) score reflects how well your
            resume matches industry-standard parsing algorithms. Improving the
            identified areas will increase your visibility to recruiters.
          </p>
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={
                  item.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="icon"
                className="w-5 h-5 mt-0.5"
              />
              <p
                className={`text-sm ${item.type === "good" ? "text-gray-700" : "text-gray-600 font-medium"}`}
              >
                {item.tip}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <p className="pt-4 border-t border-gray-200 text-sm italic text-gray-500 text-center">
          "Small tweaks can lead to big opportunities. Keep refining your
          profile!"
        </p>
      </div>
    </div>
  );
};

export default ATS;
