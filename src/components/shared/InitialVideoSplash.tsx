"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialVideoSplash() {
  const pathname = usePathname();
  const isTemplateRoute = pathname?.startsWith("/templates/") ?? false;

  const [isVisible, setIsVisible] = useState<boolean>(isTemplateRoute);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/templates/")) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setIsVideoEnded(false);
  }, [pathname]);

  // Lock body scroll while video is playing
  useEffect(() => {
    if (isVisible && !isVideoEnded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, isVideoEnded]);

  // Ensure video plays smoothly once without resetting or double-starting
  useEffect(() => {
    if (isVisible && videoRef.current) {
      const video = videoRef.current;
      // Only invoke play() if video is currently paused to prevent restarting mid-play
      if (video.paused) {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }
  }, [isVisible]);

  const handleEnded = () => {
    // Immediately trigger fade-out transition on video completion
    setIsVideoEnded(true);
  };

  if (!isTemplateRoute || !isVisible) return null;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsVisible(false);
      }}
    >
      {!isVideoEnded && (
        <motion.div
          key={`video-splash-${pathname}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transform: "translateZ(0)", willChange: "opacity" }}
          className="fixed inset-0 z-[999999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Pure Hardware-Accelerated Full Screen Video */}
          <video
            ref={videoRef}
            src="/video/logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onEnded={handleEnded}
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
            className="w-full h-full object-contain bg-black pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
