import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Skills: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          "React.js & TypeScript",
          "Symfony & PHP",
          "TailwindCSS & DaisyUI",
          "Git Workflow",
          "Figma & Design"
        ],
        typeSpeed: 100,
        backSpeed: 20,
        smartBackspace: false,
        loop: true,
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <div className="text-center">
      <span className="typed-text-output text-lg text-blue-500 font-mono">
        <span ref={el} />
      </span>
    </div>
  );
};

export default Skills;