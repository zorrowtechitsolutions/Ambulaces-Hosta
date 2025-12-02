"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, MapPin, Phone, Mail, Lock, Ambulance, Eye, EyeOff } from "lucide-react"
import { useRegisterAmbulanceMutation } from "@/app/service/ambulance"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
  const [serviceName, setServiceName] = useState("")
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vehicleType, setVehicleType] = useState("van")
  
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate();
  
  const [registerAmbulance, { isLoading }] = useRegisterAmbulanceMutation()

  const vehicleTypes = [
    { value: "van", label: "Ambulance Van" },
    { value: "suv", label: "SUV Ambulance" },
    { value: "motorcycle", label: "Motorcycle Ambulance" },
    { value: "air", label: "Air Ambulance" },
    { value: "icu", label: "ICU Ambulance" },
    { value: "basic", label: "Basic Life Support" }
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!serviceName.trim()) {
        newErrors.serviceName = "Service name is required"
      }
      if (!address.trim()) {
        newErrors.address = "Address is required"
      }
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
        newErrors.phone = "Please enter a valid phone number"
      }
      if (!vehicleType) {
        newErrors.vehicleType = "Vehicle type is required"
      }
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid"
      }
    }
    
    if (step === 2) {
      if (!password) {
        newErrors.password = "Password is required"
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(2)) {
      return
    }

    try {
      // Send data directly without wrapping in formData
      const result = await registerAmbulance({
        serviceName,
        address,
        latitude,
        longitude,
        phone,
        email,
        password,
        vehicleType
      }).unwrap()
      
      console.log("Registration response:", result)
      
      // Check for success message from backend
      if (result.message && result.message.includes("successfully")) {
        toast.success("Registration successful!")
        // Reset form
        setServiceName("")
        setAddress("")
        setLatitude("")
        setLongitude("")
        setPhone("")
        setEmail("")
        setPassword("")
        setVehicleType("van")
        setCurrentStep(1)
        
        // Navigate to sign-in page
        navigate("/sign-in")
      } else {
        toast.error(result.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error?.data?.message || "An error occurred during registration")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 ">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Ambulance className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Register Ambulance Service</h1>
        <p className="text-muted-foreground">Join our emergency response network</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Service Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Service Name *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Enter your ambulance service name"
                    className={`pl-11 h-12 text-base border-2 bg-background ${
                      errors.serviceName 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {errors.serviceName && (
                  <p className="text-sm text-destructive">{errors.serviceName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Vehicle Type *</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className={`w-full h-12 px-3 border-2 rounded-md bg-background text-foreground focus:outline-none focus:border-primary ${
                    errors.vehicleType ? "border-destructive" : "border-border"
                  }`}
                  required
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && (
                  <p className="text-sm text-destructive">{errors.vehicleType}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full service address"
                    className={`pl-11 h-12 text-base border-2 bg-background ${
                      errors.address 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Latitude</label>
                  <Input
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 10.163153"
                    className="h-12 text-base border-2 border-border bg-background focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Longitude</label>
                  <Input
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., 76.641271"
                    className="h-12 text-base border-2 border-border bg-background focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className={`pl-11 h-12 text-base border-2 bg-background ${
                      errors.phone 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="your@email.com"
                    className={`pl-11 h-12 text-base border-2 bg-background ${
                      errors.email 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <Button
              type="button"
              onClick={nextStep}
              className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-900 cursor-pointer"
            >
              Continue to Account Setup
            </Button>
          </div>
        )}

        {/* Step 2: Account Setup */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    className={`pl-11 pr-11 h-12 text-base border-2 bg-background ${
                      errors.password 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-offset-1" 
                />
                <span className="text-sm text-foreground">
                  I confirm that all information provided is accurate and I have the authority to register this ambulance service.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-offset-1" 
                />
                <span className="text-sm text-foreground">
                  I agree to comply with all local emergency service regulations and platform terms of service.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 text-base font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* Sign In Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/sign-in")}
            className="text-green-800 cursor-pointer hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}