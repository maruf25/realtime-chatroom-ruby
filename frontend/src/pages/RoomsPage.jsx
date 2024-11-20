import React, { useState } from "react";

const RoomsPage = () => {
  const [nameRoom, setNameRoom] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameRoom }),
      });
      setNameRoom("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">👋 Welcome to the Chat App!</h1>
      <p className="mt-4 text-lg text-gray-600 mb-4">
        Select a group to start your conversation or create a new one.
      </p>

      {/* Form Rooms */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col justify-center">
          <input
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
            type="text"
            name="name"
            value={nameRoom}
            onChange={(e) => setNameRoom(e.target.value)}
            placeholder="Enter room name..."
          />
          <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 text-white rounded-lg shadow-md">
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomsPage;
