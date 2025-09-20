import React from 'react'
import AuthGuard from '../components/AuthGuard'
import Navbar from '../components/Navbar'


export default function AdminDashboard() {
return (
<AuthGuard allowed={["admin"]}>
<div>
<Navbar />
<div className="p-6">Admin Dashboard - user management, exports, audit logs (placeholders)</div>
</div>
</AuthGuard>
)
}