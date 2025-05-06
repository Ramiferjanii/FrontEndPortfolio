"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

// Custom counter hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (counterRef.current) observer.observe(counterRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isVisible])

  return { count, ref: counterRef }
}

export default function AboutSection() {
  const { count: experienceCount, ref: experienceRef } = useCounter(3)
  const { count: clientsCount, ref: clientsRef } = useCounter(5)
  const { count: projectsCount, ref: projectsRef } = useCounter(6)

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-8 px-4 md:py-12 lg:py-16 border-b border-gray-700 max-w-7xl mx-auto"
    >
      {/* About Text */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 md:mb-12"
      >
        <p className="text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose text-justify">
          Hi there! I'm Rami Ben Ferjani, an aspiring Business Intelligence Specialist and Full-Stack Developer based in Tunisia, 
          passionate about transforming data into actionable insights and building seamless digital experiences. Currently pursuing 
          a degree in Business Intelligence at the Higher Institute of Computer Science of Mahdia, with a strong foundation in data 
          analytics, data mining, and visualization. My academic journey also includes coursework in Business Computing, blending 
          technical expertise with strategic business understanding.
        </p>
      </motion.div>

      {/* Personal Info Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 md:mb-12"
      >
        {[
          { label: "Name:", value: "Rami Ben Ferjani" },
          { label: "Birthday:", value: "07 December 2003" },
          { label: "Degree:", value: "Business Intelligence" },
          { label: "Experience:", value: `${experienceCount} years` },
          { label: "Phone:", value: "+216 58 215 477" },
          { label: "Email:", value: "ramiferjani.20@gmail.com" },
          { label: "Address:", value: "Tunisia, Mahdia, 5114" },
          { label: "Freelance:", value: "Available" },
          { label: "Language:", value: "Arabic, French, English" },
        ].map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="py-2 px-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-medium text-blue-400 text-sm md:text-base">{item.label}</span>
            <p className="text-gray-300 text-sm md:text-base mt-1">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {[
          { count: experienceCount, ref: experienceRef, label: "Years of", sublabel: "Experience" },
          { count: clientsCount, ref: clientsRef, label: "Happy", sublabel: "Clients" },
          { count: projectsCount, ref: projectsRef, label: "Complete", sublabel: "Projects" },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            ref={stat.ref}
            variants={statsVariants}
            className="flex items-center p-4 md:p-6 bg-slate-800 rounded-xl hover:bg-slate-800/90 transition-colors"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h1 
              className="flex-shrink-0 text-4xl md:text-5xl font-bold text-teal-400 mr-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {stat.count}+
            </motion.h1>
            <div className="flex flex-col">
              <p className="text-indigo-300 text-sm md:text-base mb-1">{stat.label}</p>
              <h5 className="text-indigo-300 font-medium text-lg md:text-xl">{stat.sublabel}</h5>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}