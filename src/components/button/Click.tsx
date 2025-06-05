import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { MouseEvent } from "react";

interface ClickProps {
  href?: string;
}

function Click({ href }: ClickProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleX = useSpring(0, { stiffness: 400, damping: 20 });
  const background = useMotionTemplate`radial-gradient(120% 120% at ${x}px ${y}px, rgba(59, 130, 246, 0.2), transparent)`;

  const handleHover = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div className="mt-8 mb-2">
      <motion.div
        style={{ background }}
        className="inline-block rounded-lg"
        onHoverStart={() => scaleX.set(1)}
        onHoverEnd={() => scaleX.set(0)}
      >
        <Button
          asChild
          color="blue" 
          variant="soft"
          className="relative overflow-hidden rounded-lg
                     font-medium tracking-wide px-6 py-3
                     bg-gradient-to-br from-blue-50/50 to-blue-100/30
                     text-blue-700 hover:text-red-50
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                     backdrop-blur-sm border-2 border-blue-200/50
                     hover:border-blue-300 transition-colors duration-200"
          onMouseEnter={handleHover}
        >
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 8px 24px rgba(59, 130, 246, 0.15)"
            }}
            whileTap={{ 
              scale: 0.95,
              boxShadow: "0px 4px 12px rgba(59, 130, 246, 0.1)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400,
              damping: 20
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore More
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: scaleX.get() * 8 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </span>

            {/* Animated underline */}
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
              style={{
                scaleX,
                transformOrigin: "left center"
              }}
            />
          </motion.a>
        </Button>
      </motion.div>
    </div>
  )
}

export default Click;