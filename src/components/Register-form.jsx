"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building,
  MapPin,
  Phone,
  Ambulance,
  Home,
  MapPinned
} from "lucide-react";
import {
  useRegisterAmbulanceMutation
} from "@/app/service/ambulance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  // Basic Info (only fields that exist in backend)
  const [serviceName, setServiceName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("van");

  // Address fields (nested object as per backend schema)
  const [address, setAddress] = useState({
    country: "",
    state: "",
    district: "",
    place: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [registerAmbulance, { isLoading }] = useRegisterAmbulanceMutation();

  const vehicleTypes = [
    { value: "van", label: "Ambulance Van" },
    { value: "suv", label: "SUV Ambulance" },
    { value: "motorcycle", label: "Motorcycle Ambulance" },
    { value: "air", label: "Air Ambulance" },
    { value: "icu", label: "ICU Ambulance" },
    { value: "basic", label: "Basic Life Support" }
  ];

  // Handle address field changes
  const handleAddressChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!serviceName.trim())
      newErrors.serviceName = "Service name required";
    
    if (!address.place.trim())
      newErrors.place = "Place is required";
    
    if (!address.pincode)
      newErrors.pincode = "Pincode required";
    else if (!/^\d{6}$/.test(address.pincode.toString()))
      newErrors.pincode = "Invalid pincode (6 digits)";
    
    if (!phone.trim())
      newErrors.phone = "Phone number required";
    else if (!/^\d{10}$/.test(phone.replace(/\D/g, '')))
      newErrors.phone = "Invalid phone number (10 digits)";
    
    if (!vehicleType)
      newErrors.vehicleType = "Vehicle type required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Prepare data matching backend schema EXACTLY
      const ambulanceData = {
        serviceName: serviceName.trim(),
        address: {
          country: address.country || undefined,
          state: address.state || undefined,
          district: address.district || undefined,
          place: address.place.trim(),
          pincode: parseInt(address.pincode)
        },
        phone: phone.trim(),
        vehicleType: vehicleType
      };


      const result = await registerAmbulance(ambulanceData).unwrap();

      if (result.message?.includes("success") || result.status === 200) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error?.data?.message || "Registration error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Ambulance className="h-6 w-6 sm:h-8 sm:w-8 text-green-700" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-green-800">
            Register Ambulance Service
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Join our emergency network
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Service Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base ${
                  errors.serviceName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., City Ambulance Service"
              />
            </div>
            {errors.serviceName && (
              <p className="text-xs text-red-500">{errors.serviceName}</p>
            )}
          </div>

          {/* Address Section */}
          <div className="space-y-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPinned size={16} />
              Address Details <span className="text-red-500">*</span>
            </label>

            {/* Place - Required */}
            <div className="relative">
              <Home size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={address.place}
                onChange={(e) => handleAddressChange("place", e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                  errors.place ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Place / Locality *"
              />
            </div>
            {errors.place && <p className="text-xs text-red-500">{errors.place}</p>}

            {/* District */}
            <input
              value={address.district}
              onChange={(e) => handleAddressChange("district", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="District"
            />

            {/* State & Country Row */}
            <div className="grid grid-cols-2 gap-3">
              <input
                value={address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="State"
              />
              <input
                value={address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Country"
              />
            </div>

            {/* Pincode - Required */}
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Pincode *"
              />
            </div>
            {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Phone number *"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                errors.vehicleType ? "border-red-500" : "border-gray-300"
              }`}
            >
              {vehicleTypes.map(v => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
            {errors.vehicleType && <p className="text-xs text-red-500">{errors.vehicleType}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium mt-4"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

   
      </div>
    </div>
  );
}