


import ForgotPassword from "@/components/Forgot-password";
import RegisterForm from "@/components/Register-form";
import SignupForm from "@/components/Signup-form";
import AboutPage from "@/page/about/About";
import ContactPage from "@/page/contact/Contact";
import Home from "@/page/home/Home";
import ProfilePage from "@/page/profile/Profile";
import ServicesPage from "@/page/services/Services";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
       <Route path="/sign-in" element={<SignupForm />} />
      <Route path="/sign-up" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

     

      
      {/* <Route element={<ProtectedRoutes />}> */}
      
          {/* Add redirect from root to dashboard */}
          <Route path="/" element={<Home />} />
          
          {/* Add the missing /dashboard route */}
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />



        {/* </Route> */}
            <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}