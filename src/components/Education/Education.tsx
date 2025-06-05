import { motion } from "framer-motion";

export default function Education() {
  const experiences = [
    {
      title: "Higher Institute of Management of Gabes",
      company: "Bachelor's Degree in Business computing",
      period: "2023 - 2024",
      description:
        "The Bachelor's Degree in Business Computing at the Higher Institute of Management of Gabes (ISGT Gabes) in Tunisia is an interdisciplinary program designed to blend business administration with information technology, preparing graduates to bridge the gap between technical and managerial roles in modern organizations",
    },
    {
      title: "Higher Institute of Computer Science Mahdia",
      company: "Bachelor's Degree in Business Intelligence",
      period: "2024 - 2026",
      description:
        "This 3-year undergraduate program equips students with the technical and analytical skills needed to transform data into actionable business insights. Combining computer science, statistics, and business management, the curriculum prepares graduates for roles in data-driven decision-making across industries.",
    },
    {
      title: "Faculty of Economic Sciences and Management of Mahdia",
      company: "Bachelor's Degree in Business Intelligence",
      period: "2024 - 2026",
      description:
        "This 3-year undergraduate program equips students with the technical and analytical skills needed to transform data into actionable business insights. Combining computer science, statistics, and business management, the curriculum prepares graduates for roles in data-driven decision-making across industries.",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { y: -5, backgroundColor: "rgba(255,255,255,0.05)" },
  };

  return (
    <motion.section 
      className="py-12 border-b border-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h1 
        className="relative pb-3 mb-8 text-4xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[10px] before:h-[10px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:bottom-0 after:left-[15px] after:rounded-[2px] after:bg-[#f2f2f2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.h1>

      <div className="border-l-2 border-[#f2f2f2] pt-2 ps-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            className="relative mb-8 p-6 rounded-lg bg-gray-800/20 cursor-default"
            variants={itemVariants}
            whileHover="hover"
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="absolute -left-[54px] top-6 text-[#f2f2f2] text-3xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ▹
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h5 className="mb-2 text-2xl font-semibold text-white">{exp.title}</h5>
              <p className="mb-2 text-lg font-medium text-gray-300">
                {exp.company} | <span className="text-sm text-gray-400">{exp.period}</span>
              </p>
              <p className="text-gray-400 leading-relaxed">{exp.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}