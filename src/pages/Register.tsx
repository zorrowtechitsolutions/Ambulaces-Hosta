import { useState } from "react";
import { ambulanceAPI } from "../services/ambulanceApi";

import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    serviceName: "",
    address: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    password: "",
    vehicleType: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ambulanceAPI.register(form);
      toast.success("Registration successful ✅");
      navigate("/login");
    } catch (err: any) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-hostaLight">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h2 className="text-xl font-bold text-hostaGreen mb-4">
          Ambulance Registration
        </h2>
        {Object.keys(form).map((field) =>
          field === "password" ? (
            <PasswordInput
              key={field}
              name={field}
              placeholder={field}
              value={(form as any)[field]}
              onChange={handleChange}
            />
          ) : (
            <input
              key={field}
              type={"text"}
              name={field}
              placeholder={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />
          )
        )}
        <button
          type="submit"
          className="bg-hostaGreen text-white py-2 px-4 rounded hover:bg-emerald-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
