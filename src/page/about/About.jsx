"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  const [authModal, setAuthModal] = useState(null)

  return (
    <main className="min-h-screen bg-[#ECFDF5]">
      <Header onAuthClick={(mode) => setAuthModal({ open: true, mode })} />

      {/* Hero Section */}
      <section className=" from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 text-balance">About Hosta</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We are committed to revolutionizing emergency medical services by connecting patients with reliable, fast,
            and trusted ambulance services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To provide fast, reliable, and accessible emergency ambulance services that connect patients with
                medical facilities within minutes. We believe every second counts in emergencies, and Hosta is dedicated
                to saving lives through efficient service delivery.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform bridges the gap between patients in need and verified ambulance operators, ensuring
                transparency, safety, and reliability at every step.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To become the most trusted and widely used ambulance service platform, making emergency medical
                assistance accessible to everyone, everywhere, anytime.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where no one has to worry about finding an ambulance during a medical emergency—
                Hosta will always be there to help, 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-border text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Care</h3>
              <p className="text-sm text-muted-foreground">
                We prioritize patient safety and well-being above everything else.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Building trust and partnerships with hospitals, operators, and patients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Making emergency services available to all, regardless of location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Committed to delivering the highest standards in service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Join Us in Making a Difference</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are a patient seeking emergency services or an ambulance operator looking to expand your reach,
            Hosta is here to serve you.
          </p>
          <Button
            size="lg"
            onClick={() => setAuthModal({ open: true, mode: "signup" })}
            className="bg-green-600 hover:bg-primary/90 text-primary-foreground"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
 
    </main>
  )
}
