// // frontend/src/UploadLog.jsx
// import React, { useState } from 'react'
// import axios from 'axios'

// const UploadLog = () => {
//   const [file, setFile] = useState(null)
//   const [results, setResults] = useState(null)

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const handleUpload = async () => {
//     if (!file) return alert("Please choose a file")

//     const formData = new FormData()
//     formData.append("logFile", file)

//     try {
//       const response = await axios.post("http://localhost:4000/upload", formData)
//       setResults(response.data)
//     } catch (err) {
//       alert("Upload failed")
//       console.error(err)
//     }
//   }

//   return (
//     <div>
//       <input type="file" accept=".log,.txt" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>

//       {results && (
//         <div style={{ marginTop: '1rem' }}>
//           <h2>Results:</h2>
//           <p>Total Lines: {results.totalLines}</p>
//           <p>Flagged Lines: {results.totalFlagged}</p>
//           <ul>
//             {results.results.map((item, idx) => (
//               <li key={idx}>
//                 <strong>Line {item.lineNumber}</strong>: {item.text} <em>({item.matchedRule})</em>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }

// export default UploadLog
// import React, { useState } from 'react';
// import axios from 'axios';
// import ThreatCard from './components/ThreatCard';

// const UploadLog = () => {
//   const [file, setFile] = useState(null);
//   const [threats, setThreats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setThreats([]);
//     setError('');
//     setSuccess('');
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('log', file); // ✅ This MUST match backend multer field name

//     try {
//       setLoading(true);
//       setError('');
//       setSuccess('');

//       const res = await axios.post('http://localhost:5000/api/upload', formData);
//       setThreats(res.data.threats || []);
//       setSuccess('Log uploaded and scanned successfully');
//     } catch (err) {
//       setError('Failed to upload log');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-page">
//       <h2>Upload Log File</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Scanning...' : 'Upload & Scan'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}

//       <div className="threats-list">
//         {threats.length > 0 && (
//           <>
//             <h3>Detected Threats</h3>
//             {threats.map((threat, idx) => (
//               <ThreatCard key={idx} threat={threat} />
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadLog;
import React, { useState } from 'react';
import axios from 'axios';
import ThreatCard from './components/ThreatCard'; // ✅ ADD THIS

const App = () => {
  const [file, setFile] = useState(null);
  const [threats, setThreats] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('log', file);

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const res = await axios.post('http://localhost:5000/api/upload', formData);
      console.log('Server Response:', res.data); // ✅ Inspect this
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Intrusion Detection System</h1>

      <input
        type="file"
        accept=".log"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Scanning...' : 'Upload and Scan'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}

      <div className="mt-6">
        {threats.length > 0 ? (
          threats.map((threat, idx) => <ThreatCard key={idx} threat={threat} />)
        ) : (
          success && <p className="text-gray-600">No threats detected.</p>
        )}
      </div>
    </div>
  );
};

export default App;




