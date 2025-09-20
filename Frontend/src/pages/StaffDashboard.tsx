import React from 'react'
import AuthGuard from '../components/AuthGuard'
import Navbar from '../components/Navbar'


export default function StaffDashboard() {
return (
<AuthGuard allowed={["staff"]}>
<div>
<Navbar />
<div className="p-6">Staff Dashboard - patient lists, create patient (placeholders)</div>
</div>
</AuthGuard>
)
}