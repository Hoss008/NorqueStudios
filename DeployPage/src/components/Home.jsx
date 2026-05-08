import styles from "./home.module.css";
import Logo from "../../public/assets/Logo.svg";
import BlurText from "./BlurText";
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const handleAnimationComplete2 = () => {
  console.log("All letters have animated!");
};

function Home() {
  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" />
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
            duration={0.6}
            onAnimationComplete={handleAnimationComplete}
          />
        </h1>
        <p className={styles.subtitle}>
          <SplitText
            text="WE ARE WORKING ON OUR WEBSITE FOR NOW"
            delay={30}
            animateBy="words"
            direction="top"
            duration={0.6}
            onAnimationComplete={handleAnimationComplete2}
          />
        </p>
      </div>
      <footer className={styles.footer}>
        ©2026 NORQUESTUDIOS™ ALL RIGHTS RESERVED
      </footer>
    </>
  );
}

export default Home;
