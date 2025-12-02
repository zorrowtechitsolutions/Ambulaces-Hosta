// ForgotPassword.jsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Ambulance, 
  ArrowLeft, 
  CheckCircle,
  Key,
  Shield,
  XCircle
} from "lucide-react"
import { 
  useForgotAmbulanceMutation, 
  usePasswordChangeAmbulanceMutation 
} from "@/app/service/ambulance"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword() {
  const navigate = useNavigate()
  
  // State for the entire flow
  const [currentStep, setCurrentStep] = useState(1) // 1: Email, 2: Reset Password, 3: Success
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [ambulanceId, setAmbulanceId] = useState(null)
  
  // API mutations
  const [forgotAmbulance, { isLoading: isEmailLoading }] = useForgotAmbulanceMutation()
  const [passwordChangeAmbulance, { isLoading: isPasswordLoading }] = usePasswordChangeAmbulanceMutation()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
    
    // Check password strength for password field
    if (name === "password") {
      checkPasswordStrength(value)
    }
  }

  // Check password strength
  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  // Get password strength color
  const getStrengthColor = (strength) => {
    if (strength === 0) return "bg-gray-200"
    if (strength <= 2) return "bg-red-500"
    if (strength === 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Validate email step
  const validateEmailStep = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate password step
  const validatePasswordStep = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle email verification (Step 1)
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmailStep()) {
      return
    }

    try {
      const result = await forgotAmbulance({ email: formData.email }).unwrap()
      
      if (result.status === 200) {
        setAmbulanceId(result.data._id)
        toast.success("Email verified successfully!")
        setCurrentStep(2) // Move to password reset step
      } else {
        toast.error(result.message || "Failed to verify email")
      }
    } catch (error) {
      console.error("Email verification error:", error)
      toast.error(error?.data?.message || "No account found with this email")
    }
  }

  // Handle password reset (Step 2)
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!validatePasswordStep()) {
      return
    }

    try {
      const result = await passwordChangeAmbulance({ 
    email: formData.email, 
        password: formData.password 
      }).unwrap()
      
      if (result.status === 200) {
        toast.success("Password changed successfully!")
        setCurrentStep(3) // Move to success step
      } else {
        toast.error(result.message || "Failed to change password")
      }
    } catch (error) {
      console.error("Password reset error:", error)
      toast.error(error?.data?.message || "Failed to reset password")
    }
  }

  // Handle back button
  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/sign-in")
    } else if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3) {
      navigate("/sign-in")
    }
  }

  // Handle resend verification
  const handleResendVerification = () => {
    setCurrentStep(1)
    setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }))
    setErrors({})
    toast.info("Please enter your email again")
  }

  // Reset everything
  const handleStartOver = () => {
    setCurrentStep(1)
    setFormData({
      email: "",
      password: "",
      confirmPassword: ""
    })
    setErrors({})
    setAmbulanceId(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          {/* Back line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10 mx-16"></div>
          
          {/* Step 1: Email */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {currentStep > 1 ? <CheckCircle size={20} /> : <Mail size={20} />}
            </div>
            <span className={`text-sm font-medium ${currentStep >= 1 ? "text-green-600" : "text-gray-400"}`}>
              Verify Email
            </span>
          </div>
          
          {/* Step 2: Password */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {currentStep > 2 ? <CheckCircle size={20} /> : <Key size={20} />}
            </div>
            <span className={`text-sm font-medium ${currentStep >= 2 ? "text-green-600" : "text-gray-400"}`}>
              New Password
            </span>
          </div>
          
          {/* Step 3: Success */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              <Shield size={20} />
            </div>
            <span className={`text-sm font-medium ${currentStep >= 3 ? "text-green-600" : "text-gray-400"}`}>
              Complete
            </span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-3"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 3 ? "Back to Login" : "Back"}
        </Button>

        {/* Step 1: Email Verification */}
        {currentStep === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Ambulance className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600">
                Enter your email address to reset your password
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your registered email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-11 h-12 text-base border-2 ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>•</span>
                    {errors.email}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isEmailLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEmailLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Back to login
                </button>
              </p>
            </div>
          </>
        )}

        {/* Step 2: Password Reset */}
        {currentStep === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Key className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Password
              </h1>
              <p className="text-gray-600">
                Enter a new password for your account
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-12 text-base border-2 ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1 h-2">
                      {[1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-full transition-all ${
                            index <= passwordStrength 
                              ? getStrengthColor(passwordStrength) 
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        {formData.password.length >= 6 ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-gray-300" />
                        )}
                        <span>At least 6 characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[A-Z]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-gray-300" />
                        )}
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[0-9]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-gray-300" />
                        )}
                        <span>One number</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[^A-Za-z0-9]/.test(formData.password) ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-gray-300" />
                        )}
                        <span>One special character</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>•</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-12 text-base border-2 ${
                      errors.confirmPassword 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>•</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isPasswordLoading}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPasswordLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Resetting Password...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendVerification}
                  className="w-full h-12"
                >
                  Use different email
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Your password has been changed successfully. You can now login with your new password.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/sign-in")}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold"
              >
                Go to Login
              </Button>
              
              <Button
                variant="outline"
                onClick={handleStartOver}
                className="w-full h-12"
              >
                Reset another password
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="w-full h-12"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        {currentStep !== 3 && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <button
                onClick={() => toast.info("Contact support: support@ambulance.com")}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Contact Support
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}