import { useEffect, useState } from "react";
import { ambulanceAPI } from "../services/ambulanceApi";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    ambulanceAPI
      .profile()
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!user?._id) return;
    if (!confirm("Are you sure you want to delete your account? 🚨")) return;
    try {
      await ambulanceAPI.delete(user._id);
      toast.success("Account deleted successfully ✅");
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleting account");
    }
  };

  if (loading) return <Loader />;

  if (!user)navigate("/login");

  return (
    <div className="p-6 bg-hostaLight min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-hostaGreen mb-4">
          Ambulance Profile
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Service Name:</span> {user.serviceName}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Vehicle Type:</span>{" "}
            {user.vehicleType}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => alert("Update form coming soon ✅")}
            className="flex-1 bg-hostaGreen text-white py-2 px-4 rounded hover:bg-emerald-700 transition"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}