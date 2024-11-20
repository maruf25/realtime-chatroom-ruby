import React, { useEffect, useRef, useState } from "react";
import { getWebSocket } from "../utils/ws";
import { Link } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketProvider";

const messages = (props) => {
  const userId = localStorage.getItem("user_id");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef();
  const { socket } = useWebSocket();

  useEffect(() => {
    // const socket = getWebSocket();

    // socket.onopen = () => {
    //   console.log("connected to websocket server room_" + props.room_id);

    if (socket) {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: props.room_id,
            channel: `MessagesChannel`,
            // room: props.room_id,
          }),
        })
      );
      // };

      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.type === "ping") return;
        if (data.type === "welcome") return;
        if (data.type === "confirm_subscription") return;

        if (data.message.type === "Chat") {
          fetchMessages();
          scrollToBottom();
        }
      };
    }

    fetchMessages();

    return () => {
      // socket.onmessage = null;
    };
  }, [props.room_id, socket]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages?room_id=" + props.room_id, {
        method: "GET",
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: message,
          user_id: userId,
          room_id: props.room_id,
        }),
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 font-bold text-white bg-blue-500">
        <Link to={"/rooms"} className="text-white">
          Back
        </Link>

        <div className="flex-1 text-center">{props.room_name}</div>
      </div>

      {/* Message Area */}
      <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length > 0 &&
          messages.map((message) => (
            <div
              key={message.id}
              id={`message`}
              className={`p-3 rounded-lg max-w-xs ${
                message.user_id == userId
                  ? "bg-blue-500 self-end text-white"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {message.body}
            </div>
          ))}
        <div ref={messagesEndRef} className="p-3"></div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-4 bg-white border-t border-gray-300"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default messages;
