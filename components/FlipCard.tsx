"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type DirectionalFlipCardProps = {
  frontImage: string;
  backImage: string;
  radius?: number;
  className?: string;
};

export default function DirectionalFlipCard({
  frontImage,
  backImage,
  radius = 16,
  className = "",
}: DirectionalFlipCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Interaction source
  const [interaction, setInteraction] = useState<"mouse" | "touch">("mouse");

  // Hover (desktop only)
  const [isHover, setIsHover] = useState(false);

  // Tap (mobile only)
  const [isFlipped, setIsFlipped] = useState(false);

  // Direction
  const [dir, setDir] = useState<1 | -1>(1);

  const setDirectionFromClientX = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setDir(x < rect.width / 2 ? 1 : -1);
  };

  /* ---------------- DESKTOP ---------------- */

  const handleMouseEnter = () => {
    if (interaction !== "mouse") return;
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (interaction !== "mouse") return;
    setIsHover(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interaction !== "mouse") return;
    setDirectionFromClientX(e.clientX);
  };

  /* ---------------- MOBILE ---------------- */

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      setInteraction("mouse");
      return;
    }

    // Touch interaction
    setInteraction("touch");

    // Set direction only when flipping to back
    if (!isFlipped) {
      setDirectionFromClientX(e.clientX);
    }

    setIsFlipped((p) => !p);
  };

  /* ---------------- FINAL FLIP LOGIC ---------------- */

  const shouldFlip =
    interaction === "mouse" ? isHover : isFlipped;

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "100%",
        perspective: "800px",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: radius,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: shouldFlip ? dir * 180 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.2, 0.2, 1],
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: radius,
            overflow: "hidden",
          }}
        >
          <img
            src={frontImage}
            alt="Front"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: radius,
            overflow: "hidden",
          }}
        >
          <img
            src={backImage}
            alt="Back"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
