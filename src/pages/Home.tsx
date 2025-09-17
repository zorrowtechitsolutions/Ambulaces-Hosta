import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-hostaLight min-h-screen flex flex-col items-center text-center px-4">
      {/* Hero Section */}
      <div className="max-w-3xl py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-hostaGreen mb-6">
          Welcome to Hosta 🚑
        </h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          Hosta is your <span className="font-semibold">Complete Healthcare Companion</span>.
          With Hosta Ambulance Services, we aim to provide quick, reliable, and
          trusted ambulance connections across hospitals and medical facilities.
        </p>
        <p className="text-gray-600 text-md md:text-lg leading-relaxed mb-8">
          Our vision is to bridge the gap between patients and emergency medical
          services. From <span className="font-medium">real-time ambulance availability</span> 
          to <span className="font-medium">secure booking and management</span>,
          Hosta ensures you get medical help when you need it the most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-hostaGreen text-white px-6 py-3 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Register Ambulance
          </Link>
          <Link
            to="/ambulances"
            className="bg-white border border-hostaGreen text-hostaGreen px-6 py-3 rounded-lg shadow hover:bg-hostaGreen hover:text-white transition"
          >
            View Ambulances
          </Link>
        </div>
      </div>
    </div>
  );
}