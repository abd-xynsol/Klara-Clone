import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../stores/authStore'


type Props = { children: React.ReactNode; allowed?: string[] }


export default function AuthGuard({ children, allowed }: Props) {
const user = useAuth((s: { user: { role?: string } | null }) => s.user)
if (!user) return <Navigate to="/login/facility" replace />
if (allowed && !allowed.includes(user.role || '')) return <div className="p-6">Access Denied</div>
return <>{children}</>
}