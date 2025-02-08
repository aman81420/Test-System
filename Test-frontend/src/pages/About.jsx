import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckSquare, Users, MonitorPlay, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate("/"); // Navigate to home
  };
  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#f4f7fc] p-8">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🚀 Welcome to Our Mock Test Platform!
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center max-w-3xl mx-auto mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          An advanced online platform where users can **solve questions, take
          mock tests, and enhance their knowledge**. With an intuitive UI and
          seamless experience, we bring you an **interactive and user-friendly
          test environment** similar to top **online exam platforms**.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1: Interactive Mock Tests */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
              <CheckSquare className="w-7 h-7 text-blue-500" /> Interactive Mock
              Tests
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Take **real-time mock tests** that simulate **actual online
              exams**, with a **smooth interface and instant feedback**.
            </p>
          </motion.div>

          {/* Feature 2: Wide Range of Subjects */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-green-500" /> Wide Range of
              Subjects
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Solve **MCQs and quizzes** across different subjects like
              **Mathematics, Science, Coding, and more**.
            </p>
          </motion.div>

          {/* Feature 3: Real-Time Performance Tracking */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-yellow-600 flex items-center gap-2">
              <MonitorPlay className="w-7 h-7 text-yellow-500" /> Real-Time
              Performance Tracking
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Get **instant results and performance analysis** with **detailed
              scorecards, accuracy reports, and time tracking**.
            </p>
          </motion.div>

          {/* Feature 4: User-Friendly UI */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
              <Users className="w-7 h-7 text-purple-500" /> User-Friendly UI
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Experience a **clean, distraction-free interface** designed for
              **seamless navigation and efficient test-taking**.
            </p>
          </motion.div>

          {/* Feature 5: Time-Limited Tests */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
              <Clock className="w-7 h-7 text-red-500" /> Time-Limited Tests
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Attempt tests with **countdown timers** to **build speed and
              accuracy** like real online exams.
            </p>
          </motion.div>

          {/* Feature 6: Secure & Reliable */}
          <motion.div
            className="bg-white border border-gray-300 shadow-md rounded-xl p-5 hover:shadow-xl transition duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-teal-600 flex items-center gap-2">
              <CheckSquare className="w-7 h-7 text-teal-500" /> Secure &
              Reliable
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              Our platform ensures **secure authentication, protected test data,
              and reliable performance**.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <motion.button
            className="bg-[#3182ce] text-white text-lg px-6 py-3 rounded hover:bg-[#225d9c] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
          >
            Start Your Journey 🚀
          </motion.button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
