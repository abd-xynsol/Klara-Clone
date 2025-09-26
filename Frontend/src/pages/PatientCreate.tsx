import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaTimes } from "react-icons/fa"

type FormValues = {
  firstName: string
  lastName: string
  displayName: string
  dob: string
  phone: string
}

export default function PatientCreate() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log("New Patient:", data)
    // TODO: connect API
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar with close */}
      <div className="flex items-center justify-between p-4 shadow-md bg-white">
        <h1 className="text-lg font-semibold text-primary">Add Patient</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-primary transition"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 max-w-xl mx-auto w-full"
      >
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />
        <input
          {...register("displayName")}
          placeholder="Display Name"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />
        <input
          {...register("dob")}
          type="date"
          placeholder="Date of Birth"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />
        <input
          {...register("phone")}
          placeholder="Cell Phone Number"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          Add Patient
        </button>
      </form>
    </div>
  )
}
