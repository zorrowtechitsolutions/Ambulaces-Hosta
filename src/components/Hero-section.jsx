"use client"

import { MapPin, Clock, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"



export default function HeroSection({ onRegisterClick }) {
  return (
    <section className="relative bg-[#ECFDF5] from-slate-50 via-blue-50 to-cyan-50 py-12 md:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
         

            <h1 className=" text-green-800 text-4xl md:text-5xl lg:text-6xl font-bold  leading-tight text-balance">
              Welcome to{" "}
              <span className="bg-green-800 from-primary to-secondary bg-clip-text text-transparent">Hosta</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your Complete Healthcare Companion. Quick, reliable, and trusted ambulance connections across hospitals
              and medical facilities.
            </p>

            <div className="space-y-3 bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <p className="text-foreground font-bold text-base">Our Vision:</p>
              <p className="text-muted-foreground leading-relaxed">
                We bridge the gap between patients and emergency medical services. From real-time ambulance availability
                to secure booking and management, Hosta ensures you get medical help when you need it the most.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                onClick={onRegisterClick}
                className="bg-green-600 from-primary to-secondary cursor-pointer hover:bg-green-800 text-white font-bold shadow-lg text-base w-full sm:w-auto"
              >
                Register Ambulance
              </Button>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md hover:shadow-xl transition hover:border-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-base">Real-Time Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Check ambulance availability and response times instantly
                  </p>
                </div>
              </div>
            </div>


            <div className="bg-white p-6 rounded-xl border-2 border-orange-100 shadow-md hover:shadow-xl transition hover:border-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-base">Secure & Trusted</h3>
                  <p className="text-sm text-muted-foreground">
                    Verified ambulance services and secure payment methods
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
