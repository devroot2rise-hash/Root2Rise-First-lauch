"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import "./app.css";
import VbDownload from "@/components/vbDownload";
import CurvedSlider from "@/components/CurvedSlider";
import FlipCard from "@/components/FlipCard";
import SWOTCard from "@/components/swotCard";
import Join from "@/components/JoinCard";
import SendMessage from "@/components/SendMessage";
import Footer from "@/components/Footer";
import CardStack from "@/components/CardStack";

// Extend Window interface for Tally
declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: { layout?: string; width?: number; autoClose?: number }) => void;
    };
  }
}

export default function Home() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Load Tally popup script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openTallyForm = () => {
    if (window.Tally) {
      window.Tally.openPopup('zx7GDE', {
        layout: 'modal',
        width: 1000,
        autoClose: 3000
      });
    }
  };
  
  const cards = [
    {
      front: "/exploreCard2.png",
      back: "/exploreCardBack2.png",
    },
    {
      front: "/prepareCard2.png",
      back: "/prepareCardBack2.png",
    },
    {
      front: "/bloomCard2.png",
      back: "/bloomCardBack2.png",
    },
  ];
  return (
    <div>
        <header id="home" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px" }}>
          <Image src="/logo.png" alt="Root2Rise Logo" width={189} height={42} />
          <nav style={{display:"flex",gap:"50px",fontWeight:"500",fontSize:"18px"}}>
            <Link href="#home">Home</Link>
            <Link href="#about">About Us</Link>
            <Link href="#contact">Contact Us</Link>
          </nav>
          <nav>
            {user ? (
              <>
                <button className="btn" onClick={() => signOut(auth)} style={{ marginLeft: 16 }}>Sign Out</button>
              </>
            ) : (
              <>
                {/* <Link href="/login" style={{ marginRight: 16 }}>Login</Link> */}
                <Link href="/signup"><button className="btn">SignUp</button></Link>
              </>
            )}
          </nav>
        </header>
      <main style={{ margin: "auto", textAlign: "center" }}>
        {/* Main Text */}
        <h1 className="headline">Welcome to your clarity space..</h1>
        {/* Placeholder for Main Illustration */}
        <div style={{display:"flex", justifyContent:"center",flexDirection:"row",gap:"40px"}}>
          <div className="whatsappbtn"><span>Co-Lab Community</span></div>
          <button onClick={openTallyForm} className="whatsappbtn"><span>The Career Compass</span></button>
          {/* <div className="whatsappbtn"><Image src="/whatsappLogo.png" alt="whatsapp Logo" width={50} height={50} className="whatsapplogo"/><span>Join Now</span></div> */}
          {/* <div className="swotbtn" onClick={openTallyForm} style={{cursor: "pointer"}}><span>SWOT</span></div> */}
        </div>
        <div >
          <div style={{margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* <Image src="/clgstu2.png" alt="Main Illustration" width={2000} height={800}/> */}
                <div className={`loop-video`}>
              <video
              src={"HeroAnimation_prob4.mp4"}
              autoPlay
              loop
              muted
               playsInline
              preload="auto"
              />
    </div>
          </div>
        </div>
        <section id="about" style={{ margin: "80px 0",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"60px" }}>
         <span
  style={{
    fontSize: "clamp(28px, 6vw, 60px)",
    fontWeight: 600,
    color: "#030303",
    lineHeight: 1.1,
    display: "inline-block",
    textAlign: "center",
  }}
>
  From Root to Rise
</span>
          <CardStack/>
        </section>
        {/* Vision Board */}
        <section style={{ margin: "40px 0" }}>
          <h3 style={{fontWeight:"600",fontSize:"45px",marginBottom:"60px"}}>Let&apos;s build you a career vision board!</h3>
          <div style={{ display: "flex", overflowX: "auto", padding: "16px 0", marginBottom: 200}}>
      <CurvedSlider
      images={[
        "/VisionBoards/card1.png",
        "/VisionBoards/card2.png",
        "/VisionBoards/card3.png",
        "/VisionBoards/card4.png",
        "/VisionBoards/card5.png",
        "/VisionBoards/card6.png",
        "/VisionBoards/card7.png",
        "/VisionBoards/card8.png",
        "/VisionBoards/card9.png",
        "/VisionBoards/card10.png"
      ]}
      autoplay={false}
      keyboardNavigation={true}
      />
          </div>
          {/* Placeholder for text area */}
        </section>
        {/* Cards Section */}
          <section>
            <VbDownload/>
          </section>
        <section id="" style={{ margin: "40px 0", display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          {/* {["/exploreCard.png", "/prepareCard.png", "/bloomCard.png"].map((title, idx) => (
            <div key={title} style={{ background: "#e0e0e0", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Image src={title} alt={title} width={300} height={200} />
            </div>
          ))} */}
          {cards.map((card, idx) => (      <div
        style={{
        width: 298,
        height: 441,
        opacity: 1,
        borderRadius: 16,
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,0.15)",
      }}
      key={idx}
      >
  <FlipCard
    frontImage={card.front}
    backImage={card.back}
    radius={16}
  />
  </div>))}

        </section>
        <section style={{ margin: "40px 0",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"80px" }}>
          <SWOTCard/>
          <Join/>
        </section>
        <section id="contact" style={{ margin: "80px 0" }}>
          <SendMessage />
        </section>
      </main>
        <Footer />
    </div>
  );
}
