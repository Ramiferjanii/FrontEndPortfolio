
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


const App = () => {
  const items = [
    { icon: <FaGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/Ramiferjanii', '_blank') },
    { icon: <FaLinkedin size={18} />, label: 'Linkedin', onClick: () => window.open('https://www.linkedin.com/in/rami-ben-ferjani-072150315/', '_blank') },
    { icon: <FaInstagram size={18} />, label: 'Instagram', onClick: () => window.open('https://www.instagram.com/rami_ferjani_?igsh=MTdwbjR1bWU5bzdxbA==', '_blank') },
    { icon: <FaFacebook size={18} />, label: 'Facebook', onClick: () => window.open('https://www.facebook.com/share/15HVuTYGv6/', '_blank') },
  ];
  const [isLoading, setIsLoading] = useState(true);
  // Removed duplicate declaration of containerRef

  useEffect(() => {
    // Simulate loading of assets/API calls
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading key="loading-screen" />}
      </AnimatePresence>

      {!isLoading && (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
          <div
            style={{
              display: 'flex',
              margin: '15px',
              color: 'white',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div className="fixed ml-56 md:w-auto h-[95vh]">
              <div className='md:box-decoration-slice flex-col justify-center place-items-center'>
                <TiltedCard
                  imageSrc="public/ff8106e2-23fa-4111-a49f-7d4494fe4ed5.jpg" 
                  altText="Rami Ben Ferjani"
                  captionText="Rami Ben Ferjani"
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={10}
                  scaleOnHover={1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={null}
                />

                <div className="hover:break-before-column my-[20%] place-items-center">
                  <BlurText
                    text="Rami Ben Ferjani"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-2xl mt-10 justify-items-center text-center mb-5"
                  />
                  <Skills />

                  <Dock items={items} panelHeight={70} baseItemSize={60} magnification={80} />
                </div>
              </div>
            </div>

















<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }}
  className="relative ml-[35%] "
>
  <div className='m-10  items-end' >
  <TrueFocus
    sentence="ABOUT ME"
    manualMode={false}
    blurAmount={5}
    borderColor="Blue"
    animationDuration={0.7}
    pauseBetweenAnimations={1}
  />
  </div>
  <div className=' w-[100%] flex-col ' >
  {/* Content container with grow capability */}
  <div className="relative  flex gap-6  " ref={containerRef}>
    <VariableProximity/>
  </div>
  <SkillsS/>
  <Education/>
  <Services/>
  <h1 className="relative mt-5 pb-3 mb-5 text-3xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[10px] before:h-[10px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:bottom-0 after:left-[15px] after:rounded-[2px] after:bg-[#f2f2f2]">
          Projects
        </h1>
        <div className="flex gap-6">
  {/* Card 1 - Java */}
  <SpotlightCard 
    className="relative rounded-xl shadow-lg overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    spotlightColor="rgba(0, 229, 255, 0.2)"
  >
    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-stone-50 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
        <DiSymfony className="text-stone-950 text-3xl" />
      </div>
    </div>

    <div className="pt-16 px-6 pb-6">  {/* Increased top padding for logo space */}
      <p className="text-stone-300 text-center leading-relaxed mb-4">
        I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at{' '}
        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
          My Company, Inc
        </a>. Outside of work, I enjoy{' '}
        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
          watching pod-racing
        </a>{' '}
        and participating in{' '}
        <a className="underline decoration-indigo-500 hover:text-indigo-600 transition-colors duration-200">
          light-saber fights
        </a>.
      </p>
      <Click />
    </div>
  </SpotlightCard>

  {/* Card 2 - React */}
  <SpotlightCard 
    className="relative rounded-xl shadow-lg overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    spotlightColor="rgba(0, 229, 255, 0.2)"
  >
    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-blue-100 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
        <FaReact className="text-blue-500 text-3xl" />
      </div>
    </div>

    <div className="pt-16 px-6 pb-6">
      <p className="text-stone-300 text-center leading-relaxed mb-4">
        As a React specialist, I've developed multiple orbital navigation systems using{' '}
        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
          Galactic React
        </a>. My open-source contributions include{' '}
        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
          Hyperdrive Hooks
        </a>{' '}
        and the{' '}
        <a className="underline decoration-indigo-500 hover:text-indigo-600 transition-colors duration-200">
          Force Context API
        </a>.
      </p>
      <Click />
    </div>
  </SpotlightCard>

  {/* Card 3 - Java Alternative */}
  <SpotlightCard 
    className="relative rounded-xl shadow-lg overflow-hidden custom-spotlight-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    spotlightColor="rgba(0, 229, 255, 0.2)"
  >
    <div className="absolute -top-0 mt-5 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-orange-100 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
        <FaJava className="text-orange-500 text-3xl" />
      </div>
    </div>

    <div className="pt-16 px-6 pb-6">
      <p className="text-stone-300 text-center leading-relaxed mb-4">
        My Java expertise powers core systems for{' '}
        <a className="underline decoration-sky-500 hover:text-sky-600 transition-colors duration-200">
          Lightspeed Engines
        </a>. I've optimized{' '}
        <a className="underline decoration-pink-500 hover:text-pink-600 transition-colors duration-200">
          Droid Neural Networks
        </a>{' '}
        and developed safety protocols for{' '}
        <a className="underline decoration-indigo-500 hover:text-indigo-600 transition-colors duration-200">
          Ion Cannon Systems
        </a>.
      </p>
      <Click/>
    </div>
  </SpotlightCard>
</div>
    <ContactSection/>
    <Footer/>
            </div>

          </div>
        </div>
        </div>



      )}
    </>
  );
};

export default App;
