import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm install lucide-react

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
    { path: "/ambulances", label: "All Ambulances" },
    { path: "/profile", label: "Profile" }, // ✅ added profile link
  ];

  return (
    <nav className="bg-hostaGreen text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">HOSTA Ambulance</h1>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col mt-3 space-y-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}