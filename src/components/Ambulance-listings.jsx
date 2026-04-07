import React, { useState, useMemo } from "react";
import { Search, MapPin, Phone, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllAmbulanceQuery } from "@/app/service/ambulance";

const ITEMS_PER_PAGE = 4;

export default function AmbulanceListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByAvailable, setFilterByAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Your actual API hook - NO dummy data
  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useGetAllAmbulanceQuery();

  // Transform your API data to match the expected format
  const ambulanceData = useMemo(() => {
    if (!data?.data) return [];
    
    return data.data.map((ambulance, index) => {
      // Format address from nested object
      const addressParts = [];
      if (ambulance.address?.place) addressParts.push(ambulance.address.place);
      if (ambulance.address?.district) addressParts.push(ambulance.address.district);
      if (ambulance.address?.state) addressParts.push(ambulance.address.state);
      if (ambulance.address?.pincode) addressParts.push(ambulance.address.pincode);
      
      const formattedAddress = addressParts.join(', ');
      
      return {
        id: ambulance._id || index,
        name: ambulance.serviceName || "Ambulance Service",
        operator: ambulance.serviceName || "Ambulance Provider",
        location: formattedAddress || "Location not specified",
        phone: ambulance.phone || "Phone not available",
        vehicleType: ambulance.vehicleType || "basic",
        email: ambulance.email,
        addressDetails: ambulance.address,
        createdAt: ambulance.createdAt,
        updatedAt: ambulance.updatedAt
      };
    });
  }, [data?.data]);

  const filteredAmbulances = useMemo(() => {
    return ambulanceData.filter((amb) => {
      const matchesSearch =
        amb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Remove the available filter since your backend doesn't have this field
      // const matchesFilter = !filterByAvailable || amb.available > 0;
      
      return matchesSearch; // Only search filter for now
    });
  }, [ambulanceData, searchTerm]);

  const totalPages = Math.ceil(filteredAmbulances.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAmbulances = filteredAmbulances.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getVehicleTypeBadge = (type) => {
    const types = {
      icu: "bg-red-100 text-red-800",
      basic: "bg-blue-100 text-blue-800",
      advanced: "bg-purple-100 text-purple-800",
      van: "bg-green-100 text-green-800"
    };
    return types[type?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-[#ECFDF5]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading ambulance services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-[#ECFDF5]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Error loading ambulance services. Please try again later.</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#ECFDF5] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-2">
            Available Ambulance Services
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {filteredAmbulances.length} ambulance{filteredAmbulances.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Ambulance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {currentAmbulances.map((amb) => (
            <div 
              key={amb.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-4 sm:p-5 md:p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate">
                      {amb.name}
                    </h3>
                  </div>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getVehicleTypeBadge(amb.vehicleType)}`}>
                    {amb.vehicleType?.toUpperCase() || "BASIC"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 sm:space-y-2.5 mb-4">
                  <div className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                    <MapPin size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{amb.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                    <Phone size={14} className="text-green-600 flex-shrink-0" />
                    <a href={`tel:${amb.phone}`} className="hover:text-green-600 transition-colors">
                      {amb.phone}
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t border-gray-100">
                  <a
                    href={`tel:${amb.phone}`}
                    className="flex-1 bg-green-600 text-white text-center py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Call Now
                  </a>
               
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAmbulances.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block p-4 bg-white rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              No ambulance services found.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Try adjusting your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredAmbulances.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[36px] h-9 px-2 rounded-lg text-sm transition-colors ${
                    currentPage === page
                      ? "bg-green-600 text-white font-semibold"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}