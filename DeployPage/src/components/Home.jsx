import { useState } from "react";
import Nav from "./layout/Nav";
import MainLogoAnimation from "./MainLogoAnimation";
import Work from "./Work";

function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <div
        className={`introBackground ${introComplete ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/assets/Background%20Intro.mp4"
        />
      </div>

      <main className="grid-container">
        <Nav />
        <MainLogoAnimation onComplete={() => setIntroComplete(true)} />
        <Work />
      </main>
    </>
  );
}

export default Home;
