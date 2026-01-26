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

  // desktop hover state
  const [isHover, setIsHover] = useState(false);

  // mobile tap toggle state
  const [isFlipped, setIsFlipped] = useState(false);

  // 1 => left->right, -1 => right->left
  const [dir, setDir] = useState<1 | -1>(1);

  const setDirectionFromClientX = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setDir(x < rect.width / 2 ? 1 : -1);
  };

  // Desktop: move mouse decides direction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setDirectionFromClientX(e.clientX);
  };

  // Mobile: tap decides direction + toggles flip
  const handleTap = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only treat touch/pen as tap (not mouse click)
    if (e.pointerType === "mouse") return;

    setDirectionFromClientX(e.clientX);
    setIsFlipped((p) => !p);
  };

  // final state (hover OR tapped)
  const shouldFlip = isHover || isFlipped;

  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label="3D Flip Card"
      className={`relative ${className}`}
      onPointerDown={handleTap}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      style={{
        height: "100%",
        width: "100%",
        background: "transparent",
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "800px",
        overflow: "visible",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius,
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={{
          rotateY: shouldFlip ? (dir === 1 ? 180 : -180) : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.2, 0.2, 1],
        }}
      >
        {/* FRONT */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: radius,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={frontImage}
            alt="Front"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              userSelect: "none",
              display: "block",
            }}
            draggable={false}
          />
        </div>

        {/* BACK */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: radius,
            overflow: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={backImage}
            alt="Back"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              userSelect: "none",
              display: "block",
            }}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
