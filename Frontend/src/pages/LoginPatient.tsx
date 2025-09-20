import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'
import useAuth from '../stores/authStore'
import toast from 'react-hot-toast'


type Form = { phone?: string; otp?: string; linkToken?: string }


export default function LoginPatient() {
const { register, handleSubmit } = useForm<Form>()
const [step, setStep] = useState<'phone' | 'verify' | 'onboarding'>('phone')
const [userId, setUserId] = useState<number | null>(null)
const setAuth = useAuth((s: { setAuth: any }) => s.setAuth)


const sendOtp = async (data: Form) => {
try {
const res = await api.post('/auth/send-otp/', { phone: data.phone })
setUserId(res.data.user_id)
toast.success('OTP sent')
setStep('verify')
} catch (e: any) {
toast.error('Could not send OTP')
}
}


const verifyOtp = async (data: Form) => {
try {
const res = await api.post('/auth/verify-otp/', { user_id: userId, code: data.otp })
// on success, backend returns token and user
setAuth(res.data.token, res.data.user)
toast.success('Logged in')
window.location.href = '/dashboard/patient'
} catch (e: any) {
toast.error('Invalid OTP')
}
}


return (
<div className="min-h-screen flex items-center justify-center">
<div className="w-full max-w-md bg-white p-6 rounded shadow">
<h2 className="text-2xl mb-4">Patient Login / Onboarding</h2>
{step === 'phone' && (
<form onSubmit={handleSubmit(sendOtp)} className="flex flex-col gap-3">
<input {...register('phone', { required: true })} placeholder="Phone/Email" className="input" />
<button type="submit" className="px-4 py-2 bg-primary text-white rounded">Send OTP</button>
</form>
)}
{step === 'verify' && (
<form onSubmit={handleSubmit(verifyOtp)} className="flex flex-col gap-3">
<input {...register('otp', { required: true })} placeholder="Enter OTP" className="input" />
<button type="submit" className="px-4 py-2 bg-primary text-white rounded">Verify OTP</button>
</form>
)}
</div>
</div>
)
}