import React from 'react'
import useAuth from '../stores/authStore'


// export default function Navbar() {
// const user = useAuth((s) => s.user)
// const clear = useAuth((s) => s.clearAuth)
// return (
// <nav className="bg-white p-4 shadow flex justify-between items-center">
// <div className="text-lg font-semibold">Klara Clone</div>
// <div className="flex items-center gap-4">
// {user && <div className="text-sm">{user.email} — {user.role}</div>}
// <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => { clear(); window.location.href='/login/facility' }}>
// Logout
// </button>
// </div>
// </nav>
// )
// }

export default function Navbar() {
  const user = useAuth((s) => s.user)
  const clear = useAuth((s) => s.clearAuth)

  return (
    <nav className="bg-white shadow-card px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-primary">Klara Health</div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-gray-600">
            {user.email} — <span className="font-medium text-primary">{user.role}</span>
          </div>
        )}
        <button
          className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          onClick={() => {
            clear()
            window.location.href = "/login/facility"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
