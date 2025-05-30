"use client"

import React, { useState, useEffect } from "react"
import { FiUser, FiMail, FiBook, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  // API URL based on environment
  const BASE_URL = import.meta.env.PROD 
    ? 'https://backendportfolio-5m1b.onrender.com'
    : 'http://localhost:3001';

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${BASE_URL}/health`);
        const data = await response.json();
        console.log('API Health Check:', data);
      } catch (error) {
        console.error('API Connection Error:', error);
      }
    };
    testConnection();
  }, [BASE_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError("") // Clear any previous errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setError("")

    try {
      const url = `${BASE_URL}/send-email`;
      console.log('Making request to:', {
        url,
        baseUrl: BASE_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: formData
      });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log('Raw response text:', text);

      let responseData;
      try {
        responseData = JSON.parse(text);
        console.log('Parsed response data:', responseData);
      } catch (e) {
        console.error('Failed to parse response as JSON:', text);
        throw new Error('Server returned invalid JSON');
      }

      if (!response.ok) {
        console.error('Request failed:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        throw new Error(responseData.message || `Server error: ${response.status}`);
      }

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to send message');
      }

      console.log('Success response:', responseData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessMessage = () => (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <FiCheckCircle className="text-xl" />
          <span>Message sent successfully!</span>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <section id="contact" className="relative m-5 rounded-lg py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <SuccessMessage />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 relative">
            Get in Touch
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed">
              Have a project in mind? Let's create something amazing together. Whether it's web development, 
              UI/UX design, or just a chat about technology, I'm here to help.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiMail className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-300 font-medium">Email Me</h3>
                  <p className="text-gray-400">ramiferjani.20@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiUser className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-300 font-medium">Social Media</h3>
                  <p className="text-gray-400">Connect on LinkedIn or WhatsApp</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl"
          >
            {error && (
              <div className="text-red-500 bg-red-100/10 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4 w-4/5">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative">
                <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 h-40"
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-5/6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Sending...
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.span>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}