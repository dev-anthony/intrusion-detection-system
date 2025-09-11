import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/IDS.jpg')" }} // replace with your image
    >
      {/* Overlay for dark tint */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Intrusion Detection System
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Stay ahead of security threats with real-time monitoring and
          intelligent threat detection. Protect your systems from unauthorized
          access and potential breaches.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium shadow-lg transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
