"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import RegisterForm from "@/components/Register-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5]">
      <Header onAuthClick={() => {}} />

      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Register Your Ambulance Service</h1>
            <p className="text-lg text-muted-foreground">
              Join Hosta and connect with patients in need of emergency medical services
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            <RegisterForm />
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Free registration with no hidden charges</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Round-the-clock customer support</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-2">Verified</div>
              <p className="text-sm text-muted-foreground">Complete transparency and security</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
