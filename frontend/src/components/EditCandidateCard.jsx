import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditCandidateCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    candidateName: "",
    url: "",
    party: "",
    age: "",
  });

  const Loaduser = () => {
    axios
      .get(`http://localhost:8080/api/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setData(result.data.data);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Loaduser();
  }, []);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  //update user details
  const updateUserDetails = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let response = await axios.put(
        `http://localhost:8080/api/${id}`,
        data, // Sending an empty body
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        // navigate("/all");
      }
    } catch (err) {
      // toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="w-1/3 mx-auto p-3 shadow-xl mt-4 rounded-xl">
      <Toaster />
      <h1 className="text-xl pl-4 font-bold text-cyan-600">Add Candidate</h1>
      <div className="px-4 pt-1">
        <form action="">
          <div className="mt-[5px]">
            <label
              htmlFor="candidateName"
              className="text-[18px] text-zinc-900 font-medium"
            >
              CandidateName
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter username"
              name="candidateName"
              onChange={handleInputChange}
              value={data.candidateName}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="url"
              className="text-[18px] text-zinc-900 font-medium"
            >
              url
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter age"
              name="url"
              onChange={handleInputChange}
              value={data.url}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="party"
              className="text-[18px] text-zinc-900 font-medium"
            >
              party
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter email"
              name="party"
              onChange={handleInputChange}
              value={data.party}
              required
            />
          </div>
          <div className="mt-[2px]">
            <label
              htmlFor="age"
              className="text-[18px] text-zinc-900 font-medium"
            >
              age
            </label>
            <br />
            <input
              type="text"
              className="border w-full py-1 my-1 px-2 text-[17px] rounded outline-none"
              placeholder="Enter mobile number"
              name="age"
              onChange={handleInputChange}
              value={data.age}
              required
            />
          </div>

          <button
            className="w-full py-3 bg-cyan-500 text-white rounded-lg my-4 font-bold text-xl shadow-lg hover:bg-cyan-600"
            onClick={updateUserDetails}
          >
            Edit Candidate{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateCard;
