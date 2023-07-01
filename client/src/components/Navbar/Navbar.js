import React, { useContext } from "react";
import image from "../../assets/quill-pen.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Navbar() {
  const navigation = useNavigate();
  const { token, setToken } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden flex items-center justify-between px-4 py-2 bg-gray-100 shadow">
      <img className="w-6 h-6 mr-2" src={image} alt="Quill Pen" />
      <button
        className="px-4 py-2 bg-emerald-900 text-white font-bold rounded-lg hover:bg-emerald-800 focus:outline-none"
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
          navigation("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
