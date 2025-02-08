import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Book, Clock, CheckCircle, XCircle, List } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const [papers, setPapers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handlePaperClick = (id) => {
    navigate(`/Quiz-Page/${id}`);
  };

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/getAllPapers`);
        setPapers(response.data.papers || []); // Ensure it's an array
      } catch (error) {
        toast.error("Error fetching papers");
      }
    };
    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        📄 Available Quiz Papers
      </h2>

      {/* Show "No Papers Available" message if no papers exist */}
      {papers.length === 0 ? (
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
              onClick={() => handlePaperClick(paper._id)}
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
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Correct Marks:</span>{" "}
                  {paper.correctMarks}
                </p>
                <p className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">Negative Marks:</span>{" "}
                  {paper.negativeMarks}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSection;
