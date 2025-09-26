import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/axios"
import useAuth, { AuthState } from "../stores/authStore"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

type Form = { email: string; password: string; mfa?: string }

export default function LoginFacility() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>()
  const setAuth = useAuth((s: AuthState) => s.setAuth)
  const incrementFailed = useAuth((s: AuthState) => s.incrementFailed)
  const failedAttempts = useAuth((s: AuthState) => s.failedAttempts)
  const lockoutUntil = useAuth((s: AuthState) => s.lockoutUntil)

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
  }, [setAuth])

  const onSubmit = async (data: Form) => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      return toast.error("Locked out. Try later.")
    }

    setLoading(true)
    try {
      let endpoint = "/auth/login/"

      // Use special endpoints for admin or developer
      if (data.email === "admin@klara.test") {
        endpoint = "/auth/admin-login/"
      } else if (data.email === "dev@klara.test") {
        endpoint = "/auth/developer-login/"
      }

      const res = await api.post(endpoint, data)
      const user = res.data.user

      // Admin MFA requirement
      // if (user.role === "admin" && !data.mfa) {
      //   setLoading(false)
      //   return toast.error("MFA is required for admin login.")
      // }

      setAuth(res.data.token, user)
      toast.success("Logged in")

      if (user.role === "admin" || user.role === "staff") {
        window.location.href = "/dashboard"
      } else {
        toast.error("Unauthorized: Only staff or admin can log in here")
      }
    } catch (e: any) {
      console.error("Login error", e)
      incrementFailed()
      toast.error(e?.response?.data?.detail || e?.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg flex">

        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-full max-w-md px-10 py-8 mx-auto">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Klara</h1>
          <p className="text-gray-500 mb-6">Log in to access your account</p>

          {/* Staff / Patient Tabs */}
          <div className="flex gap-6 mb-6 border-b pb-2">
            <Link
              to="/login"
              className="pb-2 border-b-2 border-blue-500 text-blue-600 font-medium"
            >
              Staff
            </Link>
            <Link
              to="/login/patient"
              className="pb-2 text-gray-500 hover:text-blue-600"
            >
              Patient
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email address"
              type="email"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

            {/* <input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
             */}
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="border rounded-md px-4 py-2 w-full focus:ring-1 focus:ring-blue-400 focus:outline-none pr-10"
              />
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}


            <input
              {...register("mfa")}
              placeholder="MFA (Optional)"
              className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading || (!!lockoutUntil && Date.now() < lockoutUntil)}
            >
              {loading ? "Logging in…" : "Log in"}
            </button>

            {failedAttempts > 0 && (
              <p className="mt-2 text-sm text-red-600">
                Failed attempts: {failedAttempts}
              </p>
            )}
          </form>

          <div className="mt-6 text-center">
            <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
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
              Continue with Facebook
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


  // return (
  //   <div className="min-h-screen flex items-center justify-center ">
  //     <div className="w-full max-w-3xl  rounded-lg flex">

  //       {/* Left Side - Form */}
  //       <div className="flex flex-col justify-center w-full max-w-md px-10 py-8 mx-auto">
  //         <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Klara</h1>
  //         <p className="text-gray-500 mb-6">Log in to access your account</p>

  //         {/* Staff / Patient Tabs */}
  //         <div className="flex gap-6 mb-6 border-b pb-2">
  //           <Link
  //             to="/login"
  //             className="pb-2 border-b-2 border-blue-500 text-blue-600 font-medium"
  //           >
  //             Staff
  //           </Link>
  //           <Link
  //             to="/login/patient"
  //             className="pb-2 text-gray-500 hover:text-blue-600"
  //           >
  //             Patient
  //           </Link>
  //         </div>

  //         {/* Form */}
  //         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
  //           <input
  //             {...register("email", { required: "Email is required" })}
  //             placeholder="Email address"
  //             type="email"
  //             className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
  //           />
  //           {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

  //           <input
  //             {...register("password", { required: "Password is required" })}
  //             placeholder="Password"
  //             type="password"
  //             className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
  //           />
  //           {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

  //           <input
  //             {...register("mfa")}
  //             placeholder="MFA (Admins only)"
  //             className="border rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
  //           />

  //           <button
  //             type="submit"
  //             className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
  //             disabled={loading || (!!lockoutUntil && Date.now() < lockoutUntil)}
  //           >
  //             {loading ? "Logging in…" : "Log in"}
  //           </button>

  //           {failedAttempts > 0 && (
  //             <p className="mt-2 text-sm text-red-600">
  //               Failed attempts: {failedAttempts}
  //             </p>
  //           )}
  //         </form>

  //         <div className="mt-6 text-center">
  //           <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
  //             Forgot password?
  //           </Link>
  //         </div>
  //       </div>

  //       {/* Right Side - Social login placeholders */}
  //       <div className="hidden md:flex flex-col justify-center items-center w-1/2 border-l px-8">
  //         <p className="text-gray-600 mb-4">Or continue with</p>
  //         <div className="flex flex-col gap-3 w-full">
  //           <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
  //             Continue with Google
  //           </button>
  //           <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
  //             Continue with Facebook
  //           </button>
  //           <button className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition">
  //             Sign up with Email
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )