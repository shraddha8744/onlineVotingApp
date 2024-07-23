// PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />; // Redirect to home page or another appropriate page
  }

  return children;
};

export default PublicRoute;
