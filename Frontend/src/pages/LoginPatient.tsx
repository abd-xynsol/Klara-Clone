import React, { useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/axios"
import useAuth from "../stores/authStore"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

type Form = { phone?: string; otp?: string; linkToken?: string }

export default function LoginPatient() {
  const { register, handleSubmit } = useForm<Form>()
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [userId, setUserId] = useState<number | null>(null)
  const setAuth = useAuth((s: { setAuth: any }) => s.setAuth)

  const sendOtp = async (data: Form) => {
    try {
      const res = await api.post("/auth/send-otp/", { phone: data.phone })
      setUserId(res.data.user_id)
      toast.success("OTP sent")
      setStep("verify")
    } catch (e: any) {
      toast.error("Could not send OTP")
    }
  }

  const verifyOtp = async (data: Form) => {
    try {
      const res = await api.post("/auth/verify-otp/", {
        user_id: userId,
        code: data.otp,
      })
      setAuth(res.data.token, res.data.user)
      toast.success("Logged in")
      window.location.href = "/dashboard/patient"
    } catch (e: any) {
      toast.error("Invalid OTP")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-3xl flex bg-white">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-full max-w-md px-10 py-8 mx-auto">
          <h1 className="text-3xl font-extrabold text-black mb-2">Klara</h1>
          <p className="text-gray-600 mb-6">Sign in to Patient Portal</p>

          {step === "phone" && (
            <form onSubmit={handleSubmit(sendOtp)} className="flex flex-col gap-4">
              <input
                {...register("phone", { required: true })}
                placeholder="Your cell phone number"
                className="border rounded-md px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Submit
              </button>
               <a href="#" className="text-sm text-black mt-2 hover:underline">
                I can’t log in
              </a>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleSubmit(verifyOtp)} className="flex flex-col gap-4">
              <input
                {...register("otp", { required: true })}
                placeholder="Enter OTP"
                className="border rounded-md px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>

        {/* Right Side - Social login placeholders */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 border-l bg-white px-8">
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
