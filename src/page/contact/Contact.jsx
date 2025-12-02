"use client"


import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [authModal, setAuthModal] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-[#ECFDF5]">
      <Header onAuthClick={(mode) => setAuthModal({ open: true, mode })} />

      {/* Hero Section */}
      <section className=" from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 text-balance">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have questions or need assistance? Our team is here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Emergency Hotline</h3>
                  <p className="text-muted-foreground">+91 8714412090</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">hostahealthcare@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground">Kootilangadi, Malappuram, Kerala, India</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-muted-foreground">Saturday & Sunday: 10AM - 4PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Send us a Message</h2>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                    Thank you for your message! We will get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1-555-0000"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-900 text-primary-foreground py-2">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How do I book an ambulance?",
                a: "You can book through our mobile app, website, or by calling our emergency hotline. We'll dispatch the nearest ambulance to your location.",
              },
              {
                q: "What is your average response time?",
                a: "Our average response time is 3-8 minutes depending on your location and ambulance availability.",
              },
              {
                q: "Is Hosta available 24/7?",
                a: "Yes, our services are available round-the-clock, 365 days a year for emergency situations.",
              },
              {
                q: "How do I register as an ambulance operator?",
                a: "Visit our registration page and fill out the form with your details. Our team will verify and contact you within 24 hours.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets for payment.",
              },
              {
                q: "Can I track my ambulance in real-time?",
                a: "Yes, once you book, you can track your ambulance's location and get real-time updates via GPS.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
