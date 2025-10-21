import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authContext/authContext";

export default function ProtectedCart({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
