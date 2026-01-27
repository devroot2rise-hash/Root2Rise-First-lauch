"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const images = [
  "/guide1.png",
  "/guide2.png",
  "/guide3.png",
  "/guide4.png",
]

export default function CardStack() {
  const [cards, setCards] = useState(images)

  const moveToBack = () => {
    setCards(prev => {
      const [first, ...rest] = prev
      return [...rest, first]
    })
  }

  return (
    <ul
      className="card-stack"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1020,              // desktop size
        aspectRatio: "16 / 9",       // ✅ responsive height
        margin: "0 auto",
        padding: 0,
        listStyle: "none",
        touchAction: "pan-y",
      }}
    >
      {cards.map((img, index) => {
        const isTop = index === 0

        // 🔁 Responsive depth (smaller on mobile)
        const scaleStep =
          typeof window !== "undefined" && window.innerWidth < 640 ? 0.04 : 0.06
        const yStep =
          typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 30

        const depth = {
          scale: 1 - index * scaleStep,
          y: -index * yStep,
          zIndex: 10 - index,
        }

        return (
          <motion.li
            key={img}
            onClick={isTop ? moveToBack : undefined}
            onKeyDown={isTop ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); moveToBack(); } } : undefined}
            role={isTop ? 'button' : undefined}
            tabIndex={isTop ? 0 : -1}
            whileTap={isTop ? { scale: 0.98, rotate: -2 } : undefined}
            animate={{
              scale: depth.scale,
              y: depth.y,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
              delay: index * 0.04,
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 16
                  : 20,
              zIndex: depth.zIndex,
              overflow: "hidden",
              cursor: isTop ? "pointer" : "default",
            }}
          >
            <img
              src={img}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding:
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 14
                    : 24,
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </motion.li>
        )
      })}
    </ul>
  )
}
