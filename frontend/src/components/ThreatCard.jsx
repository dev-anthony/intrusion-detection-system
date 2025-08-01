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
import React from 'react';

const ThreatCard = ({ threat }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md mb-4 border border-red-200">
      <h3 className="font-bold text-lg text-red-600">{threat.type}</h3>
      <p className="text-gray-700">{threat.description}</p>
      <p className="text-sm text-gray-500">
        <strong>Time:</strong> {threat.time}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Severity:</strong> {threat.severity}
      </p>
    </div>
  );
};

export default ThreatCard;
