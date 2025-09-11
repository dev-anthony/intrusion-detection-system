// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser && storedUser.username === username && storedUser.password === password) {
//       alert("Login successful!");
//       navigate("/home");
//     } else {
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-md rounded-2xl p-8 w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login to IDS</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-center">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
// frontend/src/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-blue-700 text-white flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-extrabold mb-6">INTRUSION<br />DETECTION SYSTEM</h1>
        <p className="text-lg text-center max-w-md">
          Protect your network from malicious activities.  
          Stay ahead of security threats with real-time monitoring  
          and smart detection technology.
        </p>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex w-full flex-col md:w-1/2 items-center justify-center bg-gray-900">
      <h2 className="text-center font-bold text-2xl mb-2 text-white md:hidden">WELCOME TO OUR INTRUSION DETECTION SYSTEM!</h2>
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-2xl p-8 w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login to IDS
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
