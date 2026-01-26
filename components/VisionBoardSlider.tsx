"use client";
import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/vision1.jpg", alt: "Vision Board Image 1" },
  { src: "/vision2.jpg", alt: "Vision Board Image 2" },
  { src: "/vision3.jpg", alt: "Vision Board Image 3" },
];

export default function VisionBoardSlider() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
      <button onClick={prev} aria-label="Previous" style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>&lt;</button>
      <div style={{ width: 150, height: 180, background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Replace with <Image ... /> if you have real images */}
        {/* <Image src={images[current].src} alt={images[current].alt} fill style={{objectFit:'cover'}} /> */}
        <span>{images[current].alt}</span>
      </div>
      <button onClick={next} aria-label="Next" style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>&gt;</button>
    </div>
  );
}
