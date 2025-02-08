import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, List } from "lucide-react";

const TPreviousTest = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherData, token } = useContext(AppContext);
  const navigate = useNavigate();

  // API call to get papers by teacherId
  const loadTeacherPapers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/getPaper`, {
        headers: { token },
      });

      if (data.success) {
        setPapers(data.papers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
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

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        📄 Previous Quiz Papers
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading papers...</p>
      ) : papers.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold">
          ❌ No Papers Available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {papers.map((paper, index) => (
            <motion.div
              key={paper._id}
              className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500 cursor-pointer"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                <Book className="w-6 h-6 text-blue-500" /> {paper.subject}
              </h3>
              <div className="mt-3 text-gray-700 space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <List className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Total Questions:</span>{" "}
                  {paper.totalQuestions}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Time:</span> {paper.time}{" "}
                  minutes
                </p>
                <button
                  className="mt-4 bg-[#3182ce] text-white text-sm px-4 py-2 rounded hover:bg-[#225d9c] transition duration-300"
                  onClick={() =>
                    navigate(`/paper/${paper._id}`, { state: { paper } })
                  }
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TPreviousTest;
