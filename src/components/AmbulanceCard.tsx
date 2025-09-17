import { Phone, MapPin, Truck } from "lucide-react";

type AmbulanceProps = {
  serviceName: string;
  address: string;
  phone: string;
  vehicleType: string;
};

export default function AmbulanceCard({
  serviceName,
  address,
  phone,
  vehicleType,
}: AmbulanceProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">
      <h3 className="font-bold text-xl text-hostaGreen mb-2">{serviceName}</h3>
      <div className="space-y-2 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-hostaGreen" /> {address}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-hostaGreen" /> {phone}
        </p>
        <p className="flex items-center gap-2">
          <Truck size={16} className="text-hostaGreen" /> {vehicleType}
        </p>
      </div>
    </div>
  );
}