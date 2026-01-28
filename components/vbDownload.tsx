"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import AuthModal from "./AuthModal";


export default function DownloadCard() {
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleDownload = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const link = document.createElement("a");
    link.href = "/VisionBoard.png";
    link.download = "vision-board.png";
    link.click();
  };

  return (
    <>
      <section className="download-wrap">
        <div className="download-card">
          {/* LEFT IMAGE CARD */}
          <div className="download-left">
            <div className="download-frame">
              <div className="download-inner">
                <Image
                  src="/visionBoardfinal.png"
                  alt="Illustration"
                  width={700}
                  height={700}
                  className="download-img"
                />

              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="download-right">
            <h2 className="download-title md:text-left text-center">Organise your dreams into a Vision Board</h2>
            <p className="download-desc">
             That speaks your journey.
            </p>
            <button className="download-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleDownload}
      />
    </>
  );
}
