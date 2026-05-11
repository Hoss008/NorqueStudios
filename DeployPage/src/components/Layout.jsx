import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import Logo from "../assets/Logo.svg?react";

const LOGO_STAGGER_STEP = 0.05;

function Layout() {
  const location = useLocation();
  const logoWrapRef = useRef(null);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const isAboutPage = location.pathname === "/about";

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
        <Link
          to="/"
          ref={logoWrapRef}
          className={`${styles.logo} ${logoAnimated ? styles.logoAnimated : ""}`}
          aria-label="NorqueStudios"
        >
          <Logo role="img" />
        </Link>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <a
              href="mailto:contact@norquestudios.com"
              className={isAboutPage ? styles.navMuted : ""}
            >
              Contact
            </a>
          </li>
        </ul>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        ©2026 NORQUESTUDIOS™ ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}

export default Layout;
