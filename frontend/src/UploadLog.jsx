import React, { useState } from 'react';
import axios from 'axios';
import ThreatCard from './components/ThreatCard';
import ThreatStats from './components/ThreatStats';

const UploadLog = () => {
  const [file, setFile] = useState(null);
  const [threats, setThreats] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a log file');
      return;
    }

    const formData = new FormData();
    formData.append('log', file);

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      setThreats([]);

      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setThreats(res.data.threats || []);
      setSuccess('Log uploaded and scanned successfully');
    } catch (err) {
      setError('Failed to upload log');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-950 mb-4 text-center sm:text-3xl">
          Intrusion Detection Dashboard
        </h1>
        <p className='text-center text-gray-400 font-medium text-[14px] mb-4 sm:text-[16px]'>Upload your log files to be scanned for threats.</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="file"
            accept=".log,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full sm:w-auto border border-gray-500 rounded px-4 py-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Upload & Scan'}
          </button>
        </div>

        {/* Feedback */}
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
        {/* {success && <p className="text-green-600 font-medium mb-4">{success}</p>} */}

        {threats.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Left: Threat Cards */}
            <div className="space-y-4">
              {threats.map((threat, idx) => (
                <ThreatCard key={idx} threat={threat} />
              ))}
            </div>

            <div>
              <ThreatStats threats={threats} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadLog;
