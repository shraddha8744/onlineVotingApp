import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CandidateCard = ({ data, refreshCandidates }) => {
  const navigate = useNavigate();
  const { url, candidateName, party, _id } = data;
  const userRole = localStorage.getItem("role");

  const voteForCandidate = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      ("err");
      console.log();
    }

    try {
      let response = await axios.post(
        `http://localhost:8080/api/candidate/${id}`,
        {}, // Sending an empty body
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  //delete user details
  const deleteCandidate = async (id) => {
    const token = localStorage.getItem("token");

    try {
      let response = await axios.delete(`http://localhost:8080/api/${id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        refreshCandidates(); // Refresh the candidate list
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="flex mx-24 mb-5 space-x-40 border-b border-gray-300 bg-white">
      <Toaster />
      <div className="p-4 w-1/4 ml-28 shadow-xl my-3 rounded-lg">
        <p className="text-center font-bold text-2xl text-red-600">{party}</p>
        <hr className="mt-3" />
        <img
          src={url}
          alt=""
          className="w-[95%] h-[200px] object-contain p-2 my-3 rounded-xl "
        />
        <hr />
        <h1 className="font-semibold text-center">{candidateName}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <button
            className="px-10 py-4 bg-cyan-500 text-white text-2xl font-semibold rounded-lg outline-none shadow-xl hover:bg-cyan-600 hover:text-yellow-300"
            onClick={() => voteForCandidate(_id)}
          >
            Vote
          </button>
        </div>
        <div className="flex space-x-5 py-5">
          {userRole == "admin" ? (
            <>
              <button
                className="m-2 px-4 py-2 shadow-lg rounded-lg  bg-green-500 text-white text-xl font-semibold hover:bg-green-600"
                onClick={() => navigate(`/edit/${_id}`)}
              >
                update user
              </button>
              <button
                className="m-2 px-4 py-2 shadow-lg rounded-lg bg-red-500 font-semibold text-white text-xl hover:bg-red-600"
                onClick={() => deleteCandidate(_id)}
              >
                delete user
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CandidateCard;
