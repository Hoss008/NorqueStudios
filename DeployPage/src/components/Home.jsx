import styles from "./home.module.css";
import Logo from "../../public/assets/Logo.svg";

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
        <h1 className={styles.title}>COMING SOON!</h1>
        <p className={styles.subtitle}>We are working on our website for now</p>
      </div>
      <footer className={styles.footer}>
        ©2026 NORQUESTUDIOS™ ALL RIGHTS RESERVED
      </footer>
    </>
  );
}

export default Home;
