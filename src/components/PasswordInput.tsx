import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({ name, placeholder, value, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full border p-2 mb-3 rounded">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder || "Password"}
        value={value}
        onChange={onChange}
        className="outline-none w-full"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 text-gray-500 hover:text-hostaGreen"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}