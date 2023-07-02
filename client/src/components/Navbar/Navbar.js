import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/quill-pen.png";
import { AppContext } from "../../context/AppContext";
import SortMenu from "../SortMenu/SortMenu";

export default function Navbar() {
  const navigation = useNavigate();
  const { setToken } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow">
      <img className="w-6 h-6 mr-2" src={image} alt="Quill Pen" />
      <SortMenu />
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
