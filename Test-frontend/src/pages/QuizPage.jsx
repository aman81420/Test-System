import React, { useContext, useState, useEffect } from "react";
import assets from "../assets/assets";
import { AppContext } from "../context/AppContext";

const QuizPage = () => {
  const {
    quesNo,

    quesOptions,
    setQuesOptions,

    totalQues,
    questionStatus,

    selectedOption,
    setSelectedOption,
    userAns,
    questionClickHandler,
    handleSaveAndNext,
    handleClearResponse,
    handleMarkForReview,
    getButtonClass,
    quizQuestions,

    quesStatement,
    setQuesStatement,
    timer,
  } = useContext(AppContext);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update question details when `quesNo` changes
  useEffect(() => {
    if (quesNo > 0 && quesNo <= quizQuestions.length) {
      const currentQuestion = quizQuestions[quesNo - 1]; // Adjusted index
      setQuesStatement(currentQuestion.question);
      setQuesOptions(currentQuestion.answers);

      // Pre-select an option if already answered
      setSelectedOption(userAns[quesNo - 1] || null); // Adjusted index
    }
  }, [quesNo, quizQuestions, userAns, questionStatus]);

  return (
    <div
      id="DSA-view"
      className="m-0 p-0 overflow-x-auto  max-width:100% min-width:1000px"
    >
      <div className="h-screen w-screen grid lg:grid-cols-4 lg:grid-rows-8 grid-cols-2">
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
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question Status Section */}
        <div className="grid grid-rows-2 grid-cols-2 border-2 row-start-2 row-end-4 col-start-4 col-end-5 text-gray-800 font-semibold">
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
        <div className="border-x-2 row-start-4 row-end-8">
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
        <div className="border-y-2 flex justify-center items-center">
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
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
