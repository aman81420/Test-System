import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState({});
  const [teacherData, setTeacherData] = useState({});
  const [userType, setUserType] = useState("student");

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    teacherData,
    setUserData,
    userType,
    setUserType,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
