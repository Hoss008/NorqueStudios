import { useState, useRef, useEffect } from "react";
import Nav from "./layout/Nav";
import MainLogoAnimation from "./MainLogoAnimation";
import Work from "./Work";

function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  
  // 1. Create a reference to talk directly to the video element
  const videoRef = useRef(null); 

  // 2. This useEffect watches for when the logo animation finishes
  useEffect(() => {
    if (introComplete && videoRef.current) {
      // 3. Wait exactly 1 second (1000ms), then press play!
      const timer = setTimeout(() => {
        videoRef.current.play().catch(err => console.log("Video play blocked:", err));
      }, 1000); 

      // Cleanup the timer just in case the user leaves the page quickly
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  return (
    <>
      <div
        className={`introBackground ${introComplete ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {/* 4. Removed 'autoPlay' and attached the 'ref' */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          src="/assets/Background%20Intro.mp4"
        />
      </div>

      <main className="grid-container">
        <Nav />
        {/* When this finishes, it sets introComplete to true, triggering our 1-second timer above */}
        <MainLogoAnimation onComplete={() => setIntroComplete(true)} />
        <Work />
      </main>
    </>
  );
}

export default Home;