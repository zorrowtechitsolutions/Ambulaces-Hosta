"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#ECFDF5] text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
    src="/app_icon.jpeg"
    alt=""
    className="w-full h-full object-cover"
  />

              </div>
              <h3 className="text-lg text-green-800 md:text-xl font-bold">Hosta</h3>
            </div>
            <p className="text-xs md:text-sm opacity-80">
              Your Complete Healthcare Companion providing quick and reliable ambulance services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground text-xs md:text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="/" className="opacity-80 hover:opacity-100 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="opacity-80 hover:opacity-100 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="opacity-80 hover:opacity-100 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="opacity-80 hover:opacity-100 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground text-xs md:text-sm">Services</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Emergency Response
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Ambulance Booking
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Hospital Transfer
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-secondary-foreground text-xs md:text-sm">Contact</h4>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+1-555-0000" className="opacity-80 hover:opacity-100 transition">
                  +91 8714412090
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:info@hosta.com" className="opacity-80 hover:opacity-100 transition truncate">
                  hostahealthcare@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <p className="opacity-80 text-xs">Kootilangadi, Malappuram, Kerala, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8 py-6 md:py-8 border-t border-secondary-foreground/20">
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            <Facebook size={18} />
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            <Twitter size={18} />
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs md:text-sm opacity-80 border-t border-secondary-foreground/20 pt-6 md:pt-8">
          <p>&copy; 2025 Hosta - Emergency Ambulance Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
