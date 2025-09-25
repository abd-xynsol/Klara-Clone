import React, { useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/axios"
import useAuth from "../stores/authStore"
import toast from "react-hot-toast"
import pic1 from "../assets/pic1.jpg" // your illustration

type Form = { phone?: string; otp?: string; linkToken?: string }

export default function LoginPatient() {
  const { register, handleSubmit } = useForm<Form>()
  const [step, setStep] = useState<"phone" | "verify" | "onboarding">("phone")
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
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left: Form */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sign in to Patient Portal
          </h2>

          {step === "phone" && (
            <form
              onSubmit={handleSubmit(sendOtp)}
              className="flex flex-col gap-4"
            >
              <label className="text-sm font-medium text-gray-700">
                Cell phone number
              </label>
              <input
                {...register("phone", { required: true })}
                placeholder="Your cell phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                type="submit"
                className="mt-2 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Submit
              </button>
              <a
                href="#"
                className="text-sm text-primary mt-2 hover:underline"
              >
                I can’t log in
              </a>
            </form>
          )}

          {step === "verify" && (
            <form
              onSubmit={handleSubmit(verifyOtp)}
              className="flex flex-col gap-4"
            >
              <label className="text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                {...register("otp", { required: true })}
                placeholder="Enter OTP"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                type="submit"
                className="mt-2 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-whie">
        <img
          src={pic1}
          alt="Patient Illustration"
          className="center"
        />
      </div>
    </div>
  )
}
