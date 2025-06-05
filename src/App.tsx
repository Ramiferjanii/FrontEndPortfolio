import VariableProximity from './components/About/VariableProximity';
import BlurText from './components/BlurText';
import Particles from './components/Particles';
import Dock from './components/SideBar/dock/Dock';
import TiltedCard from './components/SideBar/image/TiltedCard';
import TrueFocus from './components/TrueFocus';
import Skills from './components/Skills/Skills';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import Loading from './components/Loading/Loading';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SkillsS from './components/Skills/SkillsS';
import Education from './components/Education/Education';
import Services from './components/Services/Services';
import SpotlightCard from './components/Card/SpotlightCard';
import { DiSymfony } from "react-icons/di";
import { FaJava } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import Click from './components/button/Click';
import ContactSection from './contact/ContactSection';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { AiOutlinePython } from "react-icons/ai";



const App = () => {
  const items = [
    { icon: <FaGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/Ramiferjanii', '_blank') },
    { icon: <FaLinkedin size={18} />, label: 'Linkedin', onClick: () => window.open('https://www.linkedin.com/in/rami-ben-ferjani-072150315/', '_blank') },
    { icon: <FaInstagram size={18} />, label: 'Instagram', onClick: () => window.open('https://www.instagram.com/rami_ferjani_?igsh=MTdwbjR1bWU5bzdxbA==', '_blank') },
    { icon: <FaFacebook size={18} />, label: 'Facebook', onClick: () => window.open('https://www.facebook.com/share/15HVuTYGv6/', '_blank') },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Simulate loading of assets/API calls
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setShowBackToTop(totalScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-blue-500"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 z-50"
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && <Loading key="loading-screen" />}
      </AnimatePresence>

      {!isLoading && (
        <div className="w-full min-h-screen relative">
          {/* Lightning Background */}
          <div
            className="bg-black place-content-evenly"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          >
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={700}
              particleSpread={15}
              speed={0.1}
              particleBaseSize={80}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Foreground Content */}
          <div className="flex flex-col md:flex-row p-4 md:p-6 text-white relative z-1">
            {/* Sidebar - Fixed on desktop, scrollable on mobile */}
            <div className="w-full md:w-auto md:fixed md:ml-14 md:h-[95vh] mb-6 md:mb-0">
              <div className='flex flex-col items-center justify-center'>
                <TiltedCard
                  imageSrc="/ff8106e2-23fa-4111-a49f-7d4494fe4ed5.jpg" 
                  altText="Rami Ben Ferjani"
                  captionText="Rami Ben Ferjani"
                  containerHeight="250px"
                  containerWidth="250px"
                  imageHeight="250px"
                  imageWidth="250px"
                  rotateAmplitude={10}
                  scaleOnHover={1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={null}
                />

                <div className="my-6 md:my-[20%] text-center">
                  <BlurText
                    text="Rami Ben Ferjani"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-2xl md:text-3xl mt-8 md:mt-10 text-center mb-4 md:mb-6"
                  />
                  <Skills />

                  <Dock items={items} panelHeight={70} baseItemSize={60} magnification={80} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-[55%] md:ml-[35%] flex flex-col items-center">
              <div className='m-4 md:m-10'>
                <TrueFocus
                  sentence="ABOUT ME"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="Blue"
                  animationDuration={0.7}
                  pauseBetweenAnimations={1}
                />
              </div>
              
              <div className='w-full flex flex-col px-4 md:px-6'>
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-8" ref={containerRef}>
                  <VariableProximity/>
                </div>
                <SkillsS/>
                <Education/>
                <Services/>
                
                <h1 className="relative mt-6 md:mt-8 pb-3 md:pb-4 mb-4 md:mb-6 text-2xl md:text-4xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[12px] md:before:w-[15px] before:h-[12px] md:before:h-[15px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[60px] md:after:w-[70px] after:h-[2px] after:bottom-0 after:left-[15px] md:after:left-[20px] after:rounded-[2px] after:bg-[#f2f2f2]">
                  Projects
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start md:ml-20 gap-6 md:gap-8 w-full">
                  {/* Project Cards */}
                  
                  <SpotlightCard 
                    className="relative rounded-xl shadow-lg m-4 overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[90%] md:w-[calc(33.333%-1.5rem)] flex-shrink-0"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-stone-50 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        <DiSymfony className="text-stone-950 text-3xl" />
                      </div>
                    </div>

                    <div className="pt-16 px-6 pb-6">  {/* Increased top padding for logo space */}
                      <p className="text-stone-300 text-center leading-relaxed mb-4">
                      Developed a robust, full-stack e-commerce web application using{' '}
                        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
                        Symfony 5 and modern PHP practices
                        </a>. The platform features a secure customer journey{' '}
                        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
                        from product browsing to checkout, with comprehensive administrative controls for inventory and order management.
                        </a>{' '}
                      </p>
                      <Click href="https://github.com/Ramiferjanii" />
                    </div>
                  </SpotlightCard>
                  

                  <SpotlightCard 
                    className="relative rounded-xl shadow-lg m-4 overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[90%] md:w-[calc(33.333%-1.5rem)] flex-shrink-0"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-blue-100 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        <FaReact className="text-blue-500 text-3xl" />
                      </div>
                    </div>

                    <div className="pt-16 px-6 pb-6">
                      <p className="text-stone-300 text-center leading-relaxed mb-4">
                      Full Stack Developer specializing in modern JavaScript ecosystems with {' '}
                        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
                        extensive experience
                        </a>. building end-to-end web applications . Proficient in designing and implementing robust solutions using{' '}
                        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
                        React.js for dynamic frontends, Node.js and Express.js for scalable backend services
                        </a>{' '}
                      </p>
                      <Click href="https://github.com/Ramiferjanii" />
                    </div>
                  </SpotlightCard>
                  

                  <SpotlightCard 
                    className="relative rounded-xl shadow-lg m-4 overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[90%] md:w-[calc(33.333%-1.5rem)] flex-shrink-0"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-orange-100 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        <FaJava className="text-orange-500 text-3xl" />
                      </div>
                    </div>

                    <div className="pt-16 px-6 pb-6">
                      <p className="text-stone-300 text-center leading-relaxed mb-4">
                      Implemented role-based access control (Admin/Teller/Customer) with {' '}
                        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
                        Java Cryptography encryption
                        </a>. Developed transaction modules (deposits/withdrawals/transfers) with{' '}
                        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
                        Built Swing-based GUI featuring dashboard analytics for transaction monitoring
                        </a>{' '}
                        Applied OOP principles for modular account architecture{' '}
                      </p>
                      <Click href="https://github.com/Ramiferjanii" />
                    </div>
                  </SpotlightCard>
                  <SpotlightCard 
                    className="relative rounded-xl shadow-lg m-4 overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[90%] md:w-[calc(33.333%-1.5rem)] flex-shrink-0"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-blue-100 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        <AiOutlinePython className="text-blue-700 text-3xl" />
                      </div>
                    </div>

                    <div className="pt-16 px-6 pb-6">
                      <p className="text-stone-300 text-center leading-relaxed mb-4">
                      A classic chess implementation perfect for both enthusiasts and developers! This project offers  {' '}
                        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
                        a streamlined
                        </a>. interactive chess experience with support{' '}
                        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
                        or two-player matches, move validation, and game state management
                        </a>{' '}
                      </p>
                      <Click href="https://github.com/Ramiferjanii" />
                    </div>
                  </SpotlightCard>
                </div>
              </div>
              
              <ContactSection/>
              <Footer/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
