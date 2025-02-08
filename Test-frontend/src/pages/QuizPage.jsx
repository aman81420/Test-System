import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const QuizPage = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [timer, setTimer] = useState(1500);
  const [quesNo, setQuesNo] = useState(1);
  const [quesStatement, setQuesStatement] = useState("");
  const [quesOptions, setQuesOptions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [totalQues, setTotalQues] = useState(0);
  const [userAns, setUserAns] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);

  // Fetch quiz questions
  const fetchPaperById = async (paperId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/getPaperById/${paperId}`
      );

      if (data.success) {
        setQuizQuestions(data.paper.questions);

        setTotalQues(data.paper.totalQuestions);
        setTimer(data.paper.time * 60);
        setUserAns(Array(data.paper.totalQuestions).fill(0));
        setQuestionStatus(Array(data.paper.totalQuestions).fill("notVisited"));

        // Set first question
        if (data.paper.questions.length > 0) {
          setQuesStatement(data.paper.questions[0].questionText);
          setQuesOptions(data.paper.questions[0].options); // Ensure options exist
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching paper details:", error);
      toast.error("Error fetching paper details.");
    }
  };

  const handleSubmit = () => {
    const answeredCount = userAns.filter((ans) => ans !== 0).length;
    const notAnsweredCount = totalQues - answeredCount;

    const correctAnswers = quizQuestions.map((q) => q.correctOption + 1); //   1-based indexing

    const correctCount = userAns.filter(
      (ans, index) => ans === correctAnswers[index]
    ).length;
    const incorrectCount = answeredCount - correctCount;

    const quizResult = {
      totalQuestions: totalQues,
      answered: answeredCount,
      notAnswered: notAnsweredCount,
      correct: correctCount,
      incorrect: incorrectCount,
      userAnswers: userAns.map((ans, index) => ({
        question: quizQuestions[index]?.questionText,
        options: quizQuestions[index]?.options,
        selectedOption:
          ans > 0 ? quizQuestions[index]?.options[ans - 1] : "Not Answered", // Convert to 1-based
        correctOption: quizQuestions[index]?.options[correctAnswers[index] - 1], // Convert to 1-based
      })),
    };

    navigate("/result", { state: { quizResult } });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleMarkForReview = () => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[quesNo - 1] = "markForReview";
      return newStatus;
    });

    if (quesNo < totalQues) {
      setQuesNo((prev) => prev + 1);
    }

    setSelectedOption(null);
  };

  const questionClickHandler = (num) => {
    setQuesNo(num);
    updateQuestionState(num);

    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      if (newStatus[num - 1] === "notVisited") {
        newStatus[num - 1] = "notAnswered";
      }
      return newStatus;
    });
  };

  const updateQuestionState = (questionIndex) => {
    if (quizQuestions.length === 0) {
      console.warn("Quiz questions are not loaded yet.");
      return;
    }

    if (questionIndex > 0 && questionIndex <= quizQuestions.length) {
      const currentQuestion = quizQuestions[questionIndex - 1]; // Adjusted index
      setQuesStatement(
        currentQuestion.question || "No question text available"
      );
      setQuesOptions(currentQuestion.answers || []);
      setSelectedOption(userAns[questionIndex - 1] || null);
    } else {
      console.warn("Invalid question index:", questionIndex);
    }
  };

  // Handle Save & Next button click
  const handleSaveAndNext = () => {
    if (selectedOption !== null) {
      setUserAns((prev) => {
        const newAns = [...prev];
        newAns[quesNo - 1] = selectedOption;
        return newAns;
      });

      setQuestionStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[quesNo - 1] = "answered";
        if (newStatus[quesNo] == "notVisited")
          newStatus[quesNo] = "notAnswered";
        return newStatus;
      });
    }

    if (quesNo < totalQues) {
      setQuesNo((prev) => prev + 1);
    }

    setSelectedOption(null); // Reset selected option
  };

  const handleClearResponse = () => {
    setUserAns((prev) => {
      const newAns = [...prev];
      newAns[quesNo - 1] = 0; // Clear the answer for the current question
      return newAns;
    });

    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[quesNo - 1] = "notAnswered"; // Mark as not answered
      return newStatus;
    });

    setSelectedOption(null); // Clear the selected option in the UI
  };

  const getButtonClass = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-600";
      case "notAnswered":
        return "bg-red-600";
      case "visited":
        return "bg-gray-400";
      case "markForReview":
        return "bg-violet-500";
      default:
        return "bg-gray-400";
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleTimeEnd();
    }
  }, [timer]);
  const handleTimeEnd = () => {
    console.log("Time's up!");
    // Add your auto-submit logic here
  };

  // Update question details when `quesNo` changes
  useEffect(() => {
    if (quesNo > 0 && quesNo <= quizQuestions.length) {
      const currentQuestion = quizQuestions[quesNo - 1];
      setQuesStatement(currentQuestion.questionText); // ✅ Correct field
      setQuesOptions(currentQuestion.options || []); // ✅ Ensure options exist

      setSelectedOption(userAns[quesNo - 1] || null);
    }
  }, [quesNo, quizQuestions, userAns]);
  useEffect(() => {}, [isConfirm]);

  // to disable the reload and back option
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    fetchPaperById("67a6974392b6ec8fdbe15571");
    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBackNavigation);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return !isConfirm ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to start the test?
        </h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsConfirm(true)}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Yes, Start
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      id="DSA-view"
      className="m-0 p-0 overflow-x-auto  max-width:100% min-width:1000px"
    >
      <div className="h-screen w-screen md:grid lg:grid-cols-4 lg:grid-rows-8 grid-cols-2">
        {/* Header */}
        <div className="col-start-1 col-end-4 text-2xl text-blue-950 font-semibold m-3">
          Mock Test(DSA)
        </div>

        {/* Timer Section */}
        <div className="text-sm text-gray-800 font-semibold m-4 text-center">
          Remaining Time:{" "}
          <span className="border-2 rounded-2xl bg-green-200 px-3 text-xl">
            {formatTime(timer)}
          </span>
        </div>

        {/* Question Section */}
        <div className="row-start-2 row-end-8 col-start-1 col-end-4">
          <div className="border-y-2 lg:flex items-center justify-between p-2">
            <div className="text-xl font-semibold px-4" id="ques1">
              {" "}
              Question:{quesNo}{" "}
            </div>
            <div className="text-gray-800">
              Marks for correct response:{" "}
              <span className="text-green-900 font-semibold">1.00</span> |
              Negative marking:{" "}
              <span className="font-semibold text-red-700">0.00</span>
            </div>
          </div>

          <div className="m-4 text-gray-800 font-semibold">
            <p id="ques" className="text-gray-800 font-semibold text-xl">
              {quesStatement}{" "}
            </p>

            {/* Options */}
            {quesOptions.map((option, index) => (
              <div
                key={index}
                className="m-4 flex items-center text-lg hover:bg-blue-200 cursor-pointer"
              >
                <input
                  id={`opt${index + 1}`}
                  type="radio"
                  name="option"
                  className="form-radio m-2"
                  checked={selectedOption === index + 1} // Highlight based on selection
                  onChange={() => setSelectedOption(index + 1)} // Set selected option
                />
                <label
                  id={`option${index + 1}`}
                  htmlFor={`opt${index + 1}`}
                  className="font-semibold text-gray-800"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question Status Section */}

        <div className=" hidden md:grid grid-rows-2 grid-cols-2 border-2 row-start-2 row-end-4 col-start-4 col-end-5 text-gray-800 font-semibold">
          <div className="flex items-center justify-start">
            <div className="h-7 w-7 rounded-lg bg-green-600 m-3"></div>
            <div>Answered</div>
          </div>
          <div className="flex items-center justify-start">
            <div className="h-7 w-7 rounded-lg bg-gray-400 m-3"></div>
            <div>Not Visited</div>
          </div>
          <div className="flex items-center justify-start">
            <div className="h-7 w-7 rounded-lg bg-red-600 m-3"></div>
            <div>Not Answered</div>
          </div>
          <div className="flex items-center justify-start">
            <div className="h-7 w-7 rounded-lg bg-violet-500 m-3"></div>
            <div>Mark for Review</div>
          </div>
        </div>

        {/* Question Navigation Buttons */}
        <div className=" border-x-2 row-start-4 row-end-8">
          <p className="text-center font-bold p-2">Choose a question</p>
          <div className="grid lg:grid-cols-4 lg:grid-rows-4 grid-cols-2">
            {Array.from({ length: totalQues }, (_, i) => (
              <div
                onClick={() => questionClickHandler(i + 1)}
                key={i}
                id={`btn${i + 1}`}
                className={`cursor-pointer h-12 w-12 rounded-lg m-3 flex items-center justify-center text-white text-xl ${getButtonClass(
                  questionStatus[i]
                )}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-y-2 flex flex-col md:flex-row justify-center items-center">
          {" "}
          {/* Flex direction for responsiveness */}
          <button
            id="markReview"
            onClick={handleMarkForReview}
            className="border-2 px-3 py-1 text-gray-800 font-semibold"
          >
            Mark for Review & Next
          </button>
        </div>
        <div className="border-y-2 flex justify-center items-center">
          <button
            id="clearResponse"
            onClick={handleClearResponse}
            className="border-2 px-3 py-1 text-gray-800 font-semibold"
          >
            Clear Response
          </button>
        </div>
        <div className="border-y-2 flex justify-center items-center">
          <button
            id="saveNext"
            className={`border-2 px-3 py-1 text-white font-semibold ${
              selectedOption === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
            onClick={handleSaveAndNext}
            disabled={!selectedOption} // Disable button if no option is selected
          >
            Save & Next
          </button>
        </div>

        <div className="border-2 flex justify-center items-center">
          <button
            id="submit-btn"
            className="border-2 px-3 py-1 text-white font-semibold bg-blue-950"
            onClick={handleSubmit} // Add this
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
