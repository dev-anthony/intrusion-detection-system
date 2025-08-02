// // src/components/ThreatCard.jsx
// import React from 'react';
// import './ThreatCard.css';

// const getBadgeClass = (severity) => {
//   if (severity === 'danger') return 'badge badge-danger';
//   if (severity === 'warning') return 'badge badge-warning';
//   return 'badge badge-safe';
// };

// const ThreatCard = ({ threat }) => {
//   const { lineNumber, keyword, message, severity } = threat;

//   return (
//     <div className="threat-card">
//       <div className="threat-header">
//         <span className={getBadgeClass(severity)}>{severity.toUpperCase()}</span>
//         <span className="keyword">{keyword}</span>
//         <span className="line-num">Line {lineNumber}</span>
//       </div>
//       <div className="threat-body">
//         {message}
//       </div>
//     </div>
//   );
// };

// export default ThreatCard;
// import React from 'react';

// const ThreatCard = ({ threat }) => {
//   return (
//     <div className="p-4 bg-white rounded shadow-md mb-4 border border-red-200">
//       <h3 className="font-bold text-lg text-red-600">{threat.type}</h3>
//       <p className="text-gray-700">{threat.description}</p>
//       <p className="text-sm text-gray-500">
//         <strong>Time:</strong> {threat.time}
//       </p>
//       <p className="text-sm text-gray-500">
//         <strong>Severity:</strong> {threat.severity}
//       </p>
//     </div>
//   );
// };

// export default ThreatCard;

import React from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

const severityColors = {
  High: "bg-red-100 text-red-700 border-red-400",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-400",
  Low: "bg-green-100 text-green-700 border-green-400",
};

const ThreatCard = ({ threat }) => {
  
  const severityClass = severityColors[threat.severity] || "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div className="bg-white p-4 rounded-2xl shadow-2xl w-full">
       <h2 className="text-xl font-bold mb-4">Detected Threats</h2>
    <div className={`p-4 rounded-xl shadow-sm border ${severityClass} flex items-start gap-4`}>
      <div className="mt-1">
        <ShieldExclamationIcon className="h-8 w-8 text-red-500" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{threat.type}</h3>
        <p className="text-sm mt-1">{threat.description}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600 mt-2">
          <span><strong>Time:</strong> {threat.time}</span>
          <span><strong>Severity:</strong> {threat.severity}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ThreatCard;


