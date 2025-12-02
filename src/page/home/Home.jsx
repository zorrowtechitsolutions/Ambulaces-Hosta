import React from 'react'


import Header from "@/components/Header"
import HeroSection from "@/components/Hero-section"
import AmbulanceListings from "@/components/Ambulance-listings"
import Footer from "@/components/Footer"

export default function Home() {

  return (
      <main className="min-h-screen ">
      <Header  />
      <HeroSection  />
      <AmbulanceListings />
      <Footer />

    </main>
  )
}
