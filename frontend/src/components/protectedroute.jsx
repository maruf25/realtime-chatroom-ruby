import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");

  if (!userId || !name) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
