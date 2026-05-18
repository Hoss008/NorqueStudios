import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.heading}>Page Not Found</h2>
        <p className={styles.subtitle}>
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className={styles.button}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
