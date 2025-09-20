// import React from 'react'
// import { useForm } from 'react-hook-form'
// import api from '../api/axios'
// import useAuth, { AuthState } from '../stores/authStore'
// import toast from 'react-hot-toast'


// type Form = { email: string; password: string; mfa?: string }


// export default function LoginFacility() {
// const { register, handleSubmit } = useForm<Form>()
// const setAuth = useAuth((s: AuthState) => s.setAuth)
// const incrementFailed = useAuth((s: AuthState) => s.incrementFailed)
// const failedAttempts = useAuth((s: AuthState) => s.failedAttempts)
// const lockoutUntil = useAuth((s: AuthState) => s.lockoutUntil)


// const onSubmit = async (data: Form) => {
// if (lockoutUntil && Date.now() < lockoutUntil) return toast.error('Locked out. Try later.')
// try {
// const res = await api.post('/auth/login/', data)
// // mock returns token and user
// setAuth(res.data.token, res.data.user)
// toast.success('Logged in')
// // redirect based on role
// const role = res.data.user.role
// if (role === 'admin') window.location.href = '/dashboard/admin'
// else window.location.href = role === 'staff' ? '/dashboard/staff' : '/dashboard/admin'
// } catch (e: any) {
// incrementFailed()
// toast.error(e?.response?.data?.detail || 'Invalid credentials')
// }
// }


// return (
// <div className="min-h-screen flex items-center justify-center">
// <div className="w-full max-w-md bg-white p-6 rounded shadow">
// <h2 className="text-2xl mb-4">Facility Login</h2>
// <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
// <input {...register('email', { required: true })} placeholder="Email" className="input" />
// <input {...register('password', { required: true })} placeholder="Password" type="password" className="input" />
// <input {...register('mfa')} placeholder="MFA (if enabled)" className="input" />
// <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={!!lockoutUntil && Date.now() < lockoutUntil}>
// Login
// </button>
// {/* {failedAttempts > 0 && <div className="text-sm text-red-600">Failed attempts: {failedAttempts}</div>} */}
// </form>
// <div className="mt-4 text-sm">
// <a href="#">Forgot password?</a>
// </div>
// </div>
// </div>
// )
// }

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'
import useAuth, { AuthState } from '../stores/authStore'
import toast from 'react-hot-toast'

type Form = { email: string; password: string; mfa?: string }

export default function LoginFacility() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>()
  const setAuth = useAuth((s: AuthState) => s.setAuth)
  const incrementFailed = useAuth((s: AuthState) => s.incrementFailed)
  const failedAttempts = useAuth((s: AuthState) => s.failedAttempts)
  const lockoutUntil = useAuth((s: AuthState) => s.lockoutUntil)

  const [loading, setLoading] = useState(false)

  // If localStorage already has token/user, hydrate Zustand (helps dev)
  useEffect(() => {
    const token = localStorage.getItem('klara_token')
    const userJson = localStorage.getItem('klara_user')
    if (token && userJson) {
      try {
        setAuth(token, JSON.parse(userJson))
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data: Form) => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      return toast.error('Locked out. Try later.')
    }

    setLoading(true)
    try {
      // use developer-login endpoint if MFA provided (your mock expects that)
      const endpoint = data.mfa ? '/auth/developer-login/' : '/auth/login/'
      const res = await api.post(endpoint, data)
      setAuth(res.data.token, res.data.user)
      toast.success('Logged in')

      // redirect based on role
      const role = res.data.user.role
      if (role === 'admin') window.location.href = '/dashboard/admin'
      else if (role === 'staff') window.location.href = '/dashboard/staff'
      else if (role === 'developer') window.location.href = '/dashboard/developer'
      else if (role === 'patient') window.location.href = '/dashboard/patient'
      else window.location.href = '/dashboard'
    } catch (e: any) {
      console.error('Login error', e)
      incrementFailed()
      toast.error(e?.response?.data?.detail || e?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Facility Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            type="email"
            className="input"
          />
          {errors.email && <div className="text-sm text-red-600">{String(errors.email.message)}</div>}

          <input
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            type="password"
            className="input"
          />
          {errors.password && <div className="text-sm text-red-600">{String(errors.password.message)}</div>}

          <input {...register('mfa')} placeholder="MFA (if enabled)" className="input" />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
            disabled={loading || (!!lockoutUntil && Date.now() < lockoutUntil)}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {failedAttempts > 0 && <div className="text-sm text-red-600">Failed attempts: {failedAttempts}</div>}
        </form>

        <div className="mt-4 text-sm">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  )
}
