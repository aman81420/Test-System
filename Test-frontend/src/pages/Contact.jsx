import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f4f7fc] flex flex-col items-center p-6">
        <motion.h2
          className="text-2xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📩 Contact Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full">
          {/* Contact Details Section */}
          <motion.div
            className="space-y-6 text-gray-700"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-500" />
              <p className="text-lg font-medium">support@mocktestpro.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-green-500" />
              <p className="text-lg font-medium">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-red-500" />
              <p className="text-lg font-medium">Delhi, India</p>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#3182ce] text-white font-semibold py-3 rounded-lg hover:bg-[#2b6cb0] transition duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
