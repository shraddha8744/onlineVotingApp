// Navbar.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLognIn = useSelector((state) => state.login.isLoggedIn); // Update state access
  const role = localStorage.getItem("role");

  return (
    <div className="flex justify-end space-x-12 px-14 items-center font-semibold text-xl h-20 bg-cyan-600 text-white fixed top-0 right-0 left-0">
      {isLognIn ? (
        <>
          <p
            className="hover:scale-105 duration-300 mr-3 "
            onClick={() => navigate("/")}
          >
            Home
          </p>
          {role == "admin" && (
            <p
              className="hover:scale-105 duration-300 mr-3 "
              onClick={() => navigate("/add-candidate")}
            >
              Add Candidate
            </p>
          )}
          <p
            className="hover:scale-105 duration-300 mr-7 "
            onClick={() => navigate("/all")}
          >
            All candidate
          </p>
          <p
            className="hover:scale-105 duration-300 mr-7"
            onClick={() => navigate("/profile")}
          >
            Profile
          </p>
          <p
            className="hover:scale-105 duration-300 mr-7"
            onClick={() => navigate("/vote-count")}
          >
            Vote count
          </p>
        </>
      ) : (
        <p
          className="px-5 py-1 rounded-lg bg-yellow-400 shadow-lg hover:bg-yellow-300 hover:text-cyan-500"
          onClick={() => navigate("/login")}
        >
          Login
        </p>
      )}
    </div>
  );
};

export default Navbar;
