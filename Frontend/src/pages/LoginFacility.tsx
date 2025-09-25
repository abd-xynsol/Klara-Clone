import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/axios"
import useAuth, { AuthState } from "../stores/authStore"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import pic1 from "../assets/pic1.jpg"


type Form = { email: string; password: string; mfa?: string }

export default function LoginFacility() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>()
  const setAuth = useAuth((s: AuthState) => s.setAuth)
  const incrementFailed = useAuth((s: AuthState) => s.incrementFailed)
  const failedAttempts = useAuth((s: AuthState) => s.failedAttempts)
  const lockoutUntil = useAuth((s: AuthState) => s.lockoutUntil)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("klara_token")
    const userJson = localStorage.getItem("klara_user")
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
      return toast.error("Locked out. Try later.")
    }

    setLoading(true)
    try {
      const res = await api.post("/auth/login/", data)
      const user = res.data.user

      // Require MFA for admin
      if (user.role === "admin" && !data.mfa) {
        setLoading(false)
        return toast.error("MFA is required for admin login.")
      }

      setAuth(res.data.token, user)
      toast.success("Logged in")

      if (user.role === "admin") window.location.href = "/dashboard/admin"
      else if (user.role === "staff") window.location.href = "/dashboard/staff"
      else toast.error("Unauthorized: Only staff or admin can log in here")
    } catch (e: any) {
      console.error("Login error", e)
      incrementFailed()
      toast.error(e?.response?.data?.detail || e?.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full max-w-md px-10 bg-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Klara</h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Sign in to Klara
        </h2>

        <div className="flex gap-6 mb-6 border-b">
          <Link
            to="/login"
            className="pb-2 border-b-2 border-primary text-primary font-medium"
          >
            Staff
          </Link>

          <Link
            to="/login/patient"
            className="pb-2 text-gray-500 hover:text-primary"
          >
            Patient
          </Link>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email address"
            type="email"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            type="password"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary bg-primary-light"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          {/* MFA input (only for admin) */}
          <input
            {...register("mfa")}
            placeholder="MFA (Admins only)"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
            disabled={loading || (!!lockoutUntil && Date.now() < lockoutUntil)}
          >
            {loading ? "Logging in…" : "Sign in"}
          </button>

          {failedAttempts > 0 && (
            <p className="text-sm text-red-600">
              Failed attempts: {failedAttempts}
            </p>
          )}
        </form>

        <div className="mt-6">
          <Link
            to="/reset-password"
            className="text-sm text-primary hover:underline"
          >
            Reset Password
          </Link>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center bg-white">
        <img
          src={pic1}
          alt="Illustration"
          className="center"
        />
      </div>
    </div>
  )
}
