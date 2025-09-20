import React from 'react'
import AuthGuard from '../components/AuthGuard'
import Navbar from '../components/Navbar'


export default function PatientDashboard() {
return (
<AuthGuard allowed={["patient"]}>
<div>
<Navbar />
<div className="p-6">Patient Dashboard - profile, visit history (placeholders)</div>
</div>
</AuthGuard>
)
}