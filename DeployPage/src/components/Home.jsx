import styles from "./home.module.css";
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
        <div className={styles.loader}></div>
      </p>
    </div>
  );
}

export default Home;
