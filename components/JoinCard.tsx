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
    // Add your community link action here when user is authenticated
    // For example: window.location.href = "your-community-link";
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
