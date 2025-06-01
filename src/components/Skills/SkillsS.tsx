"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import CountUp from "../Animation/CountUp"

interface Skill {
  name: string
  percentage: number
}

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
  visible: { opacity: 1, y: 0 }
}

const progressVariants = {
  hidden: { width: "0%" },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: { duration: 1, ease: "easeOut" }
  })
}

const getColorClass = (percentage: number) => {
  if (percentage > 90) return "bg-[#28a745]" // Green
  if (percentage > 80) return "bg-[#17a2b8]" // Blue
  return "bg-[#dc3545]" // Red
}

export default function SkillsS() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const skills: Skill[] = [
    { name: "HTML", percentage: 91 },
    { name: "CSS", percentage: 70 },
    { name: "PHP", percentage: 70 },
    { name: "Javascript", percentage: 90 },
    { name: "JavaOOP", percentage: 90 },
    { name: "ReactJs", percentage: 85 },
    { name: "Symfony", percentage: 80 },
    { name: "Python", percentage: 81 },
    { name: "TypeScript", percentage: 80 },
    { name: "MySQL", percentage: 80 },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.section 
      ref={skillsRef} 
      className="py-5 border-b border-gray-700 px-4 md:px-0"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 
        className="relative pb-3 mb-5 text-2xl md:text-3xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[10px] before:h-[10px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:bottom-0 after:left-[15px] after:rounded-[2px] after:bg-[#f2f2f2]"
        variants={itemVariants}
      >
        Skills
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="mb-4"
            variants={itemVariants}
          >
            <div className="flex justify-between mb-2">
              <p className="text-sm md:text-base font-medium">{skill.name}</p>
              <p className="text-sm md:text-base">
                <CountUp
                  from={0}
                  to={skill.percentage}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />%
              </p>
            </div>
            <div className="h-[5px] overflow-hidden bg-[#314355] rounded-full">
              <motion.div
                className={`h-full ${getColorClass(skill.percentage)} rounded-full`}
                role="progressbar"
                variants={progressVariants}
                custom={skill.percentage}
                aria-valuenow={skill.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}