import React from "react";
import main from "../assets/images/9.jpeg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isLognIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (isLognIn) {
      navigate("/all"); // Redirect to AllCandidate page
    } else {
      navigate("/login"); // Redirect to Login page
    }
  };

  return (
    <div className="flex px-20 bg-gray-50 h-screen">
      <div className="my-48 pl-12">
        <h1 className="font-bold text-4xl">ONLINE VOTING</h1>
        <div className="w-[450px] my-8 font-semibold text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas id
            expedita repudiandae sit sequi cupiditate recusandae quia assumenda
            inventore aspernatur nihil velit, illo voluptatibus ab modi quo
            consequuntur soluta?
          </p>
        </div>
        <button
          onClick={handleClick}
          className="px-4 py-2 mt-4 rounded-lg bg-yellow-400 shadow-xl hover:bg-yellow-300 hover:text-cyan-500 text-white font-semibold text-xl"
        >
          {isLognIn ? "Click here for voting" : "For continue login"}
        </button>
      </div>
      <div className="w-full flex justify-end items-center">
        <img
          src={main}
          alt="Voting Image"
          className="h-auto w-[700px] mix-blend-multiply"
        />
      </div>
    </div>
  );
};

export default HomePage;
