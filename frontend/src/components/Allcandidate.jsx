import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateCard from "./CandidateCard";

const Allcandidate = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCandidate = async () => {
    try {
      let response = await axios.get("http://localhost:8080/api/all");
      setCandidateData(response?.data?.data); // Fix the data property access
    } catch (err) {
      console.error("Error fetching candidate data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCandidate();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return candidateData.length == 0 ? (
    <div>
      <h1 className="text-3xl font-bold text-center my-10 text-gray-600">
        No candidate data
      </h1>
    </div>
  ) : (
    <div className="bg-slate-100">
      {candidateData.map((candidate) => (
        <CandidateCard
          data={candidate}
          key={candidate._id}
          refreshCandidates={getAllCandidate} // Pass the function as a prop
        />
      ))}
    </div>
  );
};

export default Allcandidate;
