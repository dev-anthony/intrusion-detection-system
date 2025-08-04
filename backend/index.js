// // backend/index.js
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const rules = require("./rules");

// const app = express();
// app.use(cors());

// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.single("log"), (req, res) => {
//   const filePath = req.file.path;
//   const flaggedLines = [];

//   const lines = fs.readFileSync(filePath, "utf-8").split("\n");

//   lines.forEach((line, index) => {
//     rules.forEach(rule => {
//       if (line.toLowerCase().includes(rule)) {
//         flaggedLines.push({
//           lineNumber: index + 1,
//           text: line.trim(),
//           matchedRule: rule
//         });
//       }
//     });
//   });

//   res.json({
//     totalLines: lines.length,
//     totalFlagged: flaggedLines.length,
//     results: flaggedLines
//   });
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
// import express from 'express';
// import cors from 'cors';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => cb(null, file.originalname),
// });
// const upload = multer({ storage });

// app.post('/api/upload', upload.single('log'), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//   const filePath = path.join('./uploads', req.file.filename);

//   fs.readFile(filePath, 'utf-8', (err, data) => {
//     if (err) return res.status(500).json({ message: 'Error reading file' });

//     const threats = [];
//     const lines = data.split('\n');
//     lines.forEach((line) => {
//       if (line.toLowerCase().includes('attack') || line.toLowerCase().includes('unauthorized')) {
//         threats.push({
//           type: 'Threat',
//           description: line.trim(),
//           time: new Date().toLocaleTimeString(),
//           severity: 'High',
//         });
//       }
//     });

//     res.json({ threats });
//   });
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));
// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // File upload config
// const upload = multer({ dest: 'uploads/' });

// app.post('/api/upload', upload.single('log'), (req, res) => {
//   const logPath = req.file.path;

//   fs.readFile(logPath, 'utf-8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read log file' });
//     }

//     // Very simple pattern-based detection
//     const patterns = [
//       { keyword: 'Failed login', type: 'Brute-force Attempt' },
//       { keyword: 'DROP TABLE', type: 'SQL Injection - Drop Table' },
//       { keyword: 'SELECT * FROM', type: 'SQL Injection - Data Fetch' },
//       { keyword: 'nmap', type: 'Port Scanning Detected' },
//       { keyword: 'sqlmap', type: 'SQL Injection Tool Detected' }
//     ];

//     const results = [];

//     data.split('\n').forEach((line, index) => {
//       patterns.forEach((pattern) => {
//         if (line.includes(pattern.keyword)) {
//           results.push({
//             line: index + 1,
//             content: line.trim(),
//             issue: pattern.type
//           });
//         }
//       });
//     });

//     // Clean up file after scan
//     fs.unlink(logPath, () => {});

//     res.json({
//       message: 'Log uploaded and scanned successfully',
//       alerts: results.length ? results : 'No suspicious activity found.'
//     });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// backend/index.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import rules from './rules.js'; // adjusted import if using ES Modules

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('log'), (req, res) => {
  const logPath = req.file.path;

  fs.readFile(logPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Failed to read log file' });

    const results = [];
    const lines = data.split('\n');

    lines.forEach((line, index) => {
      rules.forEach(({ pattern, type }) => {
        if (pattern.test(line)) {
          results.push({
            line: index + 1,
            type,
            description: line.trim(),
            time: new Date().toLocaleTimeString(),
            severity: type.toLowerCase().includes('sql') || type.includes('Code') ? 'High' : 'Medium',
          });
        }
      });
    });

    fs.unlink(logPath, () => {}); // Cleanup
    res.json({ threats: results });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
