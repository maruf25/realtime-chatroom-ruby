import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "./messages";

const roomItem = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const response = await fetch("http://localhost:3000/rooms/" + id);

      const data = await response.json();
      setRoom(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {Object.keys(room).length === 0 ? (
        <p>Room no available</p>
      ) : (
        <div className="">
          <Messages room_id={room.id} room_name={room.name} />
        </div>
      )}
    </div>
  );
};

export default roomItem;
