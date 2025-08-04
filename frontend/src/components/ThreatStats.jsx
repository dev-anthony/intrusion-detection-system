// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Bar,
//   ComposedChart,
// } from 'recharts';

// const ThreatStats = ({ threats }) => {
//   const data = threats.reduce((acc, threat) => {
//     const time = threat.time?.split(':')[0] || 'Unknown';
//     const severity = threat.severity || 'low';
//     const existing = acc.find(item => item.name === time);
//     if (existing) {
//       existing.count += 1;
//     } else {
//       acc.push({ name: time, count: 1, severity });
//     }
//     return acc;
//   }, []);

//   // Dynamic color based on severity
//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'high': return '#dc2626';  // red-600
//       case 'medium': return '#f59e0b'; // amber-500
//       case 'low': return '#10b981'; // emerald-500
//       default: return '#3b82f6'; // blue-500 fallback
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-xl w-full h-full border border-slate-200">
//       <h3 className="text-2xl font-semibold text-slate-800 mb-6">
//         Threats Detected Over Time
//       </h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <ComposedChart
//           data={data}
//           margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
//         >
//           <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" />
//           <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} />
//           <YAxis stroke="#475569" tick={{ fontSize: 12 }} allowDecimals={false} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#0f172a',
//               borderRadius: '8px',
//               border: 'none',
//               color: '#f1f5f9',
//             }}
//             labelStyle={{ color: '#f87171' }}
//             itemStyle={{ color: '#f1f5f9' }}
//           />
//           <Bar dataKey="count" barSize={20} fill="#cbd5e1" radius={[6, 6, 0, 0]} />
//           <Line
//             type="linear" // sharp edges, no curve
//             dataKey="count"
//             stroke="#dc2626"
//             strokeWidth={3}
//             dot={{
//               r: 6,
//               stroke: '#dc2626',
//               strokeWidth: 2,
//               fill: '#fff',
//             }}
//             activeDot={{
//               r: 8,
//               stroke: '#7f1d1d',
//               strokeWidth: 3,
//               fill: '#fff',
//             }}
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ThreatStats;
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  ComposedChart,
} from 'recharts';

const ThreatStats = ({ threats }) => {
  // Step 1: Count how many threats per hour
  const hourlyCount = {};

  threats.forEach(threat => {
    const hour = threat.time?.split(':')[0] || 'Unknown';
    hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
  });

  // Step 2: Generate data for all 24 hours (even if count is 0)
  const data = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return {
      name: hour,
      count: hourlyCount[hour] || 0,
    };
  });

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xl w-full h-full border border-slate-200">
      <h3 className="text-2xl font-semibold text-slate-950 mb-4">
        Threats Stats
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} />
          <YAxis stroke="#475569" tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              border: 'none',
              color: '#f1f5f9',
            }}
            labelStyle={{ color: '#f87171' }}
            itemStyle={{ color: '#f1f5f9' }}
          />
          <Bar dataKey="count" barSize={20} fill="#cbd5e1" radius={[6, 6, 0, 0]} />
          <Line
            type="linear"
            dataKey="count"
            stroke="#dc2626"
            strokeWidth={3}
            dot={{
              r: 6,
              stroke: '#dc2626',
              strokeWidth: 2,
              fill: '#fff',
            }}
            activeDot={{
              r: 8,
              stroke: '#7f1d1d',
              strokeWidth: 3,
              fill: '#fff',
            }}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatStats;
