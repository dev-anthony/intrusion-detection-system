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

    const allowedTypes = ['text/plain', 'application/log'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.log') && !file.name.endsWith('.txt')) {
      setError('Invalid file format. Please upload a .log or .txt file.');
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
      const detected = res.data.threats || [];

      setThreats(detected);

      if (detected.length === 0) {
        setSuccess('Scan complete. No threats found.');
      } else {
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to upload log');
      console.error(err);
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-950 mb-4 text-center sm:text-3xl">
          Intrusion Detection Dashboard
        </h1>
        <p className='text-center text-gray-400 font-medium text-[14px] mb-4 sm:text-[16px]'>
          Upload your log files to be scanned for threats.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
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

        
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
        {success && <p className="text-green-600 font-medium mb-4">{success}</p>}

        {threats.length > 0 && (
            <div>

          <div className="grid grid-cols-1 gap-6 mt-8">
             <div>
              <ThreatStats threats={threats} />
            </div>
            
            <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {threats.map((threat, idx) => (
                <ThreatCard key={idx} threat={threat} />
              ))}
            </div>

           
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default UploadLog;
