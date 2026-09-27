"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "explore" | "open">("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run cursor on desktop
    if (window.innerWidth < 1024) return;

    document.body.classList.add("has-custom-cursor");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
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
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isTextCursor = ["view", "explore", "open"].includes(cursorVariant);

  return (
    <>
      {/* Precision Dot - z-[10000001] to stay ALWAYS on top of video splash & all UI overlays */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-qloax-red rounded-full pointer-events-none z-[10000001] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Spring Circle / Text Badge - z-[10000000] */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[10000000] flex items-center justify-center rounded-full transition-colors duration-200 ${
          isTextCursor
            ? "bg-qloax-red text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg px-3 py-1"
            : cursorVariant === "hover"
            ? "border border-qloax-red bg-qloax-red/10"
            : "border border-white/20"
        }`}
        animate={{
          scale: isTextCursor ? 1.5 : cursorVariant === "hover" ? 1.8 : 1,
          width: isTextCursor ? 80 : 36,
          height: isTextCursor ? 80 : 36,
        }}
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
