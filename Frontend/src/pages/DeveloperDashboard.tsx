import React from "react"
import AuthGuard from "../components/AuthGuard"
import Navbar from "../components/Navbar"

export default function DeveloperDashboard() {
  return (
    <AuthGuard allowed={["developer"]}>
      <div className="min-h-screen bg-primary-light">
        <Navbar />

        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">System Logs</h3>
            <p className="text-sm text-gray-600">Inspect server and application logs.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">API Health</h3>
            <p className="text-sm text-gray-600">Monitor API status and response times.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-primary">Sandbox</h3>
            <p className="text-sm text-gray-600">Test integrations in a developer sandbox.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
