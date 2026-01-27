"use client";
import Image from "next/image";

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: string;
          width?: number;
          autoClose?: number;
        }
      ) => void;
    };
  }
}

export default function SWOTCard() {
  const openTallyForm = () => {
    window.Tally?.openPopup("zx7GDE", {
      layout: "modal",
      width: 700,
      autoClose: 3000,
    });
  };

  return (
    <section className="swot-card">
      {/* LEFT CONTENT */}
      <div className="swot-left">
        <h2 className="swot-title">
          Find your direction before you put your next “best” foot forward
        </h2>

        <button className="swot-btn" onClick={openTallyForm}>
          The Career Compass
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="swot-image-wrap">
        <Image
          src="/findYourDirection.png"
          alt="Find your direction"
          fill
          priority
          className="swot-img"
        />
      </div>
    </section>
  );
}
