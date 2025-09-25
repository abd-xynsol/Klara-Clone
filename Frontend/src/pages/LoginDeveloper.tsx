import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'
import useAuth from '../stores/authStore'
import toast from 'react-hot-toast'


type Form = { email: string; password: string; mfa: string }


export default function LoginDeveloper() {
    const { register, handleSubmit } = useForm<Form>()
    const setAuth = useAuth((s: { setAuth: any }) => s.setAuth)


    const onSubmit = async (data: Form) => {
        try {
            const res = await api.post('/auth/developer-login/', data)
            setAuth(res.data.token, res.data.user)
            toast.success('Developer logged in')
            window.location.href = '/dashboard/developer'
        } catch (e: any) {
            toast.error(e?.response?.data?.detail || 'Invalid credentials')
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
                    Developer Login
                </h2><form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input {...register('email', { required: true })} placeholder="Email" className="input" />
                    <input {...register('password', { required: true })} placeholder="Password" type="password" className="input" />
                    <input {...register('mfa', { required: true })} placeholder="MFA (TOTP)" className="input" />
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Login</button>
                </form>
            </div>
        </div>
    )
}