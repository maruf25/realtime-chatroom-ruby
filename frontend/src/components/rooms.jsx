import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWebSocket } from "../utils/ws";
import { useWebSocket } from "../context/WebSocketProvider";

const roomsComponent = () => {
  const userId = localStorage.getItem("user_id");
  const [rooms, setRooms] = useState([]);
  const { socket } = useWebSocket();

  useEffect(() => {
    // const socket =  getWebSocket();

    // socket.onopen = () => {
    //   console.log("connected to websocket server");
    if (socket) {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: "Global",
            channel: "RoomsChannel",
          }),
        })
      );

      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.type === "ping") return;
        if (data.type === "welcome") return;
        if (data.type === "confirm_subscription") return;

        if (data.message.type === "RoomCreated") {
          fetchRooms();
        }
      };
    }
    // };

    fetchRooms();

    return () => {
      // socket.onmessage = null;
    };
  }, [socket]);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:3000/rooms", { method: "GET" });
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
        Chat Rooms
      </h2>

      {/* Daftar rooms */}
      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Link
              key={room.id}
              to={`/rooms/${room.id}`}
              className="block p-3 rounded-lg bg-gray-100 hover:bg-blue-100 shadow-sm hover:shadow-md transition-all duration-200 text-gray-800 hover:text-blue-600"
            >
              {room.name}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default roomsComponent;
