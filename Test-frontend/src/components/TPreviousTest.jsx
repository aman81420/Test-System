import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TPreviousTest = ({ teacherId, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherData } = useContext(AppContext);
  const navigate = useNavigate(); // Initialize inside the component

  // API call to get papers by teacherId
  const loadTeacherPapers = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/getPaper`, {
        teacherId: teacherData.teacherId,
      });

      if (data.success) {
        setPapers(data.papers); // Set the papers in state
      } else {
        toast.error(data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch teacher papers when component mounts or teacherId changes
  useEffect(() => {
    if (teacherData) {
      loadTeacherPapers();
    }
  }, [teacherData]);

  // Render the papers
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading papers...</p>
      ) : papers.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            All Papers Saved by Teacher
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper._id}
                className="bg-white shadow-lg rounded-lg p-4 border"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {paper.subject}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Time: {paper.time} minutes
                </p>
                <p className="text-sm text-gray-600">
                  Total Questions: {paper.totalQuestions}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() =>
                    navigate(`/paper/${paper._id}`, { state: { paper } })
                  }
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700">
          No papers found for this teacher.
        </p>
      )}
    </div>
  );
};

export default TPreviousTest;
