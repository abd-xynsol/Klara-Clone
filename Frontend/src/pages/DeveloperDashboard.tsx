import React from 'react'
import AuthGuard from '../components/AuthGuard'
import Navbar from '../components/Navbar'


export default function DeveloperDashboard() {
return (
<AuthGuard allowed={["developer"]}>
<div>
<Navbar />
<div className="p-6">Developer Dashboard - logs & health (placeholders)</div>
</div>
</AuthGuard>
)
}