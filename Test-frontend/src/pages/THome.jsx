import React from "react";
import TAskQues from "../components/TAddQues";
import TNavbar from "../components/TNavbar";
import TPreviousTest from "../components/TPreviousTest";
import Footer from "../components/Footer";
const tHome = () => {
  return (
    <div>
      <TNavbar />
      <TPreviousTest />
      <Footer />
    </div>
  );
};

export default tHome;
