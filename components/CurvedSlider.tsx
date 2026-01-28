"use client";
import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import AuthModal from "./AuthModal";

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
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const total = safeImages.length;

  const [active, setActive] = useState(0);

  const checkAuthAndNavigate = (direction: "prev" | "next") => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (total <= 1) return;
    
    if (direction === "prev") {
      setActive((p) => (p - 1 + total) % total);
    } else {
      setActive((p) => (p + 1) % total);
    }
  };

  const prev = () => checkAuthAndNavigate("prev");
  const next = () => checkAuthAndNavigate("next");

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
  }, [keyboardNavigation, total, user]);

  // autoplay - only if user is authenticated
  useEffect(() => {
    if (!autoplay || total <= 1 || !user) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, autoplayDelay);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, total, user]);

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
    <>
      <div className="w-full flex items-center justify-center relative overflow-hidden">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 bg-transparent border-0 cursor-pointer p-0"
        >
          <Image src="/leftScroll.png" alt="Next" width={100} height={100} />
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
                draggable={false}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  slot === "center" ? "blur-0" : "blur-md"
                }`}
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
          <Image src="/rightScroll.png" alt="Next" width={100} height={100} />
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
