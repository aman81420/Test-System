import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { use } from "react";
import { AppContext } from "../context/AppContext";

const TPreviousTest = ({ teacherId, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherData } = useContext(AppContext);

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
    } catch (error) {
      console.error(error);
      toast.error("Error fetching papers");
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
    <div className="papers-container">
      {loading ? (
        <p>Loading papers...</p>
      ) : papers.length > 0 ? (
        <div>
          <h2>All Papers Saved by Teacher</h2>
          <ul>
            {papers.map((paper) => (
              <li key={paper._id} className="paper-item">
                <div className="paper-details">
                  <h3>{paper.subject}</h3>
                  <p>Total Questions: {paper.totalQuestions}</p>
                  <p>Time: {paper.time} minutes</p>
                  <p>Correct Marks: {paper.correctMarks}</p>
                  <p>Negative Marks: {paper.negativeMarks}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No papers found for this teacher.</p>
      )}
    </div>
  );
};

export default TPreviousTest;
