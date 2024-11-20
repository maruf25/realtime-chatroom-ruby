import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/cable");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };

    return () => {
      // ws.close();
    };
  }, []);

  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>;
};

export default WebSocketProvider;
