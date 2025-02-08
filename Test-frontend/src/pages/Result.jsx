import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.quizResult || !state.quizResult.userAnswers) {
    return <div>No quiz data available.</div>;
  }

  const {
    totalQuestions,
    answered,
    notAnswered,
    correct,
    incorrect,
    userAnswers = [], // Ensure it's always an array
  } = state.quizResult;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Quiz Result</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <p className="text-lg font-semibold">
          Total Questions: {totalQuestions}
        </p>
        <p className="text-green-600">Answered: {answered}</p>
        <p className="text-red-600">Not Answered: {notAnswered}</p>
        <p className="text-green-500">Correct Answers: {correct}</p>
        <p className="text-red-500">Incorrect Answers: {incorrect}</p>
      </div>

      <div className="mt-6 w-3/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Answer Review</h2>
        {userAnswers.map((qa, index) => (
          <div key={index} className="border-b pb-2 mb-2">
            <p className="font-medium">
              {index + 1}. {qa.question}
            </p>
            <p className="text-gray-700">Options:</p>
            <ul className="list-disc pl-5">
              {qa.options.map((option, optIndex) => (
                <li
                  key={optIndex}
                  className={`${
                    qa.selectedOption === option
                      ? qa.correctOption === option
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p className="text-blue-700">Your Answer: {qa.selectedOption}</p>
            <p className="text-green-700">Correct Answer: {qa.correctOption}</p>
          </div>
        ))}
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ResultPage;
