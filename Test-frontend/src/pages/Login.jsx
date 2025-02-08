import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("log in");
  const [userType, setUserType] = useState("student"); // Default user type
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [teacherId, setTeacherId] = useState("");
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let endpoint;
    if (userType === "student") {
      endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
    } else {
      endpoint =
        state === "Sign Up"
          ? "/api/user/registerTeacher"
          : "/api/user/loginTeacher";
    }

    let payload;
    if (userType === "student") {
      payload =
        state === "Sign Up"
          ? { name, email, password, userType }
          : { email, password, userType };
    }

    if (userType === "teacher") {
      payload =
        state === "Sign Up"
          ? { name, email, password, userType, teacherId }
          : { email, password, userType };
    }

    const { data } = await axios.post(backendUrl + endpoint, payload);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (token && userType === "student") {
      navigate("/");
    } else if (token && userType === "teacher") navigate("/THome");
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-gray-50">
        <p className="text-2xl font-semibold text-gray-700">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-600">
          Please {state === "Sign Up" ? "sign up" : "log in"} to access the
          portal
        </p>

        <div className="flex gap-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              userType === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              userType === "teacher"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setUserType("teacher")}
          >
            Teacher
          </button>
        </div>

        {state === "Sign Up" && (
          <div className="w-full">
            <p className="text-gray-700">Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full relative">
          <p className="text-gray-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded w-full p-2 mt-1"
            type={showPassword ? "text" : "password"} // Toggle input type
            required
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>
        <button className="bg-blue-500 text-white w-full py-2 my-2 rounded-md text-base hover:bg-blue-600 transition-all">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-600">
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
