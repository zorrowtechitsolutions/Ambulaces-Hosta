"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Phone, Star, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetAllAmbulanceQuery } from "@/app/service/ambulance"

const ITEMS_PER_PAGE = 4

export default function AmbulanceListings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterByAvailable, setFilterByAvailable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { 
    data,
    isLoading, 
    error,
    refetch
  } = useGetAllAmbulanceQuery()

 

  // Transform your API data to match the expected format
  const ambulanceData = useMemo(() => {
    if (!data?.data) return []
    
    return data.data.map((ambulance, index) => ({
      id: ambulance._id || index,
      name: ambulance.serviceName || "Ambulance Service",
      operator: ambulance.serviceName || "Ambulance Provider",
      location: ambulance.address || "Location not specified",
      distance: Math.random() * 10 + 1, // You might want to calculate actual distance
      phone: ambulance.phone || "Phone not available",
      rating: 4.5 + (Math.random() * 0.5), // Default rating since your data doesn't have ratings
      reviews: Math.floor(Math.random() * 200) + 50, // Default reviews
      available: Math.floor(Math.random() * 5) + 1, // Random availability
      responseTime: `${Math.floor(Math.random() * 5) + 3}-${Math.floor(Math.random() * 5) + 6} mins`, // Random response time
      vehicleType: ambulance.vehicleType || "van",
      email: ambulance.email,
      latitude: ambulance.latitude,
      longitude: ambulance.longitude
    }))
  }, [data?.data])

  const filteredAmbulances = useMemo(() => {
    return ambulanceData.filter((amb) => {
      const matchesSearch =
        amb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = !filterByAvailable || amb.available > 0
      return matchesSearch && matchesFilter
    })
  }, [ambulanceData, searchTerm, filterByAvailable])

  const totalPages = Math.ceil(filteredAmbulances.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAmbulances = filteredAmbulances.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilter = () => {
    setFilterByAvailable(!filterByAvailable)
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">Loading ambulance services...</div>
        </div>
      </section>
    )
  }



  return (
    <section className="py-12 md:py-16 bg-[#ECFDF5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8 text-balance">
          Available Ambulance Services
        </h2>

        <div className="flex flex-col gap-3 mb-6 md:mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by name, operator, or location..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-white h-11 border-border  text-foreground placeholder:text-muted-foreground text-sm md:text-base"
            />
          </div>
        </div>

      

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          {currentAmbulances.map((amb) => (
            <div key={amb.id} className="bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4 gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-foreground truncate">{amb.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{amb.operator}</p>
                </div>
            
              </div>

              <div className="space-y-2 md:space-y-3 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <span className="truncate">
                    {amb.location} - {amb.distance.toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <span className="truncate">{amb.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                  <span>
                    Vehicle Type: <span className="font-semibold text-foreground capitalize">{amb.vehicleType}</span>
                  </span>
                </div>
              </div>

            
            </div>
          ))}
        </div>

        {filteredAmbulances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm md:text-base">
              No ambulance services found. Try adjusting your search.
            </p>
          </div>
        )}

        {filteredAmbulances.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 bg-transparent w-full sm:w-auto"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm transition flex-shrink-0 ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-background border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 bg-transparent w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}