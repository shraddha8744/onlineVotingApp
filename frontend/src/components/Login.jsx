import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slice/userSlice";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setpassword] = useState(true);
  const [data, setData] = useState({
    aadharcardNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setpassword(!password);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:8080/api/login", data);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(login());
        // Navigate to another page if login is successful
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("token", response.data.data.token);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        toast.error(
          "No response received from the server. Please try again later."
        );
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred while setting up the request.");
      }
      console.error(error);
    }
  };

  return (
    <div className="w-1/3 m-auto p-3 shadow-xl my-24 rounded-xl">
      <Toaster />
      <h1 className="text-2xl pl-4 py-3 font-bold text-cyan-600">Login</h1>
      <div className="p-4">
        <form>
          <div>
            <label
              htmlFor="aadharcardNumber"
              className="text-[18px] text-zinc-900 font-semibold"
            >
              Aadharcard Number
            </label>
            <input
              type="text"
              className="border w-full py-3 my-3 px-2 text-[17px] rounded outline-none"
              placeholder="Enter Aadharcard Number"
              onChange={handleInputChange}
              name="aadharcardNumber"
              value={data.aadharcardNumber}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-[18px] text-zinc-900 font-semibold"
            >
              Password
            </label>
            <div className="border w-full py-3 px-2 my-3 flex justify-between">
              <input
                type={password ? "password" : "text"}
                className=" text-[17px] rounded outline-none"
                placeholder="Enter password"
                onChange={handleInputChange}
                name="password"
                value={data.password}
              />
              {password ? (
                <FiEye size={23} onClick={handleClick} />
              ) : (
                <IoMdEyeOff size={23} onClick={handleClick} />
              )}
            </div>
          </div>
          <button
            className="w-full py-3 bg-cyan-500 text-white rounded-lg my-4 font-bold text-xl shadow-lg hover:bg-cyan-600"
            onClick={handleButtonClick}
          >
            Login
          </button>
          <p className="mb-5 mt-1 ml-6 font-semibold">
            New user?{" "}
            <span
              className="text-blue-500 cursor-pointer text-[17px]"
              onClick={() => navigate("/signup")}
            >
              Signup Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
