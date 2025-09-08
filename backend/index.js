
// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import fs from 'fs';
// import path from 'path';
// import rules from './rules.js'; // adjusted import if using ES Modules

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const upload = multer({ dest: 'uploads/' });

// app.post('/api/upload', upload.single('log'), (req, res) => {
//   const logPath = req.file.path;

//   fs.readFile(logPath, 'utf-8', (err, data) => {
//     if (err) return res.status(500).json({ message: 'Failed to read log file' });

//     const results = [];
//     const lines = data.split('\n');

//     lines.forEach((line, index) => {
//       rules.forEach(({ pattern, type }) => {
//         if (pattern.test(line)) {
//           results.push({
//             line: index + 1,
//             type,
//             description: line.trim(),
//             time: new Date().toLocaleTimeString(),
//             severity: type.toLowerCase().includes('sql') || type.includes('Code') ? 'High' : 'Medium',
//           });
//         }
//       });
//     });

//     fs.unlink(logPath, () => {}); // Cleanup
//     res.json({ threats: results });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rules from './rules.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Helpers for dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// File upload
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
            severity: type.toLowerCase().includes('sql') || type.includes('Code')
              ? 'High'
              : 'Medium',
          });
        }
      });
    });

    fs.unlink(logPath, () => {}); // cleanup
    res.json({ threats: results });
  });
});

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
