import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginFacility from './pages/LoginFacility'
import LoginDeveloper from './pages/LoginDeveloper'
import LoginPatient from './pages/LoginPatient'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import PatientDashboard from './pages/PatientDashboard'
import DeveloperDashboard from './pages/DeveloperDashboard'


export default function Router() {
return (
<Routes>
<Route path="/" element={<Navigate to="/login/facility" replace />} />
<Route path="/login/facility" element={<LoginFacility />} />
<Route path="/login/developer" element={<LoginDeveloper />} />
<Route path="/login/patient" element={<LoginPatient />} />


<Route path="/dashboard/admin" element={<AdminDashboard />} />
<Route path="/dashboard/staff" element={<StaffDashboard />} />
<Route path="/dashboard/patient" element={<PatientDashboard />} />
<Route path="/dashboard/developer" element={<DeveloperDashboard />} />


<Route path="*" element={<div className="p-6">404</div>} />
</Routes>
)
}