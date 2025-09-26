
// import React from "react"
// import AuthGuard from "../components/AuthGuard"
// import Navbar from "../components/Navbar"

// export default function Dashboard() {
//     return (
//             <div className="min-h-screen bg-primary-light">
//                 <Navbar />

//                 <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                     <div className="bg-white rounded-2xl shadow-card p-6">
//                         <h3 className="text-lg font-semibold text-primary">User Management</h3>
//                         <p className="text-sm text-gray-600">Create, edit, and deactivate users.</p>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-card p-6">
//                         <h3 className="text-lg font-semibold text-primary">Audit Logs</h3>
//                         <p className="text-sm text-gray-600">View system-wide activity history.</p>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-card p-6">
//                         <h3 className="text-lg font-semibold text-primary">Reports</h3>
//                         <p className="text-sm text-gray-600">Export system usage and performance reports.</p>
//                     </div>
//                 </div>
//             </div>
//     )
// }

import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import useAuth from "../stores/authStore"
import { useForm } from "react-hook-form"

// Fake placeholders — replace with your API calls later
const fetchPatients = async () => [{ id: 1, name: "John Doe", email: "john@example.com" }]
const fetchAuditLogs = async () => [{ id: 1, action: "User login", timestamp: "2025-09-26" }]

export default function Dashboard() {
  const user = useAuth((s) => s.user)
  const [patients, setPatients] = useState<any[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (user?.role === "staff" || user?.role === "admin") {
      fetchPatients().then(setPatients)
    }
    if (user?.role === "admin") {
      fetchAuditLogs().then(setAuditLogs)
    }
  }, [user])

  const onCreatePatient = (data: any) => {
    console.log("Create patient:", data)
    reset()
  }

  const onGenerateOnboarding = () => {
    console.log("Generate onboarding link...")
  }

  const onExportUsers = () => {
    console.log("Download users CSV/JSON...")
  }

  if (!user) return null // Guarded by AuthRoute in real app

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* Staff Views */}
        {(user.role === "staff" || user.role === "admin") && (
          <div className="space-y-6">
            {/* Patient List */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Patient List</h3>
              <table className="w-full text-sm border">
                <thead className="bg-blue-100 text-left">
                  <tr>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50">
                      <td className="p-2 border">{p.id}</td>
                      <td className="p-2 border">{p.name}</td>
                      <td className="p-2 border">{p.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            

            {/* Generate Onboarding Link */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Generate Onboarding Link</h3>
              <button
                onClick={onGenerateOnboarding}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Generate
              </button>
            </section>
          </div>
        )}

        {/* Admin Views */}
        {user.role === "admin" && (
          <div className="space-y-6">
            {/* User Management */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">User Management</h3>
              <p className="text-gray-600">[Tabs for Create/Edit/Suspend/Delete users go here]</p>
            </section>

            {/* Assign Privileges */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Admin Privileges</h3>
              <p className="text-gray-600">[Assign / Revoke privileges form goes here]</p>
            </section>

            {/* Audit Logs */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Audit Logs</h3>
              <table className="w-full text-sm border">
                <thead className="bg-blue-100 text-left">
                  <tr>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Action</th>
                    <th className="p-2 border">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-blue-50">
                      <td className="p-2 border">{log.id}</td>
                      <td className="p-2 border">{log.action}</td>
                      <td className="p-2 border">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Export Users */}
            <section className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Export Users</h3>
              <button
                onClick={onExportUsers}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Export CSV / JSON
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
