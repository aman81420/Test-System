import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaperDetails = () => {
  const location = useLocation();
  const { paper } = location.state || {};
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editingQuestionId, setEditingQuestionId] = useState(null); // Track editing question
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""], // Placeholder for 4 options
    correctOption: -1, // Index of the correct option (-1 means no correct option)
  });
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false); // Show form to add new question
  const [updatedPaper, setUpdatedPaper] = useState(paper);

  const handleSaveEdit = async () => {
    // Find the question being edited and update it
    const updatedQuestions = updatedPaper.questions.map((question) => {
      if (question._id === editingQuestionId) {
        return {
          ...question,
          questionText: newQuestion.text,
          options: newQuestion.options,
          correctOption: newQuestion.correctOption,
        };
      }
      return question; // Keep other questions unchanged
    });

    // Update the paper with the modified questions
    const updatedPaperData = {
      paperId: updatedPaper._id, // The paper ID you're updating
      totalQuestions: updatedPaper.totalQuestions,
      subject: updatedPaper.subject,
      time: updatedPaper.time,
      correctMarks: updatedPaper.correctMarks,
      negativeMarks: updatedPaper.negativeMarks,
      questions: updatedQuestions, // Send updated questions
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/updatePaper`,
        updatedPaperData
      );

      if (response.data.success) {
        toast.success("Paper updated successfully");
        setUpdatedPaper((prev) => ({ ...prev, questions: updatedQuestions }));
        setIsEditing(false);
        setEditingQuestionId(null);
      } else {
        toast.error(response.data.message || "Error updating paper");
      }
    } catch (error) {
      console.error("Error saving paper:", error);
      toast.error("Error saving paper");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingQuestionId(null);
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctOption: -1,
    });
  };
  const handleEditClick = (questionId, questionData) => {
    setIsEditing(true);
    setEditingQuestionId(questionId);
    setNewQuestion({
      text: questionData.questionText, // Fill with questionText
      options: questionData.options,
      correctOption: questionData.correctOption,
    });
  };

  const handleAddNewQuestion = async () => {
    // Create the new question object
    const newQuestionObj = {
      questionText: newQuestion.text,
      options: newQuestion.options,
      correctOption: newQuestion.correctOption,
    };

    // Add the new question to the questions array
    const updatedQuestions = [...updatedPaper.questions, newQuestionObj];

    // Update the updatedPaper state with the new questions array
    setUpdatedPaper({ ...updatedPaper, questions: updatedQuestions });

    // Send the updated paper data to the server
    try {
      const updatedPaperData = {
        paperId: updatedPaper._id, // The paper ID you're updating
        totalQuestions: updatedPaper.totalQuestions + 1, // Update totalQuestions
        subject: updatedPaper.subject,
        time: updatedPaper.time,
        correctMarks: updatedPaper.correctMarks,
        negativeMarks: updatedPaper.negativeMarks,
        questions: updatedQuestions, // Updated questions with new one
      };

      const response = await axios.post(
        `${backendUrl}/api/user/updatePaper`,
        updatedPaperData
      );

      if (response.data.success) {
        toast.success("New question added successfully");
      } else {
        toast.error(response.data.message || "Error adding question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Error adding question");
    }

    // Clear the new question form
    setNewQuestion({ text: "", options: ["", "", "", ""], correctOption: -1 });
    setShowNewQuestionForm(false); // Hide the form after adding
  };

  const handleNewQuestionChange = (e, index) => {
    if (index === "text") {
      setNewQuestion((prev) => ({ ...prev, text: e.target.value }));
    } else if (index === "correctOption") {
      setNewQuestion((prev) => ({
        ...prev,
        correctOption: parseInt(e.target.value),
      }));
    } else {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[index] = e.target.value;
      setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    }
  };

  if (!updatedPaper) {
    return (
      <p className="text-center text-lg text-gray-700">
        Paper details not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Paper Details */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {updatedPaper.subject}
          </h1>
          <p className="text-gray-600">
            <span className="font-semibold">Total Questions:</span>{" "}
            {updatedPaper.totalQuestions}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Time:</span> {updatedPaper.time}{" "}
            minutes
          </p>
        </div>

        {/* Questions Section */}
        {updatedPaper.questions?.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Questions
            </h2>
            <ul className="space-y-4">
              {updatedPaper.questions.map((question, index) => (
                <li
                  key={question._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  {/* Edit/Save Button */}
                  {isEditing && editingQuestionId === question._id ? (
                    <div className="flex justify-between mb-3">
                      <button
                        onClick={() => handleSaveEdit(paper._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(question._id, question)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md mb-3"
                    >
                      Edit
                    </button>
                  )}

                  {/* Question Text */}
                  {isEditing && editingQuestionId === question._id ? (
                    <input
                      type="text"
                      value={newQuestion.text}
                      onChange={(e) => handleNewQuestionChange(e, "text")}
                      className="w-full p-2 border border-gray-300 rounded-md mb-3"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-800 mb-3">
                      Q{index + 1}:{" "}
                      {question.questionText || "No question text available"}
                    </p>
                  )}

                  {/* Options */}
                  {isEditing && editingQuestionId === question._id ? (
                    <ul className="space-y-2">
                      {question.options.map((option, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="mr-2 font-semibold text-gray-500">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <input
                            type="text"
                            value={newQuestion.options[idx]}
                            onChange={(e) => handleNewQuestionChange(e, idx)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <div className="mt-2">
                            <label>
                              <input
                                type="radio"
                                name={`correctOption-${question._id}`}
                                value={idx}
                                checked={newQuestion.correctOption === idx}
                                onChange={(e) =>
                                  handleNewQuestionChange(e, "correctOption")
                                }
                                className="mr-2"
                              />
                              Correct Option
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2">
                      {question.options.map((option, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center text-gray-700 ${
                            question.correctOption === idx
                              ? "font-semibold text-green-500"
                              : ""
                          }`}
                        >
                          <span className="mr-2 font-semibold text-gray-500">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">No questions available</p>
        )}

        {/* Add More Questions */}
        <div className="mt-6">
          {showNewQuestionForm ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add a New Question
              </h3>
              <input
                type="text"
                value={newQuestion.text}
                onChange={(e) => handleNewQuestionChange(e, "text")}
                placeholder="Enter question text"
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
              />
              <ul className="space-y-2 mb-4">
                {newQuestion.options.map((option, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 font-semibold text-gray-500">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleNewQuestionChange(e, idx)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </li>
                ))}
              </ul>

              {/* Correct Option Selection */}
              <div className="mt-4">
                <h4 className="text-gray-600 font-semibold mb-2">
                  Select Correct Option
                </h4>
                <div className="flex items-center space-x-4">
                  {newQuestion.options.map((_, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="correctOption"
                        value={idx}
                        checked={newQuestion.correctOption === idx}
                        onChange={(e) =>
                          handleNewQuestionChange(e, "correctOption")
                        }
                        className="mr-2"
                      />
                      <span>{String.fromCharCode(65 + idx)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddNewQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Add Question
              </button>
              <button
                onClick={() => setShowNewQuestionForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-3 mt-4"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowNewQuestionForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add New Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;
