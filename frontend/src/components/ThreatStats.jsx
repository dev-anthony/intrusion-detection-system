import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ThreatStats = ({ threats }) => {
  const data = threats.reduce((acc, threat) => {
    const time = threat.time?.split(':')[0] || 'Unknown';
    const existing = acc.find(item => item.name === time);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: time, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-2xl h-full w-full">
      <h3 className="text-xl font-bold mb-4 text-slate-950">Threats Over Time</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatStats;
