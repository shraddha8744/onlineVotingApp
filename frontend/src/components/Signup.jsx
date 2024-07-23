import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharcardNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:8080/api/signup", data);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 mx-auto p-3 shadow-xl mt-4 rounded-xl">
      <Toaster />
      <h1 className="text-xl pl-4 font-bold text-cyan-600">Signup</h1>
      <div className="px-4 pt-1">
        <form action="">
          <div className="mt-[2px]">
            <label
              htmlFor="username"
              className="text-[18px] text-zinc-900 font-medium"
            >
              Username
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter username"
              name="username"
              onChange={handleInputChange}
              value={data.username}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="age"
              className="text-[18px] text-zinc-900 font-medium"
            >
              Age
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter age"
              name="age"
              onChange={handleInputChange}
              value={data.age}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="email"
              className="text-[18px] text-zinc-900 font-medium"
            >
              Email
            </label>
            <br />
            <input
              type="email"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
              value={data.email}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="mobile"
              className="text-[18px] text-zinc-900 font-medium"
            >
              Mobile
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter mobile number"
              name="mobile"
              onChange={handleInputChange}
              value={data.mobile}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="address"
              className="text-[18px] text-zinc-900 font-medium"
            >
              Address
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter address"
              name="address"
              onChange={handleInputChange}
              value={data.address}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="aadharcardNumber"
              className="text-[17px] text-zinc-900 font-medium"
            >
              Aadharcard Number
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter Aadharcard Number"
              name="aadharcardNumber"
              onChange={handleInputChange}
              value={data.aadharcardNumber}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="password"
              className="text-[17px] text-zinc-900 font-medium"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              className="border w-full py-1 px-2 my-1 text-[17px] rounded outline-none"
              placeholder="Enter password"
              name="password"
              onChange={handleInputChange}
              value={data.password}
              required
            />
          </div>
          <button
            className="w-full py-3 bg-cyan-500 text-white rounded-lg my-4 font-bold text-xl shadow-lg hover:bg-cyan-600"
            onClick={handleButtonClick}
          >
            Signup
          </button>
          <p className="mb-5 mt-1 ml-6 font-semibold">
            Already Registered?{" "}
            <span
              className="text-blue-500 cursor-pointer text-[17px]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
