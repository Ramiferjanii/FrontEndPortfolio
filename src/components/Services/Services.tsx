import { Laptop, Smartphone, Search, Edit } from "lucide-react"
import { motion } from "framer-motion"

export default function Services() {
  const services = [
    {
        icon: <Laptop className="w-8 h-8" />,
        title: "UI/UX Implementation Specialist",
        description:
          "A Front-End Developer focuses on translating design mockups into interactive, user-friendly web interfaces using HTML, CSS, and JavaScript. They collaborate closely with UI/UX designers to ensure pixel-perfect layouts, responsive design, and seamless user experiences across devices and browsers. Proficient in frameworks like React, they prioritize accessibility and performance optimization.",
      },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Server-Side Logic Architect",
      description:
        "A Back-End Developer designs and maintains the server-side infrastructure powering web applications. They build APIs (RESTful or GraphQL) using languages like Python or Java and interact with databases (SQL or NoSQL) to manage data storage, retrieval, and security. They optimize server performance, implement authentication/authorization protocols (e.g., OAuth, JWT), and ensure scalability using cloud services (AWS, Docker). Their work enables seamless communication between the front-end and databases while safeguarding against vulnerabilities like SQL injection.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Data Visualization Architect",
      description:
        "BI Developers design intuitive dashboards and reports using tools like Power BI or Tableau. They transform raw data into actionable insights by creating interactive visualizations, enabling stakeholders to make data-driven decisions. Skilled in SQL and data modeling, they ensure clarity and accuracy in presenting complex datasets.",
    },
    {
      icon: <Edit className="w-8 h-8" />,
      title: "Business Analytics Translator",
      description:
        "BI Developers act as liaisons between technical teams and business stakeholders. They gather requirements, define KPIs, and develop custom BI solutions that align with organizational goals. Proficient in SQL and Python, they perform ad-hoc analyses, predictive modeling, and identify trends to support strategic planning.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.3 }
    }
  }

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.section 
      className="py-5 border-b border-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h1 
        className="relative pb-3 mb-5 text-3xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[10px] before:h-[10px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:bottom-0 after:left-[15px] after:rounded-[2px] after:bg-[#f2f2f2]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Services
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="group bg-slate-800 text-center p-6 transition-all duration-500"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div 
              className="mx-auto mb-4 rounded-full w-[75px] h-[75px] flex items-center justify-center bg-[#f2f2f2] text-[#3859c8] transition-colors duration-500 group-hover:bg-[#4946b1] group-hover:text-[#f2f2f2]"
              variants={iconVariants}
              whileHover="hover"
            >
              {service.icon}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h5 className="mb-2 text-xl font-medium">{service.title}</h5>
              <p className="mb-0">{service.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}