"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CurvedSliderProps = {
  images: string[];
  autoplay?: boolean;
  autoplayDelay?: number;
  keyboardNavigation?: boolean;
};

type Slot = "left" | "center" | "right";

export default function CurvedSlider({
  images,
  autoplay = false,
  autoplayDelay = 2500,
  keyboardNavigation = true,
}: CurvedSliderProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const total = safeImages.length;

  const [active, setActive] = useState(0);

  const prev = () => {
    if (total <= 1) return;
    setActive((p) => (p - 1 + total) % total);
  };

  const next = () => {
    if (total <= 1) return;
    setActive((p) => (p + 1) % total);
  };

  // keyboard
  useEffect(() => {
    if (!keyboardNavigation) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardNavigation, total]);

  // autoplay
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const id = setInterval(() => next(), autoplayDelay);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, total]);

  if (total === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white/60">
        No images provided
      </div>
    );
  }

  const POS = 520;

  const slotStyle: Record<Slot, any> = {
    left: {
      x: -POS,
      scale: 0.75,
      rotateZ: -12,
      opacity: 0.7,
      zIndex: 2,
    },
    center: {
      x: 0,
      scale: 1,
      rotateZ: 0,
      opacity: 1,
      zIndex: 3,
    },
    right: {
      x: POS,
      scale: 0.75,
      rotateZ: 12,
      opacity: 0.7,
      zIndex: 2,
    },
  };

  // indices
  const leftIndex = (active - 1 + total) % total;
  const rightIndex = (active + 1) % total;

  // cards with stable "cardId" so they can move across slots
  const visibleCards = [
    { cardId: leftIndex, slot: "left" as const },
    { cardId: active, slot: "center" as const },
    { cardId: rightIndex, slot: "right" as const },
  ];

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden">
      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 bg-transparent border-0 cursor-pointer p-0"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Slider Area */}
      <div className="relative w-[50%] max-w-[520px] h-[60vh] flex items-center justify-center">
        <AnimatePresence initial={false}>
          {visibleCards.map(({ cardId, slot }) => (
            <motion.div
              key={cardId}
              layoutId={`card-${cardId}`} // 🔥 this makes it move smoothly between slots
              className="absolute w-full h-full rounded-2xl overflow-hidden"
              animate={slotStyle[slot]}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <img
                src={safeImages[cardId]}
                alt="Card image"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-[5%] top-1/2 -translate-y-1/2 z-20 bg-transparent border-0 cursor-pointer p-0"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
