// frontend/src/App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UploadLog from "./UploadLog";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Show the actual Home component at "/" */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UploadLog />} />
      </Routes>
    </Router>
  );
}
