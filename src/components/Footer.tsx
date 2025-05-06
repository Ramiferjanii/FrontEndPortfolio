import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};

const Footer = () => {
  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="relative bg-black/80 border-t border-white/10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright text */}
          <motion.div
            variants={itemVariants}
            className="text-sm text-gray-400"
          >
            © {new Date().getFullYear()} Rami Ben Ferjani. All rights reserved.
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex items-center space-x-6"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              { icon: FaGithub, href: "https://github.com/Ramiferjanii", color: "hover:text-white" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/rami-ben-ferjani-072150315/", color: "hover:text-blue-600" },
              { icon: FaInstagram, href: "https://www.instagram.com/rami_ferjani_", color: "hover:text-pink-600" },
              { icon: FaFacebook, href: "https://www.facebook.com/share/15HVuTYGv6/", color: "hover:text-blue-500" }
            ].map((social, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors ${social.color}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Additional footer content */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center md:text-left"
        >
          <p className="text-xs text-gray-500">
            Built with passion using React, TypeScript, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;