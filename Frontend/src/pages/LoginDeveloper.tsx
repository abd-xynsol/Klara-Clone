// import React from 'react'
// import { useForm } from 'react-hook-form'
// import api from '../api/axios'
// import useAuth from '../stores/authStore'
// import toast from 'react-hot-toast'


// type Form = { email: string; password: string; mfa: string }


// export default function LoginDeveloper() {
//     const { register, handleSubmit } = useForm<Form>()
//     const setAuth = useAuth((s: { setAuth: any }) => s.setAuth)


//     const onSubmit = async (data: Form) => {
//         try {
//             const res = await api.post('/auth/developer-login/', data)
//             setAuth(res.data.token, res.data.user)
//             toast.success('Developer logged in')
//             window.location.href = '/dashboard/developer'
//         } catch (e: any) {
//             toast.error(e?.response?.data?.detail || 'Invalid credentials')
//         }
//     }


//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="w-full max-w-md bg-white p-6 rounded shadow">
//                 <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
//                     Developer Login
//                 </h2><form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
//                     <input {...register('email', { required: true })} placeholder="Email" className="input" />
//                     <input {...register('password', { required: true })} placeholder="Password" type="password" className="input" />
//                     <input {...register('mfa', { required: true })} placeholder="MFA (TOTP)" className="input" />
//                     <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Login</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

import React from "react"
import { useForm } from "react-hook-form"
import api from "../api/axios"
import useAuth from "../stores/authStore"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

type Form = { email: string; password: string; mfa: string }

export default function LoginDeveloper() {
  const { register, handleSubmit } = useForm<Form>()
  const setAuth = useAuth((s: { setAuth: any }) => s.setAuth)

  const onSubmit = async (data: Form) => {
    try {
      const res = await api.post("/auth/developer-login/", data)
      setAuth(res.data.token, res.data.user)
      toast.success("Developer logged in")
      window.location.href = "/dashboard/developer"
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || "Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg flex">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-full max-w-md px-10 py-8 mx-auto">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
            Developer Login
          </h1>
          <p className="text-gray-500 mb-6">Log in with your developer account</p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />

            <input
              {...register("password", { required: true })}
              placeholder="Password"
              type="password"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />

            <input
              {...register("mfa", { required: true })}
              placeholder="MFA"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/help"
              className="text-sm text-blue-600 hover:underline"
            >
              Can’t log in?
            </Link>
          </div>
        </div>

        {/* Right Side - Social login placeholders */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 border-l bg-blue-50 px-8">
          <p className="text-gray-600 mb-4">Or continue with</p>
          <div className="flex flex-col gap-3 w-full">
            <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
              Continue with GitHub
            </button>
            <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
              Sign up with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
