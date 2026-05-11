import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
// import Logo from "../../public/assets/Logo.svg";
// import Logo from "../../public/assets/Logo.svg?react";
import Logo from "../assets/Logo.svg?react";
import BlurText from "./BlurText";
import SplitText from "./SplitText";

const LOGO_STAGGER_STEP = 0.05;

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const handleAnimationComplete2 = () => {
  console.log("All letters have animated!");
};

function Home() {
  const logoWrapRef = useRef(null);
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    const wrap = logoWrapRef.current;
    if (!wrap) return;
    const paths = wrap.querySelectorAll("path");
    paths.forEach((path, index) => {
      path.style.animationDelay = `${index * LOGO_STAGGER_STEP}s`;
    });
    setLogoAnimated(true);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div
          ref={logoWrapRef}
          className={`${styles.logo} ${logoAnimated ? styles.logoAnimated : ""}`}
        >
          <Logo aria-label="NorqueStudios" role="img" />
        </div>
        <ul>
          <ol>About</ol>
          <ol>Contact</ol>
        </ul>
      </header>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <SplitText
            text="COMING SOON!"
            delay={40}
            animateBy="words"
            direction="top"
            duration={0.8}
            ease="power4.out"
            onAnimationComplete={handleAnimationComplete}
          />
        </h1>
        <p className={styles.subtitle}>
          <SplitText
            text="WE ARE WORKING ON OUR WEBSITE FOR NOW"
            delay={30}
            animateBy="words"
            direction="top"
            duration={0.8}
            ease="power4.out"
            onAnimationComplete={handleAnimationComplete2}
          />
        </p>
      </div>
      <footer className={styles.footer}>
        ©2026 NORQUESTUDIOS™ ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}

export default Home;
