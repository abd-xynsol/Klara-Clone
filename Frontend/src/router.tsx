import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginFacility from './pages/LoginFacility'
import LoginDeveloper from './pages/LoginDeveloper'
import LoginPatient from './pages/LoginPatient'
import Dashboard from './pages/Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import DeveloperDashboard from './pages/DeveloperDashboard'
import ResetPassword from './pages/ResetPassword'
import UserSearchPage from './pages/UserSearch'
import PatientCreate from './pages/PatientCreate'
import ProfilePage from './pages/Profile'


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login/facility" replace />} />
            <Route path="/login/facility" element={<LoginFacility />} />
            <Route path="/login/developer" element={<LoginDeveloper />} />
            <Route path="/login/patient" element={<LoginPatient />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/developer" element={<DeveloperDashboard />} />

            {/* User Management */}
            {/* <Route path="/users" element={<UserList />} />
      <Route path="/users/create" element={<UserCreate />} />
      <Route path="/users/bulk-create" element={<UserBulkCreate />} />
      <Route path="/users/:id" element={<UserDetail />} /> */}
            <Route path="/users/search" element={<UserSearchPage />} />

            {/* Patient Management */}
            {/* <Route path="/patients" element={<PatientList />} /> */}
            <Route path="/patients/create" element={<PatientCreate />} />

            {/* Settings */}
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/settings/organization" element={<OrgSettings />} />
            <Route path="/users/privileges" element={<PrivilegeAssignment />} /> */}

            <Route path="*" element={<div className="p-6">404</div>} />
        </Routes>
    )
}





// // Facility pages
// import UserList from "./pages/users/UserList"
// import UserCreate from "./pages/users/UserCreate"
// import UserBulkCreate from "./pages/users/UserBulkCreate"
// import UserDetail from "./pages/users/UserDetail"
// import UserSearch from "./pages/users/UserSearch"

// import PatientList from "./pages/patients/PatientList"
// import PatientCreate from "./pages/patients/PatientCreate"

// import ReportsUsers from "./pages/reports/ReportsUsers"
// import ReportsExport from "./pages/reports/ReportsExport"

// import AuditLogs from "./pages/audit/AuditLogs"

// import Profile from "./pages/settings/Profile"
// import OrgSettings from "./pages/settings/OrgSettings"
// import PrivilegeAssignment from "./pages/settings/PrivilegeAssignment"

// export default function Router() {
//   return (
//     <Routes>
//       {/* Auth */}
//       <Route path="/" element={<Navigate to="/login/facility" replace />} />
//       <Route path="/login/facility" element={<LoginFacility />} />
//       <Route path="/login/developer" element={<LoginDeveloper />} />
//       <Route path="/login/patient" element={<LoginPatient />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       {/* Facility Dashboard */}
//       <Route path="/dashboard" element={<Dashboard />} />

//       {/* User Management */}
//       <Route path="/users" element={<UserList />} />
//       <Route path="/users/create" element={<UserCreate />} />
//       <Route path="/users/bulk-create" element={<UserBulkCreate />} />
//       <Route path="/users/:id" element={<UserDetail />} />
//       <Route path="/users/search" element={<UserSearch />} />

//       {/* Patient Management */}
//       <Route path="/patients" element={<PatientList />} />
//       <Route path="/patients/create" element={<PatientCreate />} />

//       {/* Reports */}
//       <Route path="/reports/users" element={<ReportsUsers />} />
//       <Route path="/reports/export" element={<ReportsExport />} />

//       {/* Audit */}
//       <Route path="/audit/logs" element={<AuditLogs />} />

//       {/* Settings */}
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/settings/organization" element={<OrgSettings />} />
//       <Route path="/users/privileges" element={<PrivilegeAssignment />} />

//       {/* Other Dashboards */}
//       <Route path="/dashboard/patient" element={<PatientDashboard />} />
//       <Route path="/dashboard/developer" element={<DeveloperDashboard />} />

//       {/* Fallback */}
//       <Route path="*" element={<div className="p-6">404 Not Found</div>} />
//     </Routes>
//   )
// }
