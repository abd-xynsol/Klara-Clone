
import React from "react"
import AuthGuard from "../components/AuthGuard"
import Navbar from "../components/Navbar"

export default function AdminDashboard() {
    return (
        <AuthGuard allowed={["admin"]}>
            <div className="min-h-screen bg-primary-light">
                <Navbar />

                <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white rounded-2xl shadow-card p-6">
                        <h3 className="text-lg font-semibold text-primary">User Management</h3>
                        <p className="text-sm text-gray-600">Create, edit, and deactivate users.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-card p-6">
                        <h3 className="text-lg font-semibold text-primary">Audit Logs</h3>
                        <p className="text-sm text-gray-600">View system-wide activity history.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-card p-6">
                        <h3 className="text-lg font-semibold text-primary">Reports</h3>
                        <p className="text-sm text-gray-600">Export system usage and performance reports.</p>
                    </div>
                </div>
            </div>
        </AuthGuard>
    )
}

