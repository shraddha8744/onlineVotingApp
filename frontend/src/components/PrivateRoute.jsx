// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
