import React from "react"
import AuthGuard from "../components/AuthGuard"
import Navbar from "../components/Navbar"

export default function PatientDashboard() {
  return (
    <AuthGuard allowed={["patient"]}>
      <div className="min-h-screen bg-primary-light">
        <Navbar />

        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">My Profile</h3>
            <p className="text-sm text-gray-600">Update your personal information.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Visit History</h3>
            <p className="text-sm text-gray-600">View your past appointments and notes.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Upcoming Appointments</h3>
            <p className="text-sm text-gray-600">Check upcoming visits with doctors.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
