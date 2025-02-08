import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import THome from "./pages/THome";
import TAskQues from "./components/TAddQues";
import PaperDetails from "./components/PaperDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Quiz-Page" element={<QuizPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/THome" element={<THome />} />
        <Route path="/About" element={<About />} />
        <Route path="/TAddQues" element={<TAskQues />} />
        <Route path="/paper/:id" element={<PaperDetails />} />
      </Routes>
    </div>
  );
};

export default App;
