// components/Initialize.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeRole, login } from "../slice/userSlice";

const LoginStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(login());
      dispatch(changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return null;
};

export default LoginStatus;
