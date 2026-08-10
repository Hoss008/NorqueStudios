import styles from "./work.module.css";

function Work() {
  return (
    <div className={styles.campaignTextContainer}>
      <p className={styles.campaignTextMain}>
        NORQUE STUDIOS is a firm that was born in Cairo in 2026, we
        develop brands & websites to the whole world. We are proudly
        launching a DONE-BY-HUMANS Campaign because we still
        believe in human creativity.
      </p>
      <span className={styles.campaignTextSub}>
        BUILT FOR THE WHOLE WORLD
      </span>
    </div>
  );
}

export default Work;
