import React from "react"
import { useNavigate } from "react-router-dom"
import { FaTimes } from "react-icons/fa"

export default function UserSearchPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar with close button */}
      <div className="flex items-center justify-between p-4 shadow-md bg-white">
        <h1 className="text-lg font-semibold text-primary">Search</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-primary transition"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-primary mb-4">Search for a Patient</h2>
        <input
          type="text"
          placeholder="Search for a patient..."
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-light mb-6"
        />
        <p className="text-center text-gray-500 mt-20">
          Search by <span className="font-medium">Patient Name</span>,{" "}
          <span className="font-medium">Patient ID</span> or{" "}
          <span className="font-medium">Cell Phone</span>
        </p>
      </div>
    </div>
  )
}
