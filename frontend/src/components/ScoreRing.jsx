import React from 'react';
import { motion } from 'framer-motion';

const ScoreRing = ({ score, size = 120, strokeWidth = 10, type = 'risk' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'text-green-500';
  if (type === 'risk') {
    if (score > 60) colorClass = 'text-red-500';
    else if (score > 30) colorClass = 'text-yellow-500';
  } else if (type === 'match') {
    if (score > 70) colorClass = 'text-green-500';
    else if (score > 40) colorClass = 'text-yellow-500';
    else colorClass = 'text-red-500';
  } else {
    // default general score (e.g. resume score)
    if (score > 70) colorClass = 'text-green-500';
    else if (score > 40) colorClass = 'text-primary-500';
    else colorClass = 'text-red-500';
  }

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}%</span>
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider translate-y-1">{type}</span>
      </div>
    </div>
  );
};

export default ScoreRing;
