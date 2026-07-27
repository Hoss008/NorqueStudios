import styles from "./nav.module.css";
const logo = "/assets/NRQstds.svg";

function Nav() {
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a href="#">ABOUT</a>
        </li>
        <li>
          <a href="#">WORKS</a>
        </li>
        <li>
          <a href="#">SERVICES</a>
        </li>
      </ul>
      <div className={styles.contact}>
        <a href="mailto:hello@norquestudios.com">hello@norquestudios.com</a>
      </div>
    </nav>
  );
}

export default Nav;
