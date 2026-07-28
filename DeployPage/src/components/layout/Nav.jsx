import { motion } from "framer-motion";
import styles from "./nav.module.css";
const logo = "/assets/NRQstds.svg";

function Nav() {
  return (
    <motion.nav 
      className={styles.navWrapper}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1], delay: 2.5 }}
    >
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
    </motion.nav>
  );
}

export default Nav;
