import React from "react";
import { Outlet } from "react-router-dom";
import RoomComponent from "../components/rooms";
import LogoutButton from "../components/logoutbutton";

const Sidebar = () => {
  const name = localStorage.getItem("name");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 md:w-1/4 lg:w-1/6 bg-blue-600 text-white h-full p-6 flex flex-col space-y-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white bg-blue-700 rounded-lg p-4 shadow-md">
          {name}
        </h1>

        {/* RoomComponent */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
          <RoomComponent />
        </div>

        <LogoutButton />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
