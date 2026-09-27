"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "explore" | "open">("default");
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast 165Hz responsive spring configuration
  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop devices with hover pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "view") {
          setCursorVariant("view");
          setCursorText("VIEW →");
        } else if (type === "explore") {
          setCursorVariant("explore");
          setCursorText("EXPLORE →");
        } else if (type === "open") {
          setCursorVariant("open");
          setCursorText("OPEN →");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else if (target.closest("button, a, input, select")) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const isTextCursor = ["view", "explore", "open"].includes(cursorVariant);

  return (
    <>
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#C40024] rounded-full pointer-events-none z-[9999] mix-blend-difference transform-gpu will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Spring Circle / Text Badge */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full transition-colors duration-150 transform-gpu will-change-transform ${
          isTextCursor
            ? "bg-[#C40024] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg px-3 py-1"
            : cursorVariant === "hover"
            ? "border border-[#C40024] bg-[#C40024]/10"
            : "border border-white/20"
        }`}
        animate={{
          scale: isTextCursor ? 1.4 : cursorVariant === "hover" ? 1.6 : 1,
          width: isTextCursor ? 80 : 36,
          height: isTextCursor ? 80 : 36,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {cursorText}
      </motion.div>
    </>
  );
}

