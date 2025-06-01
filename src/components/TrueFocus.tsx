import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
}

interface FocusRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence = "True Focus",
    manualMode = false,
    blurAmount = 5,
    borderColor = "green",
    glowColor = "rgba(0, 255, 0, 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}) => {
    const words = sentence.split(" ");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if (!manualMode && !isHovered) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, isHovered]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;
        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = (index: number) => {
        setIsHovered(true);
        if (manualMode) {
            setLastActiveIndex(index);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (manualMode) {
            setCurrentIndex(lastActiveIndex!);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex gap-4 justify-center items-center flex-wrap"
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                return (
                    <motion.span
                        key={index}
                        ref={(el) => { wordRefs.current[index] = el; }}
                        className="relative text-[2.5rem] md:text-[3rem] font-black cursor-pointer"
                        initial={{ filter: `blur(${blurAmount}px)`, opacity: 0.5 }}
                        animate={{
                            filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                            opacity: isActive ? 1 : 0.5,
                            scale: isActive ? 1.05 : 1,
                        }}
                        transition={{
                            duration: animationDuration,
                            ease: "easeInOut",
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            willChange: 'transform, filter, opacity',
                            WebkitFontSmoothing: 'antialiased',
                        }}
                    >
                        {word}
                    </motion.span>
                );
            })}

            <AnimatePresence>
                {currentIndex >= 0 && (
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none box-border border-0"
                        initial={{ opacity: 0 }}
                        animate={{
                            x: focusRect.x,
                            y: focusRect.y,
                            width: focusRect.width,
                            height: focusRect.height,
                            opacity: 1,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: animationDuration,
                            ease: "easeInOut",
                        }}
                        style={{
                            "--border-color": borderColor,
                            "--glow-color": glowColor,
                        } as React.CSSProperties}
                    >
                        <motion.span
                            className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                            style={{
                                borderColor: "var(--border-color)",
                                filter: "drop-shadow(0 0 4px var(--border-color))",
                            }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.span
                            className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                            style={{
                                borderColor: "var(--border-color)",
                                filter: "drop-shadow(0 0 4px var(--border-color))",
                            }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.span
                            className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                            style={{
                                borderColor: "var(--border-color)",
                                filter: "drop-shadow(0 0 4px var(--border-color))",
                            }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.span
                            className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                            style={{
                                borderColor: "var(--border-color)",
                                filter: "drop-shadow(0 0 4px var(--border-color))",
                            }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TrueFocus;