import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)"
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
  const springX = useSpring(0, { stiffness: 300, damping: 30 });
  const springY = useSpring(0, { stiffness: 300, damping: 30 });
  const opacity = useSpring(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    springX.set(x);
    springY.set(y);
  };

  const handleFocus = () => {
    setIsFocused(true);
    opacity.set(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    opacity.set(0);
  };

  const handleMouseEnter = () => {
    opacity.set(0.6);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
  };

  const background = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-slate-950 overflow-hidden p-8 ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity,
          background,
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.div>

      {/* Animated border element */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          opacity,
          boxShadow: useMotionTemplate`0 0 35px 1px ${spotlightColor}`
        }}
      />
    </motion.div>
  );
};

export default SpotlightCard;