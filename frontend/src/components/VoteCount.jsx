import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// const partyImages = {
//   congress:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS64WIB3H0_08oaCIElZdOKkYMdWksH8dJkWA&s",

//   Rashtravadi:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj3jGZVFcx_z8_Py9FplTOaX_7YK88Yfar8w&s",
//<img
// src={partyImages[vote.party]}
// alt={vote.party}
// className="w-16 h-16 rounded-full"
// />
// };

const VoteCount = () => {
  const [voteCounts, setVoteCounts] = useState([]);

  const fetchVoteCounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/vote/count");
      if (response.data.success) {
        setVoteCounts(response.data.data);
      } else {
        toast.error("Failed to fetch vote counts");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchVoteCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Vote Counts</h2>
        {voteCounts.length > 0 ? (
          <div className="space-y-4">
            {voteCounts.map((vote) => (
              <div
                key={vote.party}
                className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-lg">{vote.party}</span>
                </div>
                <span className="font-bold text-xl">{vote.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No votes counted yet.</p>
        )}
      </div>
    </div>
  );
};

export default VoteCount;
