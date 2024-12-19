import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import THome from "./pages/tHome";
import TAskQues from "./components/TAddQues";
import PaperDetails from "./components/PaperDetails";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quiz-Page" element={<QuizPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/THome" element={<THome />} />
        <Route path="/TAddQues" element={<TAskQues />} />
        <Route path="/paper/:id" element={<PaperDetails />} />
      </Routes>
    </div>
  );
};

export default App;
