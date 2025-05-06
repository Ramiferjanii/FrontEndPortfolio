"use client"
import './Loading.module.css'
import { motion } from "framer-motion"

function LoadingThreeDotsPulse() {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="bg-black min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background elements to make blur more visible */}
      <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-20 -left-20 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-white/10 -bottom-20 -right-20 blur-3xl"></div>

      {/* Blurred container for dots */}
      <div className="backdrop-blur-md bg-black/50 p-10 rounded-xl">
        <motion.div
          animate="pulse"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="flex items-center justify-center gap-5"
        >
          <motion.div className="w-5 h-5 rounded-full bg-white" variants={dotVariants} />
          <motion.div className="w-5 h-5 rounded-full bg-white" variants={dotVariants} />
          <motion.div className="w-5 h-5 rounded-full bg-white" variants={dotVariants} />
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingThreeDotsPulse
