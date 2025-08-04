// // backend/rules.js
// module.exports = [
//   "unauthorized",
//   "failed login",
//   "denied",
//   "attack",
//   "error",
//   "root access",
//   "exploit",
//   "sql injection",
//   "ddos",
//   "suspicious"
// ];
// backend/rules.js
// rules.js
const rules = [
  { pattern: /(\bselect\b|\bdrop\b|\binsert\b).*from/i, type: 'SQL Injection' },
  { pattern: /\/(phpmyadmin|wp-login|admin|cgi-bin)\//i, type: 'Admin Access Probe' },
  { pattern: /(\/etc\/passwd|\/etc\/shadow)/i, type: 'Local File Inclusion' },
  { pattern: /(\?id=\d+%20or%20\d+=\d+)/i, type: 'Encoded SQL Injection' },
  { pattern: /(\?cmd=.*)/i, type: 'Remote Code Execution Attempt' },
  { pattern: /(sqlmap|nmap)/i, type: 'Security Tool Detected' },
  { pattern: /failed login/i, type: 'Brute-force Attempt' },
  { pattern: /unauthorized|denied|forbidden/i, type: 'Unauthorized Access' },
];

export default rules;
