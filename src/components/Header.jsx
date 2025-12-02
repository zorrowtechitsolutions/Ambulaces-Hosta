"use client"

import { useState, useEffect, useRef } from "react"
import { UserCircle, Home, Info, Phone, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useGetAAmbulanceQuery } from "@/app/service/ambulance"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const profileRef = useRef(null)

  const isLoggedIn = !!localStorage.getItem("ambulanceId")

  const { data } = useGetAAmbulanceQuery(localStorage.getItem("ambulanceId"))

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("ambulanceId")
    setShowProfile(false)
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-green-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
              <img src="/app_icon.jpeg" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">HOSTA</h1>
              <p className="text-xs text-white/80">Emergency Response</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-white/80 flex items-center gap-2">
              <Home size={16} /> Home
            </Link>
            <Link to="/about" className="text-white hover:text-white/80 flex items-center gap-2">
              <Info size={16} /> About
            </Link>
            <Link to="/contact" className="text-white hover:text-white/80 flex items-center gap-2">
              <Phone size={16} /> Contact
            </Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg flex items-center gap-2"
                >
                  <UserCircle size={20} />
                  {data?.data?.serviceName}
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{data?.data?.serviceName}</p>
                      <p className="text-xs text-gray-500">{data?.data?.email}</p>
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-3"
                    >
                      <Settings size={16} /> Account Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-3"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button onClick={() => navigate("/sign-in")} variant="ghost" className="text-white cursor-pointer">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/sign-up")} className="bg-green-600 text-white cursor-pointer">
                  Register Service
                </Button>
              </>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-3">
            {isLoggedIn && (
              <button onClick={() => setShowProfile(!showProfile)} className="text-white">
                <UserCircle size={22} />
              </button>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3">
              <Home size={18} className="inline mr-2" /> Home
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3">
              <Info size={18} className="inline mr-2" /> About
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3">
              <Phone size={18} className="inline mr-2" /> Contact
            </Link>

            {!isLoggedIn && (
              <Button onClick={() => navigate("/sign-in")} className="w-full my-3">
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
