import { useEffect, useState } from "react";
import { ambulanceAPI } from "../services/ambulanceApi";
import Loader from "../components/Loader";
import AmbulanceCard from "../components/AmbulanceCard";

export default function AmbulanceList() {
  const [ambulances, setAmbulances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ambulanceAPI
      .getAll()
      .then((res) => setAmbulances(res.data.data))
      .catch(() => setAmbulances([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 bg-hostaLight min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold text-hostaGreen mb-6 text-center md:text-left">
        Available Ambulances
      </h2>

      {ambulances.length === 0 ? (
        <p className="text-center text-gray-500">🚫 No Ambulances Found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ambulances.map((amb) => (
            <AmbulanceCard
              key={amb._id}
              serviceName={amb.serviceName}
              address={amb.address}
              phone={amb.phone}
              vehicleType={amb.vehicleType}
            />
          ))}
        </div>
      )}
    </div>
  );
}