"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function JoinCard() {
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleJoinClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Open the WhatsApp group invite in a new tab for authenticated users
    window.open(process.env.NEXT_PUBLIC_WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
    <section className="join-card">
      {/* LEFT IMAGE */}
      <div className="join-left">
        <Image
          src="/collegeStudents2.png"
          alt="Join Illustration"
          fill
          priority
          className="join-img"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="join-right">
        <h2 className="join-heading">Join our Community</h2>
        <button className="join-btn" onClick={handleJoinClick}>The Other 99% Co-Lab</button>
      </div>
    </section>
    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
