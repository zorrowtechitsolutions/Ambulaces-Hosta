"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Ambulance, 
  Save, 
  Edit, 
  Loader2, 
  Trash2,
  AlertCircle 
} from "lucide-react"

import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteAmbulanceMutation, useGetAAmbulanceQuery, useUpdateAmbulanceMutation } from "@/app/service/ambulance"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: "",
    address: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    vehicleType: ""
  })

  const ambulanceId = localStorage.getItem("ambulanceId")
  
  const { 
    data,
    isLoading, 
    error,
    refetch
  } = useGetAAmbulanceQuery(ambulanceId)

  const [updateAmbulance, { isLoading: isUpdating }] = useUpdateAmbulanceMutation()
  const [deleteAmbulance, { isLoading: isDeleting }] =   useDeleteAmbulanceMutation()

  const vehicleTypes = [
    { value: "van", label: "Ambulance Van" },
    { value: "suv", label: "SUV Ambulance" },
    { value: "motorcycle", label: "Motorcycle Ambulance" },
    { value: "air", label: "Air Ambulance" },
    { value: "icu", label: "ICU Ambulance" },
    { value: "basic", label: "Basic Life Support" }
  ]

  // Set form data when data loads
  useEffect(() => {
    if (data?.data) {
      setFormData({
        serviceName: data.data.serviceName || "",
        address: data.data.address || "",
        latitude: data.data.latitude || "",
        longitude: data.data.longitude || "",
        phone: data.data.phone || "",
        email: data.data.email || "",
        vehicleType: data.data.vehicleType || "van"
      })
    }
  }, [data?.data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      const result = await updateAmbulance({
        id: ambulanceId,
        updateAmbulance: formData
      }).unwrap()

      if (result.status == 200) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
        refetch() // Refresh the data
      } else {
        toast.error(result.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error(error?.data?.message || "An error occurred while updating profile")
    }
  }

  const handleCancel = () => {
    // Reset form data to original values
    if (data?.data) {
      setFormData({
        serviceName: data.data.serviceName || "",
        address: data.data.address || "",
        latitude: data.data.latitude || "",
        longitude: data.data.longitude || "",
        phone: data.data.phone || "",
        email: data.data.email || "",
        vehicleType: data.data.vehicleType || "van"
      })
    }
    setIsEditing(false)
  }

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteAmbulance(ambulanceId).unwrap()
      
      if (result.status === 200) {
        toast.success("Account deleted successfully!")
        
        // Clear localStorage and redirect to login/home page
        localStorage.removeItem("ambulanceId")
        localStorage.removeItem("token") // If you have token storage
        
        // Redirect to login or home page
        setTimeout(() => {
          window.location.href = "/login" // Change this to your login route
        }, 1500)
      } else {
        toast.error(result.message || "Failed to delete account")
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast.error(error?.data?.message || "An error occurred while deleting account")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <Button onClick={refetch}>Retry</Button>
        </div>
      </div>
    )
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ECFDF5] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Ambulance className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{data.data.serviceName}</h1>
                <p className="text-gray-600">{data.data.email}</p>
                <p className="text-sm text-gray-500 capitalize">{data.data.vehicleType} Service</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {!isEditing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-900 cursor-pointer"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </Button>
                  
                  {/* Delete Account Button with Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 size={18} />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-6 w-6 text-destructive" />
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="pt-4">
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">
                              This action cannot be undone. This will permanently delete your ambulance service account and remove all associated data from our servers.
                            </p>
                            <div className="bg-red-50 p-3 rounded-md mt-4">
                              <p className="text-sm font-medium text-red-800">
                                <span className="font-bold">Warning:</span> All your service information, bookings, and history will be permanently lost.
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              To confirm deletion, please type <span className="font-bold">"DELETE"</span> in the box below:
                            </p>
                            <Input
                              id="confirmDelete"
                              placeholder='Type "DELETE" to confirm'
                              className="mt-2"
                              onChange={(e) => {
                                // You can add validation logic here
                              }}
                            />
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel disabled={isDeleting}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete Account"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex items-center gap-2"
                  >
                    {isUpdating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-11 h-12"
                  placeholder="Enter service name"
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              >
                {vehicleTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-11 h-12"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-11 h-12"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 text-gray-400" size={20} />
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-11 h-12"
                  placeholder="Full service address"
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Latitude</label>
              <Input
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-12"
                placeholder="e.g., 10.163153"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Longitude</label>
              <Input
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-12"
                placeholder="e.g., 76.641271"
              />
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-sm text-gray-600">Availability</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">Ready</p>
              <p className="text-sm text-gray-600">Service Status</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 capitalize">{data.data.vehicleType}</p>
              <p className="text-sm text-gray-600">Vehicle Type</p>
            </div>
          </div>
          
          {/* Warning Section for Delete */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Danger Zone</h3>
                <p className="text-sm text-red-600 mt-1">
                  Deleting your account will remove all your data permanently. This action cannot be undone.
                </p>
                <div className="mt-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-6 w-6 text-destructive" />
                          <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="pt-4">
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">
                              Are you sure you want to delete your account?
                            </p>
                            <div className="bg-red-50 p-3 rounded-md mt-4">
                              <p className="text-sm font-medium text-red-800">
                                This will permanently delete:
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-red-700">
                                <li>Your ambulance service profile</li>
                                <li>All booking history</li>
                                <li>Service location data</li>
                                <li>Account credentials</li>
                              </ul>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className={"cursor-pointer"} disabled={isDeleting}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-destructive text-white cursor-pointer hover:bg-destructive/90"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete Account"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}