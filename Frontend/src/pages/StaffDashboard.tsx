import React from "react"
import AuthGuard from "../components/AuthGuard"
import Navbar from "../components/Navbar"

export default function StaffDashboard() {
  return (
    <AuthGuard allowed={["staff"]}>
      <div className="min-h-screen bg-primary-light">
        <Navbar />

        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Patient List</h3>
            <p className="text-sm text-gray-600">View and manage registered patients.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Create Patient</h3>
            <p className="text-sm text-gray-600">Register a new patient into the system.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Schedules</h3>
            <p className="text-sm text-gray-600">Organize and view staff schedules.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
