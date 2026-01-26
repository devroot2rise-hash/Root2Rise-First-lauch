"use client";
import Image from "next/image";
declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: {
        layout?: string;
        width?: number;
        autoClose?: number;
      }) => void;
    };
  }
}

export default function SWOTCard() {
  const openTallyForm = () => {
    if (window.Tally) {
      window.Tally.openPopup('zx7GDE', {
        layout: 'modal',
        width: 700,
        autoClose: 3000
      });
    }
  };

  return (
    <div className="swot-card">
      <div className="swot-left">
        <div className="swot-title-wrap">
          <span className="swot-title">Find your direction before you put your next “best” foot forward</span>
        </div>

        <div className="swot-desc-wrap">
        <button className="swot-btn" onClick={openTallyForm}>The Career Compass</button>
        </div>
      </div>

        <Image src="/findYourDirection.png" alt="SWOT Illustration" width={800} height={900} className="swot-img" priority />
    </div>
  );
}
