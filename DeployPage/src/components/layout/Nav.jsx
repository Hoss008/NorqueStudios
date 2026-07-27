import styles from "./nav.module.css";
const logo = "/assets/NRQstds.svg";

function Nav() {
  return (
    <nav>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Works</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
      </ul>
        <li>
          <a href="mailto:hello@norquestudios.com">hello@norquestudios.com</a>
        </li>
    </nav>
  );
}

export default Nav;
