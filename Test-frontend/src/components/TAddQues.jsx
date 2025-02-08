import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TAddQues = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [time, setTime] = useState(0);
  const [correctMarks, setCorrectMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const { teacherData, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Disable scroll for input fields to prevent unwanted behavior
  const preventScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Add event listener to prevent scroll for all input fields
    const inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach((input) => input.addEventListener("wheel", preventScroll));

    // Cleanup event listeners on component unmount
    return () => {
      inputs.forEach((input) =>
        input.removeEventListener("wheel", preventScroll)
      );
    };
  }, []);

  useEffect(() => {
    if (teacherData) {
      setTeacherId(teacherData._id);
    }
  }, [teacherData]); // ✅ Added teacherData as dependency

  // Handle submitting quiz data to the backend
  const handleSubmit = async () => {
    const quizData = {
      subject,
      teacherId,
      totalQuestions,
      time,
      correctMarks,
      negativeMarks,
      questions,
    };

    try {
      console.log("Sending Token:", token); // Debugging line

      const response = await axios.post(
        `${backendUrl}/api/user/saveQuizPaper`,
        quizData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        alert("Quiz saved successfully!");
        navigate("/THome");
      } else {
        alert("Failed to save quiz!");
      }
    } catch (error) {
      console.error("Error submitting quiz data:", error);
      alert("An error occurred while saving the quiz.");
    }
  };

  // Update questions array when any input changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Initialize questions structure properly
  const handleTotalQuestionsChange = (e) => {
    const numQuestions = parseInt(e.target.value, 10);
    setTotalQuestions(numQuestions);
    setQuestions(
      Array.from({ length: numQuestions }).map(() => ({
        questionText: "",
        options: ["", "", "", ""],
        correctOption: null,
      }))
    );
  };

  // Use this function to properly handle input values and avoid unwanted resets
  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value !== "" ? parseInt(value, 10) : 0); // Safely parse value as a number, or set to 0 if empty
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Quiz
      </h1>

      <div className="space-y-6">
        {/* Subject Input */}
        <div>
          <label
            htmlFor="subject"
            className="block text-gray-700 font-medium mb-2"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the subject"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Questions */}
        <div>
          <label
            htmlFor="totalQuestions"
            className="block text-gray-700 font-medium mb-2"
          >
            Total Questions
          </label>
          <input
            id="totalQuestions"
            type="number"
            value={totalQuestions}
            onChange={handleTotalQuestionsChange}
            placeholder="Enter number of questions"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Input */}
        <div>
          <label
            htmlFor="time"
            className="block text-gray-700 font-medium mb-2"
          >
            Time (in minutes)
          </label>
          <input
            id="time"
            type="number"
            value={time}
            onChange={handleInputChange(setTime)} // Use the new generic handler
            placeholder="Enter time in minutes"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Correct Marks */}
        <div>
          <label
            htmlFor="correctMarks"
            className="block text-gray-700 font-medium mb-2"
          >
            Marks for Correct Answer
          </label>
          <input
            id="correctMarks"
            type="number"
            value={correctMarks}
            onChange={handleInputChange(setCorrectMarks)} // Use the new generic handler
            placeholder="Enter marks for correct answer"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Negative Marks */}
        <div>
          <label
            htmlFor="negativeMarks"
            className="block text-gray-700 font-medium mb-2"
          >
            Negative Marks
          </label>
          <input
            id="negativeMarks"
            type="number"
            value={negativeMarks}
            onChange={handleInputChange(setNegativeMarks)} // Use the new generic handler
            placeholder="Enter negative marks"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic input for questions */}
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div>
              <label
                htmlFor={`questionText${index}`}
                className="block text-gray-700 font-medium mb-2"
              >
                Question {index + 1}
              </label>
              <input
                id={`questionText${index}`}
                type="text"
                placeholder={`Enter question ${index + 1}`}
                value={questions[index]?.questionText || ""}
                onChange={(e) =>
                  handleQuestionChange(index, "questionText", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Options for each question */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Options
              </label>
              {questions[index]?.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                />
              ))}
              <input
                type="number"
                placeholder="Correct Option (1-4)"
                value={questions[index]?.correctOption + 1 || ""}
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    "correctOption",
                    parseInt(e.target.value, 10) - 1
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default TAddQues;
