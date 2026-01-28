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
                 <h3 className="download-caption font-instrumentSans">
                  Paint Your Career Canvas
                </h3>
                <Image
                  src="/vbdownload.png"
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
            <h2 className="download-title">Organise your dreams into a vision board</h2>
            <p className="download-desc">
             That speaks your journey
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
