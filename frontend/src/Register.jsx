// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (username && password) {
//       localStorage.setItem("user", JSON.stringify({ username, password }));
//       alert("Registration successful!");
//       navigate("/login");
//     } else {
//       alert("Please fill in all fields");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white shadow-md rounded-2xl p-8 w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
//           className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
//         >
//           Register
//         </button>

//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
// frontend/src/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-blue-700 text-white flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-extrabold mb-6">SECURE ACCESS</h1>
        <p className="text-lg text-center max-w-md">
          Create your account to start monitoring suspicious activity  
          and protecting your infrastructure with our Intrusion Detection Software.
        </p>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex w-full flex-col md:w-1/2 items-center justify-center bg-gray-900">
      <h2 className="text-center font-bold text-2xl mb-2 text-white md:hidden">WELCOME TO OUR INTRUSION DETECTION SYSTEM!</h2>
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-lg rounded-2xl p-8 w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register for IDS
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
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
