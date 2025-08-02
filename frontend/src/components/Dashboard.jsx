import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#f87171', '#facc15', '#34d399']; // red, yellow, green

const Dashboard = ({ threats }) => {
  if (!threats || threats.length === 0) return null;

  // Pie Data: Severity Breakdown
  const severityCounts = threats.reduce((acc, t) => {
    acc[t.severity] = (acc[t.severity] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(severityCounts).map(([severity, count]) => ({
    name: severity,
    value: count,
  }));

  // Bar Data: Threat Types
  const typeCounts = threats.reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  // Line Data: Threats Over Time
  const timeCounts = threats.reduce((acc, t) => {
    const time = new Date(t.time).toLocaleDateString(); // Simplified to day
    acc[time] = (acc[time] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.entries(timeCounts).map(([time, count]) => ({
    time,
    count,
  }));

  return (
    <div className="mt-12 space-y-12">
      <h2 className="text-2xl font-bold text-gray-800 text-center">📊 Threat Statistics</h2>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Threats by Severity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Most Common Threat Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Threats Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
