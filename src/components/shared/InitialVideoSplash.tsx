"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialVideoSplash() {
  const pathname = usePathname();
  const isTemplateRoute = pathname?.startsWith("/templates/") ?? false;

  const [isVisible, setIsVisible] = useState<boolean>(isTemplateRoute);
  const [hasDismissed, setHasDismissed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDismiss = useCallback(() => {
    if (hasDismissed) return;
    setHasDismissed(true);
    if (pathname) {
      const storageKey = `qloax_intro_played_${pathname.replace(/\//g, "_")}`;
      sessionStorage.setItem(storageKey, "true");
    }
    setIsVisible(false);
  }, [hasDismissed, pathname]);

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/templates/")) {
      setIsVisible(false);
      return;
    }

    const storageKey = `qloax_intro_played_${pathname.replace(/\//g, "_")}`;
    const hasPlayed = sessionStorage.getItem(storageKey);

    if (hasPlayed) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      setHasDismissed(false);
    }
  }, [pathname]);

  // Force play video as soon as element mounts
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay promise rejected:", err);
        });
      }
    }
  }, [isVisible]);

  const handleTimeUpdate = () => {
    if (!videoRef.current || hasDismissed) return;
    const { currentTime, duration } = videoRef.current;
    // When video is within 0.15s of completion, initiate smooth site transition
    // to prevent container pause / static frame hang at the end of MP4 files
    if (duration > 0 && duration - currentTime <= 0.15) {
      handleDismiss();
    }
  };

  if (!isTemplateRoute || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`video-splash-${pathname}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999999] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Pure 100% Full Screen Video — Zero Text / Zero Overlays */}
          <video
            ref={videoRef}
            src="/video/logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleDismiss}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

