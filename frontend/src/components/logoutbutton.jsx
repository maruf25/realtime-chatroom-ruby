import React from "react";
import { useNavigate } from "react-router-dom";

const logoutbutton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  return (
    <button
      className="w-full py-3 bg-red-700 hover:bg-red-800 transition-colors duration-200 text-white rounded-lg shadow-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default logoutbutton;
