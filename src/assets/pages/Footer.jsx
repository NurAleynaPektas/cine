import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} CinePlus. All rights reserved.</p>
      <p>
        Designed by{" "}
        <a
          href="https://github.com/NurAleynaPektas"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nur P.
        </a>
      </p>
    </footer>
  );
}
