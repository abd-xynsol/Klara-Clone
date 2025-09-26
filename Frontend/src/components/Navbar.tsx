import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../stores/authStore"
import { FaSearch, FaPlus, FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa"

export default function Navbar() {
  const user = useAuth((s) => s.user)
  const clear = useAuth((s) => s.clearAuth)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (!user) return null

  return (
    <nav className="bg-white shadow-card px-6 py-3 flex justify-between items-center relative">
      {/* Logo */}
      <div
        className="text-xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Klara Health
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Search button */}
        <button
          onClick={() => navigate("/users/search")}
          className="p-2 rounded-full hover:bg-blue-50  transition"
        >
          <FaSearch size={18} />
        </button>

        {/* Add patient */}
        <button
          onClick={() => navigate("/patients/create")}
          className="p-2 rounded-full hover:bg-blue-50  transition"
        >
          <FaPlus size={18} />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white font-semibold"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user.email.charAt(0).toUpperCase()}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-600 border-b">
                {user.email}
              </div>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                onClick={() => navigate("/profile")}
              >
                <FaUser size={14} className="text-primary" /> My Account
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-blue-50 text-sm text-gray-700"
                onClick={() => {
                  clear()
                  window.location.href = "/login/facility"
                }}
              >
                <FaSignOutAlt size={14} className="text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
