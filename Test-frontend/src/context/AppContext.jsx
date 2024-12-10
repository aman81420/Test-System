import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState({});
  const [teacherData, setTeacherData] = useState({});

  const [timer, setTimer] = useState(1500); // 25 minutes
  const Questions = assets.questions;
  const totalQues = 15;

  const [quesNo, setQuesNo] = useState(1);
  const [quesStatement, setQuesStatement] = useState(
    "What is the time complexity of binary search?"
  );
  let [quesOptions, setQuesOptions] = useState([]);

  const [quizQuestions, setQuizQuestions] = useState(Questions);

  const [userAns, setUserAns] = useState(Array(totalQues).fill(0));
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the selected option for the current question

  const [questionStatus, setQuestionStatus] = useState(
    Array(totalQues)
      .fill("notVisited")
      .map((status, index) => (index === 0 ? "notAnswered" : status))
  );

  const [isConfirm, setIsConfirm] = useState(false);
  const handlePaperSelect = (paper) => {
    setSelectedPaper(paper);
    setIsConfirm(true);
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

  const updateQuestionState = (questionIndex) => {
    if (questionIndex > 0 && questionIndex <= quizQuestions.length) {
      const currentQuestion = quizQuestions[questionIndex - 1]; // Adjusted index
      setQuesStatement(currentQuestion.question);
      setQuesOptions(currentQuestion.answers);
      setSelectedOption(userAns[questionIndex - 1] || null); // Adjusted index
    } else {
      console.warn("Invalid question index:", questionIndex);
    }
  };

  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/getUserProfile",
        {
          headers: { token },
        }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting teacher profile data
  const loadTeacherProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/getTeacherProfile`,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setTeacherData(data.teacherData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      // loadUserProfileData();
      loadTeacherProfileData();
    }
  }, [token]);

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

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    teacherData,
    setUserData,

    timer,
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
    isConfirm,
    setIsConfirm,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
