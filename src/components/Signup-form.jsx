// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Mail, Lock, Eye, EyeOff, Ambulance } from "lucide-react"
// import { useLoginAmbulanceMutation } from "@/app/service/ambulance"
// import { toast } from "sonner" // or your preferred toast library
// import { useNavigate } from "react-router-dom"

// export default function LoginForm({ onSuccess }) {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [errors, setErrors] = useState({})
//   const Navigate = useNavigate();
  
//   const [loginAmbulance, { isLoading }] = useLoginAmbulanceMutation()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}
    
//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }
    
//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) {
//       return
//     }

//     try {
//       const result = await loginAmbulance(formData).unwrap()
            
//       if (result.status == 200) {
//         toast.success("Login successful!")
//         localStorage.setItem("ambulanceId", result.data._id);
//         Navigate("/");
//       } else {
//         toast.error(result.message || "Login failed")
//       }
//     } catch (error) {
//       console.error("Login error:", error)
//       toast.error(error?.data?.message || "An error occurred during login")
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto mt-44 ">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="flex justify-center mb-4">
//           <div className="bg-primary/10 p-3 rounded-full">
//             <Ambulance className="h-8 w-8 text-primary" />
//           </div>
//         </div>
//         <h1 className="text-2xl font-bold text-green-800 mb-2">Welcome Back</h1>
//         <p className="text-muted-foreground">Sign in to your ambulance service account</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Email Field */}
//         <div className="space-y-2">
//           <label htmlFor="email" className="text-sm font-medium text-foreground">
//             Email Address
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`pl-11 h-12 text-base border-2 bg-background ${
//                 errors.email 
//                   ? "border-destructive focus:border-destructive" 
//                   : "border-border focus:border-primary"
//               }`}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-sm text-destructive flex items-center gap-1">
//               <span>•</span>
//               {errors.email}
//             </p>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <label htmlFor="password" className="text-sm font-medium text-foreground">
//               Password
//             </label>

//           </div>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`pl-11 pr-11 h-12 text-base border-2 bg-background ${
//                 errors.password 
//                   ? "border-destructive focus:border-destructive" 
//                   : "border-border focus:border-primary"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-sm text-destructive flex items-center gap-1">
//               <span>•</span>
//               {errors.password}
//             </p>
//           )}
//         </div>

//         {/* Remember Me & Forgot Password */}
//         <div className="flex items-center justify-between">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-offset-1"
//             />
//             <span className="text-sm text-foreground">Remember me</span>
//           </label>
//           <button
//             type="button"
//             onClick={() => Navigate("/forgot-password")}
//             className="text-sm text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
//           >
//             Forgot password?
//           </button>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-12 bg-green-600 text-base font-semibold cursor-pointer  hover:bg-green-900 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
//               Signing in...
//             </div>
//           ) : (
//             "Sign In"
//           )}
//         </Button>
//       </form>

//       {/* Footer */}
//       <div className="mt-8 text-center">
//         <p className="text-sm text-muted-foreground">
//           Don't have an account?{" "}
//           <button
//           onClick={() => Navigate("/sign-up")}
//             type="button"
//             className="text-green-800 cursor-pointer hover:text-primary/80 font-medium transition-colors"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>

  
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff, Ambulance } from "lucide-react"
import { useLoginAmbulanceMutation } from "@/app/service/ambulance"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function LoginForm({ onSuccess }) {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const [loginAmbulance, { isLoading }] =
    useLoginAmbulanceMutation()

  /* ======================
     HANDLE CHANGE
  ====================== */

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  /* ======================
     VALIDATION
  ====================== */

  const validateForm = () => {

    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email"
    }

    if (!formData.password) {
      newErrors.password = "Password required"
    }
    else if (formData.password.length < 6) {
      newErrors.password =
        "Minimum 6 characters"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  /* ======================
     SUBMIT
  ====================== */

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) return

    try {

      const result =
        await loginAmbulance(formData).unwrap()

      if (result.status === 200) {

        toast.success("Login successful!")

        localStorage.setItem(
          "ambulanceId",
          result.data._id
        )

        navigate("/")

      } else {

        toast.error(
          result.message || "Login failed"
        )
      }

    } catch (error) {

      console.error(error)

      toast.error(
        error?.data?.message ||
        "Login error occurred"
      )
    }
  }

  /* ======================
     UI
  ====================== */

  return (

    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">

        {/* Header */}

        <div className="text-center mb-6 sm:mb-8">

          <div className="flex justify-center mb-4">

            <div className="bg-green-100 p-3 rounded-full">

              <Ambulance className="h-7 w-7 sm:h-8 sm:w-8 text-green-700" />

            </div>

          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">

            Welcome Back

          </h1>

          <p className="text-sm sm:text-base text-muted-foreground">

            Sign in to your ambulance service account

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >

          {/* Email */}

          <div className="space-y-2">

            <label className="text-sm font-medium">

              Email Address

            </label>

            <div className="relative">

              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />

              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}

                className={`pl-10 h-11 sm:h-12 border-2

                ${
                  errors.email
                    ? "border-red-500"
                    : "border-border focus:border-green-600"
                }`}
              />

            </div>

            {errors.email && (

              <p className="text-sm text-red-500">

                {errors.email}

              </p>

            )}

          </div>

          {/* Password */}

          <div className="space-y-2">

            <label className="text-sm font-medium">

              Password

            </label>

            <div className="relative">

              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />

              <Input
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Enter password"

                value={formData.password}

                onChange={handleChange}

                className={`pl-10 pr-10 h-11 sm:h-12 border-2

                ${
                  errors.password
                    ? "border-red-500"
                    : "border-border focus:border-green-600"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }

                className="absolute right-3 top-1/2 -translate-y-1/2"
              >

                {showPassword
                  ? <EyeOff size={18}/>
                  : <Eye size={18}/>
                }

              </button>

            </div>

            {errors.password && (

              <p className="text-sm text-red-500">

                {errors.password}

              </p>

            )}

          </div>

          {/* Forgot */}

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember me

            </label>

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }

              className="text-green-700 font-medium"
            >

              Forgot password?

            </button>

          </div>

          {/* Submit */}

          <Button
            type="submit"
            disabled={isLoading}

            className="w-full h-11 sm:h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >

            {isLoading
              ? "Signing in..."
              : "Sign In"
            }

          </Button>

        </form>

        {/* Footer */}

        <div className="mt-6 text-center text-sm">

          Don't have an account?{" "}

          <button
            onClick={() =>
              navigate("/sign-up")
            }

            className="text-green-700 font-medium"
          >

            Sign up

          </button>

        </div>

      </div>

    </div>
  )
}