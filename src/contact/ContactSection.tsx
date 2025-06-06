"use client"

import React, { useState, useEffect } from "react"
import { FiUser, FiMail, FiBook, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { testConnection, sendEmail } from '../utils/api';

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
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  })

  // Test API connection on component mount
  useEffect(() => {
    testConnection().catch(error => {
      console.error('Failed to connect to API:', error);
    });
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError("")
    setFieldErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    // Validate all fields
    const newFieldErrors = {
      name: !formData.name.trim(),
      email: !validateEmail(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    }
    
    setFieldErrors(newFieldErrors)

    // If any field has error, don't submit
    if (Object.values(newFieldErrors).some(error => error)) {
      setError("Please fill all fields correctly")
      return
    }
    
    setIsSubmitting(true)
    setError("")

    try {
      const responseData = await sendEmail(formData);
      console.log('Success response:', responseData);
      
      if (responseData.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error(responseData.message || 'Failed to send message');
      }
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

  const ErrorAnimation = ({ show }: { show: boolean }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: show ? 1 : 0,
        opacity: show ? 1 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        duration: 0.3
      }}
      className="absolute -right-8 top-1/2 -translate-y-1/2"
    >
      <motion.div 
        className="text-red-500 text-xl bg-red-100/20 p-1 rounded-full shadow-lg"
        animate={show ? {
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, -10, 0],
          backgroundColor: ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.2)']
        } : {}}
        transition={{ duration: 0.5 }}
      >!</motion.div>
    </motion.div>
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
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3
                }}
                className="text-red-500 bg-red-100/20 p-4 rounded-lg mb-4 border border-red-500/50 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-xl"
                  >⚠️</motion.div>
                  {error}
                </div>
              </motion.div>
            )}
            <div className="space-y-4 w-4/5">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border ${fieldErrors.name ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-gray-700'} focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500`}
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  animate={fieldErrors.name ? {
                    x: [0, -10, 10, -10, 10, 0],
                    borderColor: ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
                    boxShadow: [
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 10px rgba(239,68,68,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
                <ErrorAnimation show={fieldErrors.name} />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border ${fieldErrors.email ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-gray-700'} focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500`}
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  animate={fieldErrors.email ? {
                    x: [0, -10, 10, -10, 10, 0],
                    borderColor: ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
                    boxShadow: [
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 10px rgba(239,68,68,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
                <ErrorAnimation show={fieldErrors.email} />
              </div>

              <div className="relative">
                <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border ${fieldErrors.subject ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-gray-700'} focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500`}
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  animate={fieldErrors.subject ? {
                    x: [0, -10, 10, -10, 10, 0],
                    borderColor: ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
                    boxShadow: [
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 10px rgba(239,68,68,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
                <ErrorAnimation show={fieldErrors.subject} />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                <motion.textarea
                  className={`w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border ${fieldErrors.message ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-gray-700'} focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 h-40`}
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  animate={fieldErrors.message ? {
                    x: [0, -10, 10, -10, 10, 0],
                    borderColor: ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
                    boxShadow: [
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 15px rgba(239,68,68,0.4)',
                      '0 0 10px rgba(239,68,68,0.3)',
                      '0 0 10px rgba(239,68,68,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
                <ErrorAnimation show={fieldErrors.message} />
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