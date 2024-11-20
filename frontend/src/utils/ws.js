// WebSocketInstance.js
let socket;

export const getWebSocket = () => {
  if (!socket) {
    socket = new WebSocket("ws://localhost:3000/cable");
    socket.onopen = () => console.log("WebSocket connected");
    // socket.onclose = () => console.log("WebSocket disconnected");
  }

  if (socket.readyState === WebSocket.OPEN) {
    console.log("Socket is already open");
  } else {
    console.log("Socket is not yet open");
  }

  return socket;
};
