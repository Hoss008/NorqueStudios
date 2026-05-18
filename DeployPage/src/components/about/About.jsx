import styles from "../about/about.module.css";
import aboutLogog from "../../assets/aboutLogo.svg";
import Arrow from "../../assets/UI/Arrow.svg?react";

function About() {
  return (
    <>
      <div className={styles["main-sec"]}>
        <img src={aboutLogog} alt="About Logo" />
        <p className={styles["text"]}>
          A MULTI DISCIPLINARY CREATIVE STUDIO THAT DELIVERS <br></br>
          SOLUTIONS NOT JUST GOOD DESIGNS
        </p>
      </div>

      <section className={styles.container}>
        <div className={styles.emptyLeft}></div>

        <div className={styles.contentRight}>
          <h2 className={styles.heading}>
            OUR
            <br />
            PROFESSION
          </h2>
          <p className={styles.subtitle}>CORE CAPABILITIES</p>

          <ul className={styles.servicesList}>
            <li>
              <Arrow  /> UI/UX
            </li>
            <li>
              <Arrow/> WEB DEVELOPMENT
            </li>
            <li>
              <Arrow /> BRANDING
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default About;
