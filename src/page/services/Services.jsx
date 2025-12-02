"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Ambulance, MapPin, Shield, Clock, Phone, Zap } from "lucide-react"

export default function ServicesPage() {
  const [authModal, setAuthModal] = useState(null)

  const services = [
    {
      icon: Ambulance,
      title: "Emergency Ambulance Services",
      description:
        "24/7 availability of fully equipped ambulances manned by trained medical professionals ready to respond to emergencies.",
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track your ambulance in real-time with GPS location updates and estimated arrival times.",
    },
    {
      icon: MapPin,
      title: "Wide Service Coverage",
      description: "Our network spans across multiple districts and hospitals, ensuring help is always within reach.",
    },
    {
      icon: Shield,
      title: "Verified Operators",
      description: "All ambulance operators are verified, licensed, and regularly trained in emergency response.",
    },
    {
      icon: Zap,
      title: "Quick Response Time",
      description:
        "Average response time of 3-8 minutes, significantly reducing time to medical care during emergencies.",
    },
    {
      icon: Phone,
      title: "24/7 Support Team",
      description: "Our dedicated customer support team is available round-the-clock to assist you with any queries.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#ECFDF5]">
      <Header onAuthClick={(mode) => setAuthModal({ open: true, mode })} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive ambulance and emergency response services designed to save lives and provide peace of mind.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition">
                  <IconComponent className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: "1",
                title: "Call or Book",
                description: "Request an ambulance through our app or call center",
              },
              {
                number: "2",
                title: "Confirm Request",
                description: "We verify your emergency and location details instantly",
              },
              {
                number: "3",
                title: "Dispatch Ambulance",
                description: "The nearest available ambulance is dispatched immediately",
              },
              {
                number: "4",
                title: "Receive Help",
                description: "Medical professionals arrive and provide immediate assistance",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Service Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emergency Service",
                price: "Variable",
                features: ["Pay per use", "Quick response", "Basic coverage"],
              },
              {
                name: "Monthly Plan",
                price: "$29/mo",
                features: ["Unlimited bookings", "Priority dispatch", "24/7 support", "GPS tracking"],
                highlight: true,
              },
              {
                name: "Annual Plan",
                price: "$299/yr",
                features: ["Best value", "All monthly features", "Discounted rates", "Family coverage"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl border p-8 text-center transition ${
                  plan.highlight ? "border-primary bg-primary/5 scale-105" : "border-border bg-card hover:shadow-lg"
                }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    plan.highlight ? "bg-primary hover:bg-primary/90 text-primary-foreground w-full" : "w-full"
                  }
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => setAuthModal({ open: true, mode: "signup" })}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
  
    </main>
  )
}
