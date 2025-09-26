import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaTimes, FaCamera } from "react-icons/fa"

type FormValues = {
  firstName: string
  lastName: string
  displayName: string
  role: string
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormValues>()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const onSubmit = (data: FormValues) => {
    console.log("Profile Updated:", data)
    // TODO: connect API
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0])
      setProfileImage(file)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar with close */}
      <div className="flex items-center justify-between p-4 shadow-md bg-white">
        <h1 className="text-lg font-semibold text-primary">My Account</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-primary transition"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 max-w-xl mx-auto w-full"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <label className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FaCamera size={20} />
                <span className="text-xs mt-1">Your profile picture</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form Fields */}
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
          placeholder="Display my name as"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light"
        />

        {/* Role Dropdown */}
        <select
          {...register("role")}
          defaultValue="Biller"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-primary-light "
        >
          <option value="Biller">Biller</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
        </select>

        {/* Update Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
        >
          Update
        </button>
      </form>
    </div>
  )
}
