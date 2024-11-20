import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import RoomPage from "./pages/RoomPage";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/protectedroute";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "rooms", // No leading slash
        element: <ProtectedRoute element={<Sidebar />} />,
        children: [
          { index: true, element: <RoomsPage /> },
          {
            path: ":id", // Dynamic route for room ID
            id: "room_id",
            children: [{ index: true, element: <RoomPage /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
